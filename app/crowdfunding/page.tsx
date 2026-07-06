import type { Metadata } from "next";
import { CrowdfundingPage } from "@/components/crowdfunding/page";

export const metadata: Metadata = {
  title: "Crowdfunding",
  description: "Crowdfunding page for Rotaract District 3141.",
};

export default function CrowdfundingRoute() {
  return <CrowdfundingPage />;
}