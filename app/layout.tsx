import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import { Providers } from "@/components/common/providers";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-variable",
  subsets: ["latin"],
  display: "swap",
});

const caveatScript = Caveat({
  variable: "--font-caveat-variable",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rotaract District 3141",
    template: "%s | Rotaract District 3141",
  },
  description: "Official website of Rotaract District 3141.",
  applicationName: "Rotaract District 3141",
  authors: [{ name: "Rotaract District 3141" }],
  category: "community",
  creator: "Rotaract District 3141",
  keywords: [
    "Rotaract District 3141",
    "Rotaract",
    "Rotary",
    "service",
    "leadership",
    "fellowship",
  ],
  openGraph: {
    title: "Rotaract District 3141",
    description: "Official website of Rotaract District 3141.",
    siteName: "Rotaract District 3141",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary",
    title: "Rotaract District 3141",
    description: "Official website of Rotaract District 3141.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${interSans.variable} ${caveatScript.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
