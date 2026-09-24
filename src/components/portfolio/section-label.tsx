interface SectionLabelProps {
  text: string;
  className?: string;
}

/** Orange dot + uppercase mono label used as eyebrow above every section heading */
export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <p
      className={`font-mono-x text-[11px] md:text-xs font-medium tracking-[0.22em] uppercase text-terra-deep flex items-center gap-2.5 ${className ?? ""}`}
    >
      <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-terra shrink-0" />
      {text}
    </p>
  );
}
