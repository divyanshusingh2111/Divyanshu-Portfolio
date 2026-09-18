import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ConnectionIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M7 7.5 10.5 16M17 7.5 13.5 16" />
    </svg>
  );
}

export function PrototypeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 4v5" />
      <circle cx="6" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 5 1V5a3 3 0 0 0-2-1Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-5 1V5a3 3 0 0 1 2-1Z" />
    </svg>
  );
}

export function AiMagicIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m12 3 2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3Z" />
      <path d="M19 16.5 19.7 18l1.5.7-1.5.7L19 21l-.7-1.6-1.5-.7 1.5-.7.7-1.5Z" />
    </svg>
  );
}

export function VrGlassesIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="2" y="7" width="20" height="10" rx="3" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" {...props}>
      <path d="M18 10C12 12 8 17 8 24v10h12V22h-6c0-4 3-7 6-8l-2-4Zm22 0c-6 2-10 7-10 14v10h12V22h-6c0-4 3-7 6-8l-2-4Z" />
    </svg>
  );
}

export function SketchArrowIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 40c20-30 60-30 90-10" />
      <path d="M98 30 110 18m0 0-2 14m2-14-14 2" />
      <path d="M30 50c4 6 10 8 16 6" opacity="0.6" />
    </svg>
  );
}

export function DoodleLineIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12c10-6 20 6 30 0s20-6 30 0 20 6 30 0 20-6 30 0 20 6 30 0" />
    </svg>
  );
}

// Brand/tool glyphs — simplified monochrome marks so they read clearly at small sizes.
export function FigmaMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.5 2h3.5v6H8.5a3 3 0 1 1 0-6Z" fill="#F24E1E" />
      <path d="M12 2h3.5a3 3 0 1 1 0 6H12V2Z" fill="#FF7262" />
      <path d="M8.5 8H12v6H8.5a3 3 0 1 1 0-6Z" fill="#A259FF" />
      <path d="M12 8h3.5a3 3 0 1 1 0 6H12V8Z" fill="#1ABCFE" />
      <path d="M8.5 14H12v3a3 3 0 1 1-3.5-3Z" fill="#0ACF83" />
    </svg>
  );
}

export function FramerMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 2h16v6H12l8 6v2H12l8 6H4v-8h8L4 8V2Z" />
    </svg>
  );
}

export function WixMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 7h2.2l1.4 7L9.4 7h2l1.8 7 1.4-7H17l-2.6 10h-2.2l-1.6-6.4L9 17H6.8L4 7Z" />
    </svg>
  );
}

export function MiroMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4h4.5l2 4-2 4H5l-1-8Zm6 0h4l3 6-3 6h-4l3-6-3-6Zm6.5 0H21l-1 8h-3.5l-2-4 2-4Z" />
    </svg>
  );
}

export function PhotoshopMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#001E36" />
      <path d="M7 17V8h2.4c1.6 0 2.6.8 2.6 2.3 0 1.6-1 2.4-2.6 2.4H8.4V17H7Zm1.4-5h1c.8 0 1.2-.4 1.2-1.2 0-.8-.4-1.1-1.2-1.1h-1V12ZM14 17v-1.2c.3.1.7.2 1.2.2.6 0 1-.3 1-.8 0-.4-.3-.6-1-.9-1-.4-1.5-.9-1.5-1.8 0-1 .8-1.7 2-1.7.5 0 1 .1 1.3.2v1.2c-.3-.1-.7-.2-1.1-.2-.6 0-.9.3-.9.7 0 .4.3.6 1 .9 1 .4 1.6.9 1.6 1.9 0 1.1-.8 1.8-2.1 1.8-.6 0-1.1-.1-1.5-.3Z" fill="#31A8FF" />
    </svg>
  );
}

export function IllustratorMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#330000" />
      <path d="M9 16l1-3h3l1 3h1.4L12.5 7H11L8 16h1Zm1.4-4 1-3 1 3h-2ZM15 16V9h1.3v7H15Z" fill="#FF9A00" />
    </svg>
  );
}

export function ClaudeMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c1.5 3.5 3.5 5.5 7 7-3.5 1.5-5.5 3.5-7 7-1.5-3.5-3.5-5.5-7-7 3.5-1.5 5.5-3.5 7-7Z" />
    </svg>
  );
}

export function GeminiMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c.5 5 2.5 7 7 7.5C14.5 10 12.5 12 12 17c-.5-5-2.5-7-7-7.5C9.5 9 11.5 7 12 2Z" />
      <path d="M12 17c.3 2.5 1.5 3.7 4 4-2.5.3-3.7 1.5-4 4-.3-2.5-1.5-3.7-4-4 2.5-.3 3.7-1.5 4-4Z" opacity="0.7" />
    </svg>
  );
}

export function CursorMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l7 16 2-6 6-2L4 4Z" />
    </svg>
  );
}

export function ChatGptMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3a4 4 0 0 1 3.8 2.7 4 4 0 0 1 3.5 4 4 4 0 0 1 .2 4.3 4 4 0 0 1-2.4 3.7 4 4 0 0 1-3.5 2.6 4 4 0 0 1-3.6 1.4 4 4 0 0 1-3.6-1.4 4 4 0 0 1-3.5-2.6 4 4 0 0 1-2.4-3.7 4 4 0 0 1 .2-4.3 4 4 0 0 1 3.5-4A4 4 0 0 1 12 3Zm-1.5 5.5c-1.4.8-1.9 2.5-1.1 3.9.4.7 1 1.1 1.7 1.3l-.4.7c-1-.3-1.9-.9-2.5-1.9-1-1.7-.6-3.8.9-5l1.4 1Zm5 1c1 .3 1.9.9 2.5 1.9 1 1.7.6 3.8-.9 5l-1.4-1c1.4-.8 1.9-2.5 1.1-3.9-.4-.7-1-1.1-1.7-1.3l.4-.7Z" />
    </svg>
  );
}

export function NotebookLmMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3Zm3 3v3h3V6H8Zm0 5v3h3v-3H8Z" />
      <path d="M18 5h2v13a2 2 0 0 1-2 2V5Z" opacity="0.6" />
    </svg>
  );
}

export function MidjourneyMark(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 18c2-6 6-9 9-9s7 3 9 9c-3-3-6-4-9-4s-6 1-9 4Z" />
      <path d="M6 14c1.5-3 3.5-4.5 6-4.5s4.5 1.5 6 4.5c-2-1.5-4-2-6-2s-4 .5-6 2Z" opacity="0.6" />
    </svg>
  );
}
