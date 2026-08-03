import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Firebase admin access for Rotaract District 3141.",
};

export default function AdminRoute() {
  redirect("/admin/login");
}