import Header from "../components/Header";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import AboutMe from "../components/AboutMe";
import Timeline from "../components/Timeline";
import Education from "../components/Education";
import SkillsMatrix from "../components/SkillsMatrix";
import ToolsStack from "../components/ToolsStack";
import ContactFooter from "../components/ContactFooter";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelectedWork />
        <AboutMe />
        <Timeline />
        <Education />
        <SkillsMatrix />
        <ToolsStack />
        <ContactFooter />
      </main>
    </>
  );
}
