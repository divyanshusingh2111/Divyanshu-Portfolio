"use client";

import * as React from "react";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import SelectedWork from "@/components/portfolio/SelectedWork";
import AboutMe from "@/components/portfolio/AboutMe";
import ProcessMethodology from "@/components/portfolio/ProcessMethodology";
import Timeline from "@/components/portfolio/Timeline";
import Education from "@/components/portfolio/Education";
import SkillsMatrix from "@/components/portfolio/SkillsMatrix";
import ToolsStack from "@/components/portfolio/ToolsStack";
import FAQ from "@/components/portfolio/FAQ";
import ContactFooter from "@/components/portfolio/ContactFooter";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import BackToTop from "@/components/portfolio/BackToTop";
import CommandPalette from "@/components/portfolio/CommandPalette";
import KeyboardHelp from "@/components/portfolio/KeyboardHelp";
import SectionIndicator from "@/components/portfolio/SectionIndicator";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <KeyboardHelp />
      <SectionIndicator />

      <Header />
      <main className="flex flex-col">
        <Hero />
        <SelectedWork />
        <AboutMe />
        <ProcessMethodology />
        <Timeline />
        <Education />
        <SkillsMatrix />
        <ToolsStack />
        <FAQ />
        <ContactFooter />
      </main>

      <BackToTop />
    </>
  );
}
