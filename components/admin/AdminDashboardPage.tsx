"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signOutAdmin, subscribeToAuthStateChanged } from "@/lib/firebase/auth";
import { isAuthorizedAdminIdentity } from "@/lib/firebase/admin";
import { getCollectionCounts, initializeFirebaseData } from "@/lib/firebase/admin-data";
import { FirestoreCollectionManager } from "./FirestoreCollectionManager";

const EDITABLE_COLLECTIONS = [
	{
		collectionName: "homeEvents",
		label: "Home Events",
		fields: [
			{ name: "tabLabel", label: "Tab label", kind: "text" },
			{ name: "title", label: "Title", kind: "text" },
			{ name: "date", label: "Date", kind: "text" },
			{ name: "location", label: "Location", kind: "text" },
			{ name: "description", label: "Description", kind: "textarea" },
			{ name: "image", label: "Image URL", kind: "text" },
			{ name: "buttonLink", label: "Button Link", kind: "text" },
			{ name: "color", label: "Color", kind: "text" },
			{ name: "cta", label: "CTA", kind: "text" },
			{ name: "active", label: "Active", kind: "boolean" },
			{ name: "order", label: "Order", kind: "number" },
		],
		allowCreate: true,
		allowDelete: true,
		sortField: "order",
	} as const,
	{
		collectionName: "districtEvents",
		label: "District Events",
		fields: [
			{ name: "category", label: "Category", kind: "text" },
			{ name: "folderLabel", label: "Folder Label", kind: "text" },
			{ name: "title", label: "Title", kind: "text" },
			{ name: "date", label: "Date", kind: "text" },
			{ name: "venue", label: "Venue", kind: "text" },
			{ name: "description", label: "Description", kind: "textarea" },
			{ name: "cover", label: "Cover URL", kind: "text" },
			{ name: "gallery", label: "Gallery URLs", kind: "array" },
			{ name: "registrationLink", label: "Registration Link", kind: "text" },
			{ name: "color", label: "Color", kind: "text" },
			{ name: "order", label: "Order", kind: "number" },
		],
		allowCreate: true,
		allowDelete: true,
		sortField: "order",
	} as const,
	{
		collectionName: "clubEvents",
		label: "Club Events",
		fields: [
			{ name: "category", label: "Category", kind: "text" },
			{ name: "folderLabel", label: "Folder Label", kind: "text" },
			{ name: "title", label: "Title", kind: "text" },
			{ name: "date", label: "Date", kind: "text" },
			{ name: "venue", label: "Venue", kind: "text" },
			{ name: "description", label: "Description", kind: "textarea" },
			{ name: "cover", label: "Cover URL", kind: "text" },
			{ name: "gallery", label: "Gallery URLs", kind: "array" },
			{ name: "registrationLink", label: "Registration Link", kind: "text" },
			{ name: "color", label: "Color", kind: "text" },
			{ name: "order", label: "Order", kind: "number" },
		],
		allowCreate: true,
		allowDelete: true,
		sortField: "order",
	} as const,
	{
		collectionName: "rotaryEvents",
		label: "Rotary Events",
		fields: [
			{ name: "category", label: "Category", kind: "text" },
			{ name: "folderLabel", label: "Folder Label", kind: "text" },
			{ name: "title", label: "Title", kind: "text" },
			{ name: "date", label: "Date", kind: "text" },
			{ name: "venue", label: "Venue", kind: "text" },
			{ name: "description", label: "Description", kind: "textarea" },
			{ name: "cover", label: "Cover URL", kind: "text" },
			{ name: "gallery", label: "Gallery URLs", kind: "array" },
			{ name: "registrationLink", label: "Registration Link", kind: "text" },
			{ name: "color", label: "Color", kind: "text" },
			{ name: "order", label: "Order", kind: "number" },
		],
		allowCreate: true,
		allowDelete: true,
		sortField: "order",
	} as const,
	{
		collectionName: "supportCauses",
		label: "Support Causes",
		fields: [
			{ name: "title", label: "Title", kind: "text" },
			{ name: "description", label: "Description", kind: "textarea" },
			{ name: "raised", label: "Raised", kind: "number" },
			{ name: "goal", label: "Goal", kind: "number" },
			{ name: "image", label: "Image URL", kind: "text" },
			{ name: "qrImage", label: "QR Image URL", kind: "text" },
			{ name: "upi", label: "UPI", kind: "text" },
			{ name: "donationBand", label: "Donation Band", kind: "text" },
			{ name: "minimumDonation", label: "Minimum Donation", kind: "number" },
			{ name: "registrationLink", label: "Registration Link", kind: "text" },
			{ name: "tags", label: "Tags", kind: "array" },
			{ name: "order", label: "Order", kind: "number" },
		],
		allowCreate: true,
		allowDelete: true,
		sortField: "order",
	} as const,
	{
		collectionName: "fundProjects",
		label: "Fund Projects",
		fields: [
			{ name: "title", label: "Title", kind: "text" },
			{ name: "description", label: "Description", kind: "textarea" },
			{ name: "raised", label: "Raised", kind: "number" },
			{ name: "goal", label: "Goal", kind: "number" },
			{ name: "image", label: "Image URL", kind: "text" },
			{ name: "qrImage", label: "QR Image URL", kind: "text" },
			{ name: "upi", label: "UPI", kind: "text" },
			{ name: "donationBand", label: "Donation Band", kind: "text" },
			{ name: "minimumDonation", label: "Minimum Donation", kind: "number" },
			{ name: "registrationLink", label: "Registration Link", kind: "text" },
			{ name: "tags", label: "Tags", kind: "array" },
			{ name: "order", label: "Order", kind: "number" },
		],
		allowCreate: true,
		allowDelete: true,
		sortField: "order",
	} as const,
	{
		collectionName: "donations",
		label: "Donations",
		fields: [
			{ name: "donorType", label: "Donor Type", kind: "text" },
			{ name: "paymentRail", label: "Payment Rail", kind: "text" },
			{ name: "donorName", label: "Donor Name", kind: "text" },
			{ name: "email", label: "Email", kind: "text" },
			{ name: "phone", label: "Phone", kind: "text" },
			{ name: "amount", label: "Amount", kind: "number" },
			{ name: "anonymous", label: "Anonymous", kind: "boolean" },
			{ name: "projectTitle", label: "Project Title", kind: "text" },
			{ name: "companyName", label: "Company Name", kind: "text" },
			{ name: "gstin", label: "GSTIN", kind: "text" },
			{ name: "wants80g", label: "Wants 80G", kind: "boolean" },
			{ name: "submittedAt", label: "Submitted At", kind: "text" },
			{ name: "paymentStatus", label: "Payment Status", kind: "text" },
		],
		allowCreate: false,
		allowDelete: true,
		sortField: "submittedAt",
		sortDirection: "desc",
	} as const,
	{
		collectionName: "settings",
		label: "Settings",
		fields: [
			{ name: "siteName", label: "Site Name", kind: "text" },
			{ name: "supportEmail", label: "Support Email", kind: "text" },
			{ name: "featuredAnnouncement", label: "Featured Announcement", kind: "textarea" },
			{ name: "maintenanceMode", label: "Maintenance Mode", kind: "boolean" },
			{ name: "updatedAt", label: "Updated At", kind: "text" },
		],
		allowCreate: false,
		allowDelete: false,
		fixedId: "site",
	} as const,
] as const;

type DashboardCounts = Awaited<ReturnType<typeof getCollectionCounts>>;

export function AdminDashboardPage() {
	const router = useRouter();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [isSeeding, setIsSeeding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [counts, setCounts] = useState<DashboardCounts | null>(null);

	useEffect(() => {
		return subscribeToAuthStateChanged((user) => {
			if (!user) {
				setCurrentUser(null);
				setIsCheckingAuth(false);
				router.replace("/admin/login");
				return;
			}

			void (async () => {
				const authorized = await isAuthorizedAdminIdentity({ email: user.email, uid: user.uid });

				if (!authorized) {
					await signOutAdmin();
					setCurrentUser(null);
					setError("This Firebase account is not authorized for admin access.");
					router.replace("/admin/login");
					setIsCheckingAuth(false);
					return;
				}

				setCurrentUser(user);
				setIsCheckingAuth(false);
			})();
		});
	}, [router]);

	useEffect(() => {
		if (!currentUser) {
			return;
		}

		void (async () => {
			setIsLoading(true);
			try {
				await initializeFirebaseData();
				setCounts(await getCollectionCounts());
			} catch (loadError) {
				setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard data.");
			} finally {
				setIsLoading(false);
			}
		})();
	}, [currentUser]);

	const handleSeedData = async () => {
		setError("");
		setIsSeeding(true);

		try {
			await initializeFirebaseData();
			setCounts(await getCollectionCounts());
		} catch (seedError) {
			setError(seedError instanceof Error ? seedError.message : "Unable to seed Firebase data.");
		} finally {
			setIsSeeding(false);
		}
	};

	const handleSignOut = async () => {
		await signOutAdmin();
		router.replace("/admin/login");
	};

	if (isCheckingAuth) {
		return <main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]" />;
	}

	return (
		<main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
				<section className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
					<p className="font-script text-[22px] font-medium text-[var(--accent)] rotate-[-2deg]">Admin Dashboard</p>
					<h1 className="mt-2 font-heading text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.05em]">
						Firebase Control Center
					</h1>
					<p className="mt-3 max-w-3xl text-[0.98rem] leading-[1.75] text-[var(--foreground)]/70">
						Manage seeded content, check collection coverage, and keep the manual Firebase setup aligned with the live site.
					</p>
				</section>

				<section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
					<div className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div>
								<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Signed in as</p>
								<p className="mt-2 break-all text-[0.95rem] text-[var(--foreground)]">{currentUser?.email ?? "Not available"}</p>
							</div>

							<div className="flex gap-3">
								<button
									type="button"
									onClick={handleSeedData}
									disabled={isSeeding}
									className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--foreground)] px-5 text-[0.84rem] font-medium text-[var(--background)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
								>
									{isSeeding ? "Seeding..." : "Seed Firebase Data"}
								</button>
								<button
									type="button"
									onClick={handleSignOut}
									className="inline-flex h-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-5 text-[0.84rem] font-medium text-[var(--foreground)] transition-shadow hover:shadow-[0_12px_26px_rgba(17,17,17,0.08)]"
								>
									Sign Out
								</button>
							</div>
						</div>

						{error ? (
							<p className="mt-5 rounded-[20px] border border-[rgba(0,0,0,0.06)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] px-4 py-3 text-[0.9rem] leading-[1.6] text-[var(--foreground)]/72">
								{error}
							</p>
						) : null}

						<div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{[
								{ label: "Admins", value: counts?.admins.length ?? 0 },
								{ label: "Home Events", value: counts?.homeEvents.length ?? 0 },
								{ label: "District Events", value: counts?.districtEvents.length ?? 0 },
								{ label: "Club Events", value: counts?.clubEvents.length ?? 0 },
								{ label: "Rotary Events", value: counts?.rotaryEvents.length ?? 0 },
								{ label: "Fund Projects", value: counts?.fundProjects.length ?? 0 },
								{ label: "Support Causes", value: counts?.supportCauses.length ?? 0 },
								{ label: "Donations", value: counts?.donations.length ?? 0 },
								{ label: "Settings", value: counts?.settings.length ?? 0 },
							].map((item) => (
								<div key={item.label} className="rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4">
									<p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--foreground)]/48">{item.label}</p>
									<p className="mt-3 font-heading text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em]">
										{isLoading ? "..." : item.value}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-[32px] border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-[0_18px_44px_rgba(0,0,0,0.06)] md:p-8">
						<p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]/48">Dashboard actions</p>
						<h2 className="mt-2 font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.05em]">
							Seed and inspect
						</h2>
						<p className="mt-3 text-[0.95rem] leading-[1.8] text-[var(--foreground)]/70">
							The seed action populates the Firestore collections needed for the admin system, and the edit panel below writes changes straight back to Firestore.
						</p>

						<div className="mt-6 space-y-3 rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[color-mix(in_srgb,var(--surface)_94%,white)] p-4 text-[0.92rem] leading-[1.7] text-[var(--foreground)]/70">
							<p><span className="font-semibold text-[var(--foreground)]">Collections</span> are seeded only when a document is missing, so live data is preserved.</p>
							<p><span className="font-semibold text-[var(--foreground)]">Auth</span> still uses Firebase Email/Password with the existing allowlist guard.</p>
							<p><span className="font-semibold text-[var(--foreground)]">Route protection</span> is enforced by the client redirect when the session is absent or unauthorized.</p>
						</div>
					</div>
				</section>

				<FirestoreCollectionManager configs={EDITABLE_COLLECTIONS} />
			</div>
		</main>
	);
}
