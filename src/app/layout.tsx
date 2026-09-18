import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import {
  PROJECTS,
  CONTACT_EMAIL,
  CONTACT_LINKEDIN,
  CONTACT_BEHANCE,
} from "@/lib/portfolio/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.NODE_ENV === "production"
        ? "https://divyanshu-portfolio-sepia.vercel.app"
        : "http://localhost:3000")
  ),
  title: "Divyanshu Singh — Product Designer",
  description:
    "Divyanshu Singh — Product Designer portfolio. UX strategy, product design, design systems and AI-ready experiences.",
  keywords: [
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "Design Systems",
    "AI UX",
    "Divyanshu Singh",
    "Portfolio",
  ],
  authors: [{ name: "Divyanshu Singh" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Divyanshu Singh — Product Designer",
    description:
      "UX strategy, product design, design systems and AI-ready experiences that drive meaningful impact.",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Divyanshu Singh — Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyanshu Singh — Product Designer",
    description:
      "UX strategy, product design, design systems and AI-ready experiences.",
    images: ["/api/og"],
  },
  alternates: {
    types: {
      "application/rss+xml": "/api/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for richer search results. Combines a Person
  // schema (the designer) with CreativeWork entries (the projects). Rendered
  // as a <script type="application/ld+json"> so crawlers can parse it.
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.NODE_ENV === "production"
      ? "https://divyanshu-portfolio-sepia.vercel.app"
      : "http://localhost:3000");

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Divyanshu Singh",
    jobTitle: "Product Designer",
    description:
      "Product Designer specializing in UX strategy, design systems, and AI-ready experiences.",
    url: BASE_URL,
    email: `mailto:${CONTACT_EMAIL}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    knowsAbout: [
      "UX Strategy",
      "Product Design",
      "Design Systems",
      "Data Visualization",
      "AI/AR Experiences",
      "Brand Identity",
    ],
    sameAs: [CONTACT_LINKEDIN, CONTACT_BEHANCE],
  };

  const projectsLd = PROJECTS.map((p) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: `${BASE_URL}/work/${p.slug}`,
    dateCreated: `${p.year}-01-01`,
    creator: {
      "@type": "Person",
      name: "Divyanshu Singh",
    },
    keywords: p.tags.join(", "),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [personLd, ...projectsLd],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
          <SonnerToaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
