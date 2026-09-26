import type { CaseStudy } from "./types";

export const trivira: CaseStudy = {
  id: "trivira",
  index: "03",
  title: "Trivira Global Branding",
  subtitle: "Branding & Packaging Design",
  cover: "/design-assets/trivira-card.jpg",
  coverAlt: "Trivira Global Enterprise logo mounted on an industrial building facade",
  tags: ["Branding", "Packaging", "Web"],
  theme: {
    accent: "#1B8A3D",
    accentSoft: "#E8F3EB",
    accentSoftDark: "rgba(52,197,123,0.14)",
    heroBg: "linear-gradient(135deg, #1B4D3E 0%, #2E7D62 100%)",
    heroText: "#FFFFFF",
    closingBg: "linear-gradient(135deg, #1B5E3F 0%, #1A4D2E 100%)",
    chrome: "blueprint",
  },
  hero: {
    label: "CASE STUDY 03 · BRAND STRATEGY & E-COMMERCE UX · NUTRACEUTICALS",
    title: "Trivira Global Enterprise",
    paragraph:
      "Transforming a mission-driven wellness startup into a ₹64 Lakh revenue engine — through a founder-first brand architecture, outcome-based product UX, and a trust-led e-commerce ecosystem that converted skeptical browsers into 100,000+ loyal customers.",
    tags: ["Brand Identity", "E-Commerce UX", "Conversion Optimisation", "Information Architecture", "Nutraceuticals"],
    stats: [
      { value: "₹64L", label: "Revenue in 12 Months", tone: "green" },
      { value: "100K+", label: "Happy Customers", tone: "blue" },
      { value: "4+", label: "Marketplace Channels", tone: "purple" },
      { value: "8", label: "Product Lines Designed", tone: "orange" },
    ],
  },
  meta: [
    { label: "Role", value: "Freelance Brand Strategist & UX Designer" },
    { label: "Client", value: "Trivira Global Enterprise" },
    { label: "Type", value: "Nutraceuticals & Plant-Based Wellness" },
    { label: "Deliverables", value: "Brand Identity, Website UX, Product Design System" },
    { label: "Channels", value: "Web · Amazon · Flipkart · Meesho · IndiaMart" },
  ],
  sections: [
    {
      id: "problem",
      label: "01 · PROBLEM STATEMENT",
      heading: "Demystifying Niche Science for the",
      headingAccent: "Mass Market",
      blocks: [
        {
          type: "text",
          lead: true,
          text: "The Indian wellness market was flooded with generic supplement brands. Trivira had superior formulations — but zero digital presence. The challenge was dual: build trust for products unfamiliar to most Indian consumers (functional mushrooms, adaptogens) while creating a frictionless conversion path. Too much science = confusion. Too little = no credibility.",
        },
        {
          type: "cards",
          tone: "green",
          cards: [
            { title: "Science Complexity Barrier", body: "Functional mushrooms and adaptogens needed to be explained without alienating non-expert users — ancient benefits in modern language.", icon: "square" },
            { title: "Trust Deficit for New Brand", body: "Zero brand heritage meant every page had to earn trust through certifications, founder story, and transparent formulation claims.", icon: "square" },
            { title: "Fragmented Checkout Path", body: "Inconsistencies between product packaging and digital shop grids created visual friction that undermined purchase confidence.", icon: "square" },
          ],
        },
      ],
    },
    {
      id: "brand",
      label: "02 · BRAND ARCHITECTURE",
      heading: "Three Pillars.",
      headingAccent: "One Voice.",
      blocks: [
        {
          type: "text",
          text: "The brand identity is anchored by three guiding principles — every touchpoint, from product labels to homepage hero copy, reinforces the enterprise's commitment to quality. A 'Founder-First' narrative bridges clinical efficacy and human empathy.",
        },
        {
          type: "cards",
          columns: 3,
          cards: [
            { title: "Purity", body: "Products crafted from clean, natural ingredients, eliminating the chemical-heavy additives of legacy supplement brands. Every formulation is certified clean-label — Gelatin Free, Gluten Free, Non-GMO, Soy-Free, and Vegan Friendly.", tag: "CERTIFIED CLEAN-LABEL FORMULATION ACROSS ALL 8 PRODUCT LINES", tone: "green" },
            { title: "Sustainability", body: "A commitment to respecting nature through eco-conscious sourcing and packaging. Long-term environmental stewardship is embedded into supply chain decisions, creating alignment between brand values and product experience.", tag: "ECO-CONSCIOUS SOURCING · RESPONSIBLE PACKAGING STANDARDS", tone: "blue" },
            { title: "Care", body: "Prioritizing the holistic well-being of the user in every formulation and digital interaction. UX itself embodies care — minimizing cognitive load, surfacing the right information at the right moment in the purchase journey.", tag: "USER-FIRST UX DECISIONS AT EVERY FUNNEL STAGE", tone: "purple" },
          ],
        },
        {
          type: "pills",
          label: "COMPETITIVE DIFFERENTIATORS — CERTIFICATION TRUST STRIP",
          items: ["ISO Certified", "FDA Compliant", "Non-GMO", "HACCP", "cGMP Facility", "Vegan Friendly", "Gluten Free", "Gelatin Free"],
          tone: "green",
        },
      ],
    },
    {
      id: "journey",
      label: "03 · UX FLOW",
      heading: "From Curiosity to Checkout —",
      headingAccent: "Zero Cognitive Load",
      blocks: [
        {
          type: "text",
          text: "The IA was engineered to minimise Time-to-Value (TTV). A tiered navigation ecosystem balances product discovery with educational content, driving a conversion funnel that justifies a ₹64L revenue outcome.",
        },
        {
          type: "stages",
          items: [
            { stage: "01", title: "Awareness & Education", body: "Users land on the homepage or SEO-optimised blogs detailing the benefits of functional mushrooms and plant-based health. Benefit-led hero, educational content blocks, functional category navigation (Focus / Energy / Calm / Heart Health).", tone: "purple" },
            { stage: "02", title: "Trust Building", body: "Certifications, founder story and transparent formulation claims de-risk the first purchase at every entry point.", tone: "green" },
            { stage: "03", title: "Exploration", body: "Outcome-based product grids and quick-filter tags keep browsing frictionless — one tap to category, eliminating the paradox of choice.", tone: "orange" },
            { stage: "04", title: "Conversion", body: "High-contrast Add to Cart CTAs with zero competing visual noise, star ratings with review counts as quantified social proof.", tone: "green" },
          ],
        },
      ],
    },
    {
      id: "products",
      label: "04 · PRODUCT ECOSYSTEM",
      heading: "Benefits Over",
      headingAccent: "Ingredients",
      blocks: [
        {
          type: "text",
          text: "The 'Paradox of Choice' is a conversion killer. Solving this meant presenting functional outcomes (Focus / Energy / Calm) rather than raw ingredient lists — directly driving the ₹64L growth milestone.",
        },
        {
          type: "pills",
          label: "Filter",
          items: ["All Products", "Sweeteners", "Mushrooms", "Greens", "Protein"],
          tone: "green",
        },
        {
          type: "cards",
          columns: 4,
          cards: [
            { eyebrow: "FOCUS", title: "Stevia", body: "Target: Weight-loss seekers & diabetics. Calorie-free entry point into brand ecosystem. Converts metabolic health consumers with zero-risk first purchase.", tone: "green" },
            { eyebrow: "BALANCE", title: "Monk Fruit", body: "Target: Diabetics & keto dieters. Premium, insulin-friendly solution. Captures high-LTV demographic with repeat purchase velocity.", tone: "yellow" },
            { eyebrow: "ENERGY", title: "Cordyceps", body: "Target: Fitness enthusiasts. Tangible performance gains without artificial stimulants. Appeals to the clean-sports market.", tone: "red" },
            { eyebrow: "CALM", title: "Reishi", body: "Target: Urban professionals. Non-pharmacological recovery for high-stress users. Captures the sleep & stress management segment.", tone: "purple" },
            { eyebrow: "FOCUS", title: "Lion's Mane", body: "Target: Knowledge workers & bio-hackers. Positions brand as a productivity partner. High-LTV cognitive health advocates.", tone: "blue" },
            { eyebrow: "IMMUNITY", title: "Spirulina", body: "Target: Daily wellness consumers. Foundational cross-sell product. Drives basket size and repeat purchase through daily use habits.", tone: "teal" },
            { eyebrow: "DETOX", title: "Chlorella", body: "Target: Holistic health consumers. Targets internal cleansing segment. Entry point for premium wellness bundle upsells.", tone: "cyan" },
            { eyebrow: "RECOVERY", title: "Plant Protein", body: "Target: Gym-goers & vegan athletes. Disrupts mass-market protein with clean-label promise. Drives recurring subscriptions.", tone: "orange" },
          ],
        },
      ],
    },
    {
      id: "screens",
      label: "05 · KEY SCREEN ANALYSIS",
      heading: "Four Critical Interface",
      headingAccent: "Moments",
      blocks: [
        {
          type: "cards",
          columns: 2,
          cards: [
            { eyebrow: "A · HOMEPAGE", title: "Conversion & Trust Hub", body: "Benefit-led navigation: Focus, Energy, Calm, Heart Health — not product categories. Social proof banner: 100,000+ Happy Customers prominently above the fold. Formulation transparency strip: Gelatin-Free, Gluten-Free, Non-GMO, Soy-Free, Vegan icons. High-visibility certification placement: ISO, FDA, HACCP, GMP directly on entry.", tone: "green" },
            { eyebrow: "B · SHOP PAGES", title: "Frictionless Browsing", body: "Quick-filter tabs: Stevia / Plant Protein / Functional Mushrooms — one tap to category. Product cards with flavor variants (Mixed Berries, Chocolate, Coffee) reduce return visits. Star ratings with review counts (5 stars / 30 reviews) — quantified social proof. High-contrast Add to Cart CTA with zero competing visual noise.", tone: "blue" },
            { eyebrow: "C · EDUCATIONAL BLOG", title: "Top-of-Funnel Engine", body: "Content hierarchy: clear subheadings, bulleted Key Benefits lists for scannability. Scientific breakdowns (dual extraction methods) position brand as subject matter expert. Cross-pollination grid: 'Recently Published' articles keep users in the ecosystem longer. SEO-optimised structure converts organic traffic into informed, high-LTV advocates.", tone: "purple" },
            { eyebrow: "D · CORPORATE PAGES", title: "Authority & Growth", body: "Founder's Story on About Us humanises the brand with Sachin Trivedi's personal mission. Seamless Careers form: role expectations, benefits, Upload Resume — structured talent pipeline. Contact Sales form for B2B enterprise scaling and franchise partnerships. Newsletter subscription as Zero-Party Data collection engine for personalised re-marketing.", tone: "orange" },
          ],
        },
      ],
    },
    {
      id: "live-site",
      label: "05.5 · LIVE WEBSITE",
      heading: "The Final Product —",
      headingAccent: "Shipped & Live",
      blocks: [
        {
          type: "text",
          text: "Every screen was designed to serve a specific user goal — from homepage trust-building to frictionless job applications. These are the actual delivered pages, live on trivira.com.",
        },
        {
          type: "image",
          image: {
            src: "/design-assets/case-studies/trivira-homepage-full.jpg", w: 1100, h: 5822,
            alt: "Trivira homepage: Lion's Mane hero, certification strip, outcome navigation and 10K customers banner",
            browserUrl: "trivira.com",
            frameTag: "Homepage · Conversion Hub",
            tall: true,
          },
        },
        {
          type: "cards",
          columns: 4,
          tone: "green",
          cards: [
            { title: "Lion's Mane Hero", body: "Benefit-led headline with mushroom photography — nature authority established immediately." },
            { title: "Certification Strip", body: "ISO, FDA, HACCP, GMP, Non-GMO — visible above fold to de-risk first-time purchase." },
            { title: "Outcome Navigation", body: "Focus / Energy / Calm / Heart Health — products framed by user-desired outcome, not ingredient." },
            { title: "10K Customers Banner", body: "Social proof as full-width strip — quantified community trust before the product grid." },
          ],
        },
        {
          type: "gallery",
          images: [
            { src: "/design-assets/case-studies/trivira-shop-all.jpg", w: 1100, h: 4631, alt: "Shop All page with Stevia section and product shots", browserUrl: "trivira.com/shop", frameTag: "Shop · Outcome Categories", tall: true },
            { src: "/design-assets/case-studies/trivira-about-us.jpg", w: 1100, h: 2814, alt: "About Us page with founder story and mission", browserUrl: "trivira.com/about-us", frameTag: "About · Brand Authority", tall: true },
            { src: "/design-assets/case-studies/trivira-blogs-discovery.jpg", w: 1100, h: 1687, alt: "Blogs discovery page with three category cards", browserUrl: "trivira.com/blogs", frameTag: "Blogs · Educational", tall: true },
            { src: "/design-assets/case-studies/trivira-blog-article.jpg", w: 1100, h: 3646, alt: "Functional Mushrooms blog article with share icons", browserUrl: "trivira.com/blogs/functional-mushrooms", frameTag: "Blog Article", tall: true },
          ],
        },
        {
          type: "gallery",
          images: [
            { src: "/design-assets/case-studies/trivira-careers-landing.jpg", w: 1100, h: 1894, alt: "Careers landing page with job family accordion and team photo", browserUrl: "trivira.com/careers", frameTag: "Careers Landing", tall: true },
            { src: "/design-assets/case-studies/trivira-job-description.jpg", w: 1100, h: 1529, alt: "Sales and Marketing Executive job description page", browserUrl: "trivira.com/careers/sales-marketing", frameTag: "Job Description", tall: true },
            { src: "/design-assets/case-studies/trivira-application-form.jpg", w: 1100, h: 1555, alt: "Job application form with resume upload", browserUrl: "trivira.com/careers/apply", frameTag: "Application Form", tall: true },
            { src: "/design-assets/case-studies/trivira-contact.jpg", w: 1100, h: 1195, alt: "Contact page with form and newsletter footer", browserUrl: "trivira.com", frameTag: "Contact · Sales Bridge", tall: true },
          ],
        },
      ],
    },
    {
      id: "proof",
      label: "06 · SOCIAL PROOF & OMNICHANNEL",
      heading: "Trust at Every",
      headingAccent: "Exit Point",
      blocks: [
        {
          type: "text",
          text: "Testimonials are deployed as the 'closing argument' of the UX flow — specifically overcoming the primary sensory barrier of the sweetener market. The UX acknowledges the user's existing shopping habits: integrating major marketplace links leverages their built-in trust to bolster Trivira's own digital storefront.",
        },
        {
          type: "quote",
          quote: {
            text: "I love that this Stevia has zero bitter aftertaste. I've tried many brands and this is the first one that actually tastes natural. Perfect for my tea every morning.",
            author: "Gaurav J.",
            meta: "Verified Buyer · Stevia Powder · SENSORY TRUST SIGNAL",
            tone: "green",
          },
        },
        {
          type: "cards",
          columns: 4,
          cards: [
            { title: "Amazon", body: "Bult-in marketplace trust, reviews and fast Prime delivery capture mainstream purchase intent.", tone: "orange" },
            { title: "Flipkart", body: "Big-billion-day traffic and loyal Flipkart Plus users in Tier-2 cities.", tone: "blue" },
            { title: "Meesho", body: "Reseller network and price-sensitive first-time supplement buyers.", tone: "purple" },
            { title: "Direct Web — PRIMARY", body: "Highest margin channel; full brand experience, newsletter capture and repeat subscriptions.", tone: "green" },
          ],
        },
      ],
    },
  ],
  closing: {
    label: "07 · BUSINESS IMPACT & KEY TAKEAWAYS",
    heading: "Design as a Revenue Engine",
    text: "The ₹64 Lakh milestone in 12 months demonstrates that design was the catalyst for every funnel stage — shifting Trivira's brand perception from a generic supplement provider to a trusted wellness partner.",
    cards: [
      {
        title: "Trust-Led Design",
        body: "Successfully shifted the brand narrative from chemical-heavy supplements to nature-based purity. Every page element serves as a trust signal.",
      },
      {
        title: "Educational Authority",
        body: "Deep-form content and 'So What?' scientific benefits moved users through the sales funnel with confidence, creating high-LTV advocates.",
      },
      {
        title: "Omnichannel Reach",
        body: "Integration with major Indian e-marketplaces captures traffic at every touchpoint, leveraging existing marketplace trust for the brand's own storefront.",
      },
    ],
  },
};
