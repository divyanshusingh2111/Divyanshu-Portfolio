import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { SelectedWork } from "@/components/portfolio/selected-work";
import { About } from "@/components/portfolio/about";
import { Timeline } from "@/components/portfolio/timeline";
import { Education } from "@/components/portfolio/education";
import { Skills } from "@/components/portfolio/skills";
import { Tools } from "@/components/portfolio/tools";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { BackToTop } from "@/components/portfolio/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />
      <main className="flex-1">
        <Hero />
        <SelectedWork />
        <About />
        <Timeline />
        <Education />
        <Skills />
        <Tools />
        <Contact />
      </main>
      <Footer />
      <ScrollProgress />
      <BackToTop />
    </div>
  );
}
