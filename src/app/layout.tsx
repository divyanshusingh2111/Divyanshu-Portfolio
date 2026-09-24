import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CommandPalette } from "@/components/portfolio/command-palette";
import { ShortcutHelp } from "@/components/portfolio/shortcut-help";

const clashDisplay = localFont({
  src: [
    { path: "../fonts/clash-display-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/clash-display-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/clash-display-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/clash-display-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const caveat = localFont({
  src: [
    { path: "../fonts/caveat-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/caveat-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/caveat-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/caveat-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-caveat",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "../fonts/space-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/space-mono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Divyanshu Singh — Product Designer",
  description:
    "Designing meaningful systems that create impact. Product designer specializing in UX strategy, dashboards, data visualization and AI-powered experiences.",
  keywords: [
    "Divyanshu Singh",
    "Product Designer",
    "UX Designer",
    "Portfolio",
    "Design Systems",
    "Data Visualization",
  ],
  authors: [{ name: "Divyanshu Singh" }],
  openGraph: {
    title: "Divyanshu Singh — Product Designer",
    description:
      "Designing meaningful systems that create impact. Product designer specializing in UX strategy, dashboards and AI-powered experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${clashDisplay.variable} ${inter.variable} ${caveat.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <CommandPalette />
          <ShortcutHelp />
        </ThemeProvider>
      </body>
    </html>
  );
}
