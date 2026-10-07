import PageIntro from "../components/PageIntro";
import PageCta from "../components/PageCta";
import About from "../sections/About";
import Team from "../sections/Team";

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About the company / 03"
        number="03"
        title="Practical software."
        accent="Clear thinking."
        description="NivraSolutions brings product thinking, purposeful design, and software engineering into one focused practice."
      />
      <About />
      <Team />
      <PageCta label="Talk with the team" />
    </>
  );
}
