import type { Metadata } from "next";
import { AdminDashboardPage } from "@/components/admin/AdminDashboardPage";

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Firebase admin dashboard for Rotaract District 3141.",
};

export default function AdminDashboardRoute() {
	return <AdminDashboardPage />;
}