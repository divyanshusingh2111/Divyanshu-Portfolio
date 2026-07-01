
Freelance Project · 2024 · UX/UI Design & Development
Autoremov
Designing and building the complete web presence for an AI-powered background removal SaaS — from zero to 25+ pages across 7 audience segments.

View Live Site
Role
Freelance UX/UI Designer
& Frontend Developer

Client
Autoremov
AI Background Removal SaaS

Timeline
8 weeks
Full project delivery

Scope
End-to-end design
Design system · 25+ pages

Tools
Figma · React · TypeScript
Tailwind CSS · Framer Motion

Year
2024
Freelance engagement

01
The Context
Autoremov approached me as a freelancer to design and build their complete web presence from scratch. The product — an AI-powered background removal tool — was technically ready, but the team had no marketing site, no design system, and no way to communicate their value to different buyer personas.

The engagement scope grew as the project progressed: what started as a landing page brief expanded into a full content and product experience spanning 25+ page types, a functional editor UI, and a 7-segment audience strategy.

I worked directly with the Autoremov founding team — handling all UX research, information architecture, visual design, design system creation, and React/TypeScript implementation.

Deliverables
Complete design system with colour tokens, typography scale, and 50+ components
Landing page with 8 sections — hero, features, use cases, pricing, gallery, API, testimonials
Functional product editor with multi-image batch processing, ZIP download, and comparison slider
7 audience-specific use case pages — E-commerce, Graphic Designers, Photographers, Social Media Creators, Marketing Teams, Press & Media, ID & Passport Photos
Full pricing page — subscription plans, credit top-up store, interactive cost calculator, plan comparison table
ID & Passport Photos dedicated page with School / College / Corporate audience tabs
12 supporting pages — About, API docs, Gallery, Blog, Help Center, Integrations, Contact, Sign-in, Sign-up, Dashboard, Settings, Design system reference
Dark/light mode throughout — all 25+ pages
02
Four Core Problems
The brief surfaced distinct UX challenges that each required a separate design solution rather than a generic template.

No web presence
Autoremov had a working AI product but zero marketing site. The team needed a complete web presence that could speak to multiple buyer personas and convert visitors into users.

Complex pricing model to communicate
The product uses a dual monetisation model — monthly subscription credits and one-time top-up packs. Most SaaS pricing pages can't handle this cleanly; the UX needed to make both feel intuitive side-by-side.

Seven very different audience segments
E-commerce sellers, photographers, graphic designers, social media creators, marketing teams, press rooms, and institutions (ID photos) each have completely different jobs-to-be-done. A generic feature page wouldn't convert any of them.

Editor UX for bulk workflows
Power users process hundreds of images at once. The editor needed to handle single images, multi-select batches, per-image download, and ZIP export — all without overwhelming first-time users.

03
Process
Eight weeks. Four phases. One designer handling the full stack from discovery through deployment.

Discover
Wk 1–2
Stakeholder kickoff — brand positioning, target users, revenue model
Competitive audit — Remove.bg, Clipping Magic, Canva, Slazzer
User persona mapping across 7 audience segments
Information architecture — site map, user flows, page priority matrix
Define
Wk 2–3
Design principles — Instant, Precise, Scalable, Segment-aware
Content strategy — SEO keyword mapping per page and segment
Component inventory — what's shared vs. unique per page
Pricing model UX logic — subscription + top-up mental model
Design
Wk 3–6
Design system — colour tokens, spacing scale, type ramp, icon set
High-fidelity Figma frames — all 25+ pages, dark + light mode
Interaction design — editor states, comparison slider, batch flow
Bento mosaic image layout — editorial alternative to standard grids
Develop
Wk 6–8
React + TypeScript implementation — component-by-component
Tailwind CSS design tokens wired to CSS custom properties
Framer Motion animation system — scroll-triggered, staggered, page transitions
Functional editor — file upload, processing simulation, batch tiles, ZIP download
04
Design System
Built before any page — the foundation everything else inherits from.

Colour Tokens
--electric-blue
Primary interactive, CTAs, links
#3B82F6
--neon-purple
Gradient partner, accents
#8B5CF6
--cyan-glow
Tertiary highlight, API page
#06B6D4
--dark-bg
Dark mode page background
#0F172A
--rich-dark
Dark mode card surface
#1E293B
Type Ramp
Display
Autoremov
Heading 1
Remove Background
Heading 2
AI-Powered Cutouts
Body
Process thousands of images in seconds
Label / Mono
UPLOAD · PROCESS · EXPORT
50+
Components
12
Colour tokens
8
Spacing steps
2
Theme modes
05
Key Screens
Landing Page
Product Editor
Pricing System
Use Case Pages
ID & Passport Photos
autoremov.com/landing-page
Landing Page
Screen
Landing Page

CategoryMarketing
Design Notes
Hero with live upload CTA, feature grid, 7-card use case section, pricing toggle, API section, gallery, and testimonials. Dark/light responsive.

06
Design Decisions
Four non-obvious choices that shaped the final product — each driven by a specific problem, not a visual preference.


D.01
Editorial bento mosaic over a photo grid
Problem
Standard 3-column photo grids look like stock photo libraries. They don't communicate the value of the product or tell a story about the user.

Solution
Two-row asymmetric CSS grid — 7+5 columns on row 1, 3+6+3 on row 2 — with stats and captions embedded directly on images as overlays at different positions. Each image is a different aspect ratio, so nothing aligns predictably.

Outcome
Pages feel editorial and curated rather than templated. The layout changes across use cases because the column spans adapt to the gradient, creating visual variation with the same component.


D.02
Subscription + top-up in one pricing tab UI




D.03
Horizontal tile strip for batch editor




D.04
Audience-first use case page architecture



07
Tools & Stack
Figma

High-fidelity design, design system, prototyping

React 18

Component architecture, routing, state management

TypeScript

Type-safe props, data models, route params

Tailwind CSS

Design token mapping, responsive utilities

Framer Motion

Scroll animations, page transitions, AnimatePresence

Unsplash API

Contextual photography for all 7 use case categories

08
Project Outcomes
25+
Pages designed & developed
7
Audience segment pages
50+
Design system components
8wk
End-to-end delivery
100+
ID format presets
2
Theme modes (dark/light)
Responsive · Dark & Light Mode
Desktop 1440px
Desktop view
375px
Mobile view
09
Reflection
WHAT WORKED
The segment-first architecture — building 7 audience pages as a single data-driven template — paid off significantly. It meant consistent quality across all segments without 7x the design work. The credit calculator was the single highest-leverage UI element: it handled the objection "is subscription or top-up better for me?" without requiring any copywriting.

WHAT I'D DO DIFFERENTLY
I would have established the design system tokens in Figma before writing any component code. The CSS custom property mapping evolved as pages were built, which required token refactoring mid-project. Starting with a locked token set would have prevented rework on dark mode border and surface colours in particular.

KEY LEARNING
A single pricing model assumption can invalidate your entire pricing page design. Discovering that Autoremov needed both subscription and pay-per-use during week 2 required a full redesign of the pricing section. Pricing UX conversations with the client should be the very first design conversation — not a feature discovery.

Next Step
View the live product or connect on Behance.