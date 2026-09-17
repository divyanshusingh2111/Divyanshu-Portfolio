import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Resume", href: "#contact" },
];

function Anchor({ href, className, children }) {
  const onHome = useLocation().pathname === "/";
  if (onHome) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={`/${href}`} className={className}>
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-10 border-b border-line bg-[rgba(249,247,243,0.9)] px-6 py-4 backdrop-blur-sm md:px-16">
      <Anchor href="#top" className="flex items-center gap-2 shrink-0">
        <span className="relative flex size-8 items-center justify-center rounded-full bg-accent-soft">
          <span className="absolute inset-0.5 rounded-full bg-[rgba(224,106,59,0.3)]" />
          <span className="relative font-sans text-[17px]">D</span>
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[13px]">Divyanshu Singh</span>
          <span className="font-mono text-[9px] text-muted">PORTFOLIO</span>
        </span>
      </Anchor>

      <nav className="hidden gap-8 font-mono text-[11px] font-bold text-muted md:flex">
        {NAV_LINKS.map((link) => (
          <Anchor
            key={link.label}
            href={link.href}
            className="transition-colors hover:text-ink"
          >
            {link.label}
          </Anchor>
        ))}
      </nav>

      <Anchor
        href="#contact"
        className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white"
      >
        Let's Connect <span aria-hidden>→</span>
      </Anchor>
    </header>
  );
}
