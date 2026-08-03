import { EVENT_FOLDERS, type EventCategory } from "@/data/events";
import { PROJECTS } from "@/data/projects";

export const FIREBASE_COLLECTIONS = {
	admins: "admins",
	homeEvents: "homeEvents",
	districtEvents: "districtEvents",
	clubEvents: "clubEvents",
	rotaryEvents: "rotaryEvents",
	fundProjects: "fundProjects",
	supportCauses: "supportCauses",
	donations: "donations",
	settings: "settings",
} as const;

export type FirebaseCollectionName = keyof typeof FIREBASE_COLLECTIONS;

export interface AdminRecord {
	email: string;
	uid: string;
	role: "admin";
	active: boolean;
	createdAt: string;
}

export interface HomeEventRecord {
	tabLabel: string;
	title: string;
	date: string;
	location: string;
	description: string;
	image: string;
	buttonLink: string;
	color: string;
	cta: string;
	active: boolean;
	order: number;
}

export interface EventRecord {
	category: EventCategory;
	folderLabel: string;
	title: string;
	date: string;
	venue: string;
	description: string;
	cover: string;
	gallery: string[];
	registrationLink: string;
	color: string;
	order: number;
}

export interface FundProjectRecord {
	title: string;
	description: string;
	raised: number;
	goal: number;
	image: string;
	qrImage: string;
	upi: string;
	donationBand: "under-10000" | "over-10000";
	minimumDonation: number;
	registrationLink: string;
	tags: string[];
	order: number;
}

export type SupportCauseRecord = FundProjectRecord;

export interface DonationRecord {
	donorType: "individual" | "company";
	paymentRail: "scanner" | "upi" | "net-banking";
	donorName: string;
	email: string;
	phone: string;
	amount: number;
	anonymous: boolean;
	projectTitle: string;
	companyName?: string;
	gstin?: string;
	wants80g?: boolean;
	submittedAt: string;
	paymentStatus?: "successful" | "pending" | "failed";
}

export interface SiteSettingsRecord {
	siteName: string;
	supportEmail: string;
	featuredAnnouncement: string;
	maintenanceMode: boolean;
	updatedAt: string;
}

export const HOME_EVENT_SEEDS: readonly HomeEventRecord[] = [
	{
		tabLabel: "Safar",
		title: "Event 1",
		date: "23rd August 2026",
		location: "Bandra Fort",
		description:
			"SAFAR is a Rotaract District 3141 marathon supporting cervical cancer vaccination for underprivileged communities, promoting awareness, hope, healthier lives, and meaningful impact together.",
		image: "/placeholders/safar-resizex-1140.jpg",
		buttonLink: "/events",
		color: "var(--accent)",
		cta: "Learn More",
		active: true,
		order: 1,
	},
	{
		tabLabel: "L.A.N.S Q1",
		title: "Event 2",
		date: "5th July 2026",
		location: "Sathaye College",
		description:
			"LANS is a Rotaract District 3141 initiative where every quarter introduces a unique sport, promoting fitness, learning, teamwork, and lifelong sporting experiences.",
		image: "/placeholders/lans.png",
		buttonLink: "/events",
		color: "var(--secondary)",
		cta: "Learn More",
		active: false,
		order: 2,
	},
	{
		tabLabel: "Jersey XI",
		title: "Event 3",
		date: "17th May 2026",
		location: "Kohinoor Turf, Kurla",
		description:
			"Jersey XI is a Rotaract District 3141 cricket tournament featuring exciting power cards and innovative rule twists, redefining the game with strategy and fun.",
		image: "/placeholders/jerseyxi.jpg",
		buttonLink: "/events",
		color: "color-mix(in srgb, var(--foreground) 18%, var(--accent) 82%)",
		cta: "Learn More",
		active: false,
		order: 3,
	},
] as const;

export const EVENT_SEEDS: readonly EventRecord[] = EVENT_FOLDERS.map((event, index) => ({
	category: event.category,
	folderLabel: event.folderLabel,
	title: event.title,
	date: event.date,
	venue: event.venue,
	description: event.description,
	cover: event.cover,
	gallery: [...event.gallery],
	registrationLink: event.registrationLink,
	color: event.color,
	order: index + 1,
}));

export const FUND_PROJECT_SEEDS: readonly FundProjectRecord[] = PROJECTS.map((project, index) => ({
	title: project.title,
	description: project.description,
	raised: project.raised,
	goal: project.goal,
	image: project.image,
	qrImage: project.qrImage,
	upi: project.upi,
	donationBand: project.donationBand,
	minimumDonation: project.minimumDonation,
	registrationLink: project.registrationLink,
	tags: [...project.tags],
	order: index + 1,
}));

export const SUPPORT_CAUSE_SEEDS: readonly SupportCauseRecord[] = PROJECTS.filter((project) => project.donationBand === "under-10000").map((project, index) => ({
	title: project.title,
	description: project.description,
	raised: project.raised,
	goal: project.goal,
	image: project.image,
	qrImage: project.qrImage,
	upi: project.upi,
	donationBand: project.donationBand,
	minimumDonation: project.minimumDonation,
	registrationLink: project.registrationLink,
	tags: [...project.tags],
	order: index + 1,
}));

export const SETTINGS_SEED: SiteSettingsRecord = {
	siteName: "Rotaract District 3141",
	supportEmail: "district3141@example.com",
	featuredAnnouncement: "Firebase admin setup placeholder",
	maintenanceMode: false,
	updatedAt: new Date().toISOString(),
};