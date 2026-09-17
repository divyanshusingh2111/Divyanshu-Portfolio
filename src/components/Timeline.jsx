const EXPERIENCE = [
  {
    role: "Lead UX Designer",
    org: "KlimaShift",
    period: "2023 Sep - Present",
    active: true,
    description:
      "Leading UX strategy and product design for AI-powered energy intelligence systems, operational dashboards, and enterprise workflows.",
  },
  {
    role: "UI/UX Designer",
    org: "Quantmhill IT Service & Consultancy",
    period: "2023 Apr - 2023 Sep",
    description:
      "Designed enterprise software interfaces and usability-focused operational workflows for consulting and IT services clients.",
  },
  {
    role: "UI/UX Designer",
    org: "Learniphi Technology Pvt. Ltd.",
    period: "2022 Sep - 2023 Mar",
    description:
      "Designed gamified educational systems and enterprise learning experiences focused on engagement and completion optimization.",
  },
  {
    role: "Freelance Product & Brand Designer",
    org: null,
    period: "2020 Aug - Present",
    description:
      "Designing digital commerce systems, branding ecosystems, and scalable visual experiences for startups and growing businesses.",
  },
];

function TimelineRow({ item }) {
  return (
    <div className="relative flex flex-col gap-2 pl-8">
      <span
        className={`absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full border-2 ${
          item.active ? "border-accent bg-white" : "border-[#bdbdbd] bg-bg"
        }`}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xl font-bold sm:text-2xl">
          {item.role} {item.org && <span className="text-base font-normal text-muted">@ {item.org}</span>}
        </p>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs font-medium ${
            item.active
              ? "border-[rgba(224,106,59,0.1)] bg-[rgba(224,106,59,0.18)] text-accent"
              : "border-[#bdbdbd] text-faint"
          }`}
        >
          {item.period}
        </span>
      </div>
      <p className="max-w-[720px] leading-relaxed text-faint">{item.description}</p>
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="process" className="border-t border-line px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-14">
        <div>
          <p className="mb-4 font-mono text-xs font-bold text-accent">● PROCESS LEDGER</p>
          <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
            Work Timeline & Experience
          </h2>
        </div>

        <div className="relative border-l-2 border-dashed border-line pl-2">
          <div className="flex flex-col gap-14">
            {EXPERIENCE.map((item) => (
              <TimelineRow key={item.role + (item.org ?? "")} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
