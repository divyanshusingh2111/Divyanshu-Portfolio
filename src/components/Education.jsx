const EDUCATION = [
  {
    degree: "M.Des in UX Design",
    tag: "[ POSTGRADUATE // 2025 — 2027 ]",
    active: true,
    description:
      "DIT University. Focusing on advanced interaction architectures, data accessibility systems, and strategic enterprise software design patterns.",
  },
  {
    degree: "M.Sc in UX Design & Management",
    tag: "[ INTERNATIONAL SPEC // GÖTTINGEN, GERMANY ]",
    description:
      "PFH University of Applied Sciences. Enrolled in international postgrad systems. Decoupled after 1 year of study (2023 - 2024) to transition fully into high-impact product leadership at KlimaShift.",
  },
  {
    degree: "Bachelor of Design (B.Des) in Industrial Design",
    tag: "[ UNDERGRADUATE // 2018 — 2022 ]",
    description:
      "Uttar Pradesh Institute of Design (UPID), Noida. Specialized in physical ergonomics, systems modeling, and user-centered design—building a core foundation for translating complex physical-to-digital structures.",
  },
];

export default function Education() {
  return (
    <section className="border-t border-line px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs font-bold text-accent">● ACADEMIC FOUNDATIONS</p>
          <h2 className="text-4xl font-bold sm:text-5xl">Education</h2>
          <p className="max-w-[600px] text-xs text-faint">
            Specialized research workflows crossing human-computer interfaces, industrial
            design, and predictive systems.
          </p>
        </div>

        <div className="relative border-l-2 border-dashed border-line pl-2">
          <div className="flex flex-col gap-16">
            {EDUCATION.map((item) => (
              <div key={item.degree} className="relative flex flex-col gap-2 pl-8">
                <span
                  className={`absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full border-2 ${
                    item.active ? "border-accent bg-white" : "border-[#bdbdbd] bg-bg"
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-bold sm:text-2xl">{item.degree}</p>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 font-mono text-xs font-medium ${
                      item.active
                        ? "border-[rgba(224,106,59,0.1)] bg-[rgba(224,106,59,0.18)] text-accent"
                        : "border-[#bdbdbd] text-faint"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <p className="max-w-[760px] leading-relaxed text-faint">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
