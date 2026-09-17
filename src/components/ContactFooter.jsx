const FOOTER_LINKS = [
  { label: "EMAIL", href: "mailto:divyanshuv.singh@gmail.com" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/divyanshu-singh-2308671b2" },
  { label: "BEHANCE", href: "https://www.behance.net/divyanshu2009f" },
  { label: "RESUME DOWNLOAD", href: "/resume.pdf" },
];

export default function ContactFooter() {
  return (
    <section id="contact" className="border-t border-line px-6 py-20 text-center md:px-16">
      <div className="mx-auto flex max-w-[672px] flex-col items-center gap-6">
        <p className="font-mono text-xs font-bold text-accent">● CONNECT WITH ME</p>
        <h2 className="text-4xl leading-tight font-bold sm:text-6xl">
          Let's build something{" "}
          <span className="font-hand font-bold text-accent">meaningful</span> together.
        </h2>
        <p className="text-lg text-muted">
          Open to product design, UX strategy, enterprise UX, and emerging technology
          opportunities.
        </p>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1312px] flex-wrap items-center justify-center gap-x-10 gap-y-4 border-b border-line pb-10 font-mono text-xs font-bold">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            [ {link.label} ]
          </a>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-[1312px] flex-col items-center justify-between gap-2 font-mono text-[10px] text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} DIVYANSHU SINGH. ALL RIGHTS RESERVED.</p>
        <p>BUILT WITH ALL SKILLS & KNOWLEDGE</p>
      </div>
    </section>
  );
}
