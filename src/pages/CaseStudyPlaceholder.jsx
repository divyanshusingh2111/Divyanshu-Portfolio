import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  workKlimaShiftThumb,
  workAutoremovThumb,
  workTriviraThumb,
} from "../assets/figma-assets";

const PROJECTS = {
  klimashift: {
    title: "KlimaShift",
    subtitle: "AI Energy Intelligence Platform",
    tags: ["Dashboard", "AI", "SaaS"],
    thumb: workKlimaShiftThumb,
  },
  autoremov: {
    title: "Autoremov Platform",
    subtitle: "SaaS platform and Website",
    tags: ["Service", "Image Background", "Web"],
    thumb: workAutoremovThumb,
  },
  trivira: {
    title: "Trivira Global Branding",
    subtitle: "Branding & Packaging Design",
    tags: ["Branding", "Packaging", "Web"],
    thumb: workTriviraThumb,
  },
};

export default function CaseStudyPlaceholder() {
  const { slug } = useParams();
  const project = PROJECTS[slug];

  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-screen max-w-[672px] flex-col items-center justify-center gap-6 px-6 pt-32 pb-16 text-center">
        <p className="font-mono text-xs font-bold tracking-wide text-accent">
          ● CASE STUDY — COMING SOON
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">{project?.title ?? "Case Study"}</h1>
        {project && <p className="text-lg text-muted">{project.subtitle}</p>}

        {project && (
          <div className="aspect-[270/190] w-full max-w-[420px] overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <img src={project.thumb} alt={project.title} className="size-full object-cover" />
          </div>
        )}

        {project && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-card px-2 py-0.5 font-mono text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="max-w-md text-muted">
          I'm currently writing up the full story — the research, process and
          outcomes. It lands here soon. In the meantime, I'd love to hear from you.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
          <Link
            to="/#work"
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
          >
            <span aria-hidden>←</span> Back to all work
          </Link>
          <a
            href="mailto:divyanshuv.singh@gmail.com"
            className="border-b border-ink pb-0.5 text-sm font-bold text-ink"
          >
            Get in touch
          </a>
        </div>
      </main>
    </>
  );
}
