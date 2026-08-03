import type { Metadata } from "next";
import { AdminLoginPage } from "@/components/admin/AdminLoginPage";

export const metadata: Metadata = {
	title: "Admin Login",
	description: "Firebase admin login for Rotaract District 3141.",
};

export default function AdminLoginRoute() {
	return <AdminLoginPage />;
}