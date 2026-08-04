"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { deleteCollectionDocument, saveCollectionDocument } from "@/lib/firebase/admin-data";
import { collection as firestoreCollection, db, onSnapshot, orderBy, query } from "@/lib/firebase/firestore";
import { uploadFileToStorage } from "@/lib/firebase/storage";
import type { FirebaseCollectionName } from "@/lib/firebase/schema";

type FieldKind = "text" | "number" | "textarea" | "boolean" | "array";

interface FieldConfig {
	name: string;
	label: string;
	kind: FieldKind;
	placeholder?: string;
}

interface CollectionConfig {
	collectionName: FirebaseCollectionName;
	label: string;
	fields: readonly FieldConfig[];
	sortField?: string;
	sortDirection?: "asc" | "desc";
	allowCreate: boolean;
	allowDelete: boolean;
	fixedId?: string;
}

interface FirestoreCollectionManagerProps {
	configs: readonly CollectionConfig[];
}

function stringValue(value: unknown) {
	if (typeof value === "string") {
		return value;
	}

	if (typeof value === "number" || typeof value === "boolean") {
		return String(value);
	}

	return "";
}

function generateDocumentId(collectionName: FirebaseCollectionName, title: string) {
	const base = title
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

	return base || `${collectionName}-${Date.now()}`;
}

function readFieldValue(draft: Record<string, string | boolean>, field: FieldConfig) {
	const value = draft[field.name];

	if (field.kind === "boolean") {
		return Boolean(value);
	}

	if (field.kind === "number") {
		return Number(value || 0);
	}

	if (field.kind === "array") {
		return String(value ?? "")
			.split(/[,\n]/)
			.map((item) => item.trim())
			.filter(Boolean);
	}

	return String(value ?? "");
}

function getDocLabel(docData: Record<string, unknown>, config: CollectionConfig, documentId: string) {
	return (
		String(docData.title ?? docData.siteName ?? docData.donorName ?? docData.email ?? docData.uid ?? docData.projectTitle ?? documentId) ||
		documentId
	);
}

export function FirestoreCollectionManager({ configs }: FirestoreCollectionManagerProps) {
	const [activeCollection, setActiveCollection] = useState<CollectionConfig>(configs[0]);
	const [documents, setDocuments] = useState<Array<{ id: string; data: Record<string, unknown> }>>([]);
	const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");
	const [draft, setDraft] = useState<Record<string, string | boolean>>({});
	const [isSaving, setIsSaving] = useState(false);
	const [isUploading, setIsUploading] = useState<string | null>(null);
	const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

	useEffect(() => {
		setActiveCollection(configs[0]);
	}, [configs]);

	useEffect(() => {
		const target = activeCollection.sortField
			? query(
				firestoreCollection(db, activeCollection.collectionName),
				orderBy(activeCollection.sortField, activeCollection.sortDirection ?? "asc"),
			)
			: firestoreCollection(db, activeCollection.collectionName);

		return onSnapshot(target, (snapshot) => {
			const nextDocuments = snapshot.docs.map((document) => ({ id: document.id, data: document.data() as Record<string, unknown> }));
			setDocuments(nextDocuments);

			if (nextDocuments.length === 0) {
				setSelectedDocumentId("");
				setDraft({});
				return;
			}

			const existingDocument = nextDocuments.find((document) => document.id === selectedDocumentId) ?? nextDocuments[0];

			if (!selectedDocumentId || !existingDocument) {
				setSelectedDocumentId(nextDocuments[0].id);
			}
		});
	}, [activeCollection.collectionName, activeCollection.sortDirection, activeCollection.sortField, selectedDocumentId]);

	useEffect(() => {
		const selectedDocument = documents.find((document) => document.id === selectedDocumentId);

		if (!selectedDocument) {
			const firstDocument = documents[0];

			if (!firstDocument) {
				setDraft({});
				return;
			}

			setSelectedDocumentId(firstDocument.id);
			setDraft(
				activeCollection.fields.reduce<Record<string, string | boolean>>((accumulator, field) => {
					accumulator[field.name] = field.kind === "boolean" ? Boolean(firstDocument.data[field.name]) : stringValue(firstDocument.data[field.name]);
					return accumulator;
				}, {}),
			);
			return;
		}

		setDraft(
			activeCollection.fields.reduce<Record<string, string | boolean>>((accumulator, field) => {
				if (field.kind === "boolean") {
					accumulator[field.name] = Boolean(selectedDocument.data[field.name]);
					return accumulator;
				}

				if (field.kind === "array") {
					const value = selectedDocument.data[field.name];
					accumulator[field.name] = Array.isArray(value) ? value.join(", ") : stringValue(value);
					return accumulator;
				}

				accumulator[field.name] = stringValue(selectedDocument.data[field.name]);
				return accumulator;
			}, {}),
		);
	}, [activeCollection.fields, documents, selectedDocumentId]);

	const selectedDocument = useMemo(() => documents.find((document) => document.id === selectedDocumentId) ?? null, [documents, selectedDocumentId]);

	const handleDraftChange = (field: FieldConfig, value: string | boolean) => {
		setDraft((current) => ({ ...current, [field.name]: value }));
	};

	const handleNewDocument = () => {
		setSelectedDocumentId("");
		setDraft(
			activeCollection.fields.reduce<Record<string, string | boolean>>((accumulator, field) => {
				accumulator[field.name] = field.kind === "boolean" ? false : "";
				return accumulator;
			}, {}),
		);
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			const payload: Record<string, unknown> = {};

			for (const field of activeCollection.fields) {
				payload[field.name] = readFieldValue(draft, field);
			}

			const documentId = activeCollection.fixedId ?? (selectedDocumentId || generateDocumentId(activeCollection.collectionName, String(payload.title ?? payload.siteName ?? payload.donorName ?? "document")));
			await saveCollectionDocument(activeCollection.collectionName, documentId, payload);
			setSelectedDocumentId(documentId);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDelete = async () => {
		const documentId = activeCollection.fixedId ?? selectedDocumentId;

		if (!documentId) {
			return;
		}

		const confirmed = window.confirm(`Delete ${selectedDocument?.id ?? documentId}?`);

		if (!confirmed) {
			return;
		}

		await deleteCollectionDocument(activeCollection.collectionName, documentId);
		setSelectedDocumentId("");
	};

	const handleFileUpload = async (fieldName: string, event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		setIsUploading(fieldName);
		try {
			const uploadPath = `admin/${activeCollection.collectionName}/${selectedDocumentId || activeCollection.fixedId || "new"}/${fieldName}/${file.name}`;
			const downloadUrl = await uploadFileToStorage(uploadPath, file);
			setDraft((current) => ({ ...current, [fieldName]: downloadUrl }));
		} finally {
			setIsUploading(null);
			event.target.value = "";
		}
	};

	return (
		<div className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Content manager</p>
					<h2 className="mt-2 font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">
						{activeCollection.label}
					</h2>
				</div>

				<div className="flex flex-wrap gap-2">
					{configs.map((config) => (
						<button
							key={config.collectionName}
							type="button"
							onClick={() => setActiveCollection(config)}
							className={`rounded-full border px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
								activeCollection.collectionName === config.collectionName
									? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
									: "border-[rgba(0,0,0,0.08)] bg-white text-[var(--foreground)]/68"
							}`}
						>
							{config.label}
						</button>
					))}
				</div>
			</div>

			<div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
				<div className="space-y-3">
					<div className="flex items-center justify-between gap-3">
						<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">
							Documents
						</p>
						{activeCollection.allowCreate ? (
							<button
								type="button"
								onClick={handleNewDocument}
								className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/72"
							>
								New Document
							</button>
						) : null}
					</div>

					<div className="space-y-3 pr-1">
						{documents.map((document) => (
							<button
								key={document.id}
								type="button"
								onClick={() => setSelectedDocumentId(document.id)}
								className={`w-full rounded-[24px] border px-4 py-4 text-left transition-all duration-300 ${
									selectedDocumentId === document.id
										? "border-[var(--foreground)] bg-[color-mix(in_srgb,var(--surface)_92%,white)]"
										: "border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_96%,white)]"
								}`}
							>
								<p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/48">{document.id}</p>
								<p className="mt-2 font-medium text-[var(--foreground)]">{getDocLabel(document.data, activeCollection, document.id)}</p>
							</button>
						))}
					</div>
				</div>

				<div className="space-y-4 rounded-[28px] border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_96%,white)] p-5">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Editor</p>
							<p className="mt-2 text-[0.9rem] text-[var(--foreground)]/68">
								{selectedDocument ? `Editing ${selectedDocument.id}` : "Create a new document"}
							</p>
						</div>

						<div className="flex gap-2">
							<button
								type="button"
								onClick={handleSave}
								disabled={isSaving}
								className="rounded-full bg-[var(--foreground)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--background)] disabled:cursor-not-allowed disabled:opacity-60"
							>
								{isSaving ? "Saving..." : "Save"}
							</button>
							{activeCollection.allowDelete ? (
								<button
									type="button"
									onClick={handleDelete}
									className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/72"
								>
									Delete
								</button>
							) : null}
						</div>
					</div>

					<div className="grid gap-4">
						{activeCollection.fields.map((field) => (
							<label key={field.name} className="space-y-2">
								<span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground)]/48">{field.label}</span>
								{field.kind === "textarea" ? (
									<textarea
										value={String(draft[field.name] ?? "")}
										onChange={(event) => handleDraftChange(field, event.target.value)}
										placeholder={field.placeholder}
										className="min-h-[6rem] w-full rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 text-[0.94rem] outline-none"
									/>
								) : field.kind === "boolean" ? (
									<div className="flex items-center gap-3 rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3">
										<input
											type="checkbox"
											checked={Boolean(draft[field.name])}
											onChange={(event) => handleDraftChange(field, event.target.checked)}
										/>
										<span className="text-[0.9rem] text-[var(--foreground)]/72">{Boolean(draft[field.name]) ? "Enabled" : "Disabled"}</span>
									</div>
								) : (
									<div className="flex items-center gap-2">
										<input
											type={field.kind === "number" ? "number" : "text"}
											value={String(draft[field.name] ?? "")}
											onChange={(event) => handleDraftChange(field, event.target.value)}
											placeholder={field.placeholder}
											className="h-12 flex-1 rounded-[20px] border border-[rgba(0,0,0,0.08)] bg-white px-4 text-[0.94rem] outline-none"
										/>
										{field.name.match(/image|cover|qrImage/i) ? (
											<>
												<input
													ref={(element) => {
														fileInputRefs.current[field.name] = element;
													}}
													type="file"
													accept="image/*"
													className="hidden"
													onChange={(event) => void handleFileUpload(field.name, event)}
												/>
												<button
													type="button"
													onClick={() => fileInputRefs.current[field.name]?.click()}
													className="rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/72"
												>
													{isUploading === field.name ? "Uploading..." : "Upload"}
												</button>
											</>
										) : null}
									</div>
								)}
								{field.kind === "array" ? (
									<p className="text-[0.78rem] text-[var(--foreground)]/54">Separate items with commas or new lines.</p>
								) : null}
							</label>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export type { CollectionConfig };
