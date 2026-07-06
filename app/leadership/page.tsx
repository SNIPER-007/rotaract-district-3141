import type { Metadata } from "next";
import { LeadershipPage } from "@/components/leadership/page";
import { loadLeadershipPageData } from "@/data/leadership.server";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Leadership page for Rotaract District 3141.",
};

export default function LeadershipRoute() {
  const leadershipData = loadLeadershipPageData();

  return <LeadershipPage data={leadershipData} />;
}
