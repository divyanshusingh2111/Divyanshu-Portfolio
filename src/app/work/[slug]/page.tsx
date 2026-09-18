import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/portfolio/Header";
import CaseStudyPage from "@/components/portfolio/CaseStudyPage";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import { PROJECTS } from "@/lib/portfolio/data";

type Params = { params: Promise<{ slug: string }> };

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://divyanshu-portfolio-six.vercel.app"
    : "http://localhost:3000");

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug.toLowerCase());
  if (!project) {
    return { title: "Case Study — Divyanshu Singh" };
  }
  const ogImage = `/api/og?title=${encodeURIComponent(project.title)}&subtitle=${encodeURIComponent(project.subtitle)}`;
  return {
    title: `${project.title} — Divyanshu Singh`,
    description: project.summary,
    alternates: { canonical: `${BASE_URL}/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Product Designer`,
      description: project.summary,
      type: "article",
      url: `${BASE_URL}/work/${project.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Divyanshu Singh`,
      description: project.summary,
      images: [ogImage],
    },
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug.toLowerCase());
  if (!project) notFound();

  return (
    <>
      <ScrollProgress />
      <Header />
      <CaseStudyPage project={project} />
    </>
  );
}
