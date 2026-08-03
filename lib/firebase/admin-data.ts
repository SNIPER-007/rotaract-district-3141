import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "./firestore";
import { db } from "./firestore";
import { parseAdminList } from "./admin";
import {
	EVENT_SEEDS,
	FIREBASE_COLLECTIONS,
	FUND_PROJECT_SEEDS,
	HOME_EVENT_SEEDS,
	SETTINGS_SEED,
	SUPPORT_CAUSE_SEEDS,
	type DonationRecord,
	type EventRecord,
	type FirebaseCollectionName,
	type FundProjectRecord,
	type HomeEventRecord,
	type SiteSettingsRecord,
	type SupportCauseRecord,
} from "./schema";

type FirebaseDocument = object;

export interface CollectionSnapshot<T extends FirebaseDocument> {
	id: string;
	data: T;
}

async function seedDocumentIfMissing(collectionName: FirebaseCollectionName, id: string, data: FirebaseDocument) {
	const reference = doc(db, FIREBASE_COLLECTIONS[collectionName], id);
	const snapshot = await getDoc(reference);

	if (snapshot.exists()) {
		return false;
	}

	await setDoc(reference, data);
	return true;
}

export async function loadCollection<T extends FirebaseDocument>(collectionName: FirebaseCollectionName) {
	const snapshot = await getDocs(query(collection(db, FIREBASE_COLLECTIONS[collectionName])));

	return snapshot.docs.map((document) => ({
		id: document.id,
		data: document.data() as T,
	}));
}

export async function saveCollectionDocument<T extends FirebaseDocument>(collectionName: FirebaseCollectionName, id: string, data: T) {
	await setDoc(doc(db, FIREBASE_COLLECTIONS[collectionName], id), data, { merge: true });
}

export async function deleteCollectionDocument(collectionName: FirebaseCollectionName, id: string) {
	await deleteDoc(doc(db, FIREBASE_COLLECTIONS[collectionName], id));
}

export async function initializeFirebaseData() {
	const created: string[] = [];
	const adminEmails = parseAdminList(process.env.NEXT_PUBLIC_ADMIN_ALLOWED_EMAILS);
	const adminUids = parseAdminList(process.env.NEXT_PUBLIC_ADMIN_ALLOWED_UIDS);

	for (let index = 0; index < Math.max(adminEmails.length, adminUids.length); index += 1) {
		const uid = adminUids[index] ?? adminEmails[index] ?? `admin-${index + 1}`;
		const email = adminEmails[index] ?? adminEmails[0] ?? `${uid}@example.com`;

		if (await seedDocumentIfMissing("admins", uid, { uid, email, role: "admin", active: true, createdAt: new Date().toISOString() })) {
			created.push(`admins/${uid}`);
		}
	}

	for (const [index, item] of HOME_EVENT_SEEDS.entries()) {
		if (await seedDocumentIfMissing("homeEvents", `featured${index + 1}`, item)) {
			created.push(`homeEvents/featured${index + 1}`);
		}
	}

	for (const [index, item] of EVENT_SEEDS.entries()) {
		const collectionName =
			item.category === "Rotaract District" ? "districtEvents" : item.category === "Rotary District" ? "rotaryEvents" : "clubEvents";
		const sectionDocId = `${item.folderLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`;
		if (await seedDocumentIfMissing(collectionName, sectionDocId, item)) {
			created.push(`${collectionName}/${sectionDocId}`);
		}
	}

	for (const [index, item] of FUND_PROJECT_SEEDS.entries()) {
		const docId = `project-${index + 1}`;
		if (await seedDocumentIfMissing("fundProjects", docId, item)) {
			created.push(`fundProjects/${docId}`);
		}
	}

	for (const [index, item] of SUPPORT_CAUSE_SEEDS.entries()) {
		const docId = `cause-${index + 1}`;
		if (await seedDocumentIfMissing("supportCauses", docId, item)) {
			created.push(`supportCauses/${docId}`);
		}
	}

	if (await seedDocumentIfMissing("settings", "site", SETTINGS_SEED)) {
		created.push("settings/site");
	}

	return created;
}

export async function getDonationLeaderboard() {
	const donations = await loadCollection<DonationRecord>("donations");
	const totals = new Map<string, { projectTitle: string; total: number; count: number }>();

	for (const donation of donations) {
		if (donation.data.paymentStatus !== "successful") {
			continue;
		}

		const current = totals.get(donation.data.projectTitle) ?? {
			projectTitle: donation.data.projectTitle,
			total: 0,
			count: 0,
		};

		current.total += donation.data.amount;
		current.count += 1;
		totals.set(donation.data.projectTitle, current);
	}

	return [...totals.values()].sort((left, right) => right.total - left.total);
}

export async function getCollectionCounts() {
	const [admins, homeEvents, districtEvents, clubEvents, rotaryEvents, fundProjects, supportCauses, donations, settings] = await Promise.all([
		loadCollection("admins"),
		loadCollection<HomeEventRecord>("homeEvents"),
		loadCollection<EventRecord>("districtEvents"),
		loadCollection<EventRecord>("clubEvents"),
		loadCollection<EventRecord>("rotaryEvents"),
		loadCollection<FundProjectRecord>("fundProjects"),
		loadCollection<SupportCauseRecord>("supportCauses"),
		loadCollection<DonationRecord>("donations"),
		loadCollection<SiteSettingsRecord>("settings"),
	]);

	return {
		admins,
		homeEvents,
		districtEvents,
		clubEvents,
		rotaryEvents,
		fundProjects,
		supportCauses,
		donations,
		settings,
	};
}