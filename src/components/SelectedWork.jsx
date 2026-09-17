import { Link } from "react-router-dom";
import {
  workKlimaShiftThumb,
  workAutoremovThumb,
  workTriviraThumb,
} from "../assets/figma-assets";

const PROJECTS = [
  {
    index: "01",
    title: "KlimaShift",
    subtitle: "AI Energy Intelligence Platform",
    tags: ["Dashboard", "AI", "SaaS"],
    thumb: workKlimaShiftThumb,
    to: "/work/klimashift",
    thumbBg: "bg-bg",
  },
  {
    index: "02",
    title: "Autoremov Platform",
    subtitle: "SaaS platform and Website",
    tags: ["Service", "Image Background", "Web"],
    thumb: workAutoremovThumb,
    to: "/work/autoremov",
    thumbBg: "bg-gradient-to-b from-card to-bg",
  },
  {
    index: "03",
    title: "Trivira Global Branding",
    subtitle: "Branding & Packaging Design",
    tags: ["Branding", "Packaging", "Web"],
    thumb: workTriviraThumb,
    to: "/work/trivira",
    thumbBg: "bg-gradient-to-b from-card to-bg",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 font-mono text-xs font-bold text-accent">● SELECTED WORK</p>
            <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
              Crafting experiences that drive{" "}
              <span className="font-hand font-bold text-accent">real impact.</span>
            </h2>
          </div>
          <div />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.title}
              to={project.to}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className={`aspect-[270/190] overflow-hidden rounded-xl border border-line ${project.thumbBg}`}>
                <img
                  src={project.thumb}
                  alt={project.title}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[11px] font-bold text-muted">{project.index}</p>
                <p className="text-lg font-bold">{project.title}</p>
                <p className="text-xs text-muted">{project.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-card px-2 py-0.5 font-mono text-[8.5px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
