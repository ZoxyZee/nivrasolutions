import PageIntro from "../components/PageIntro";
import PageCta from "../components/PageCta";
import Services from "../sections/Services";
import Process from "../sections/Process";

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="What we do / 01"
        number="01"
        title="Software services"
        accent="for growing teams."
        description="From a new product to a better internal workflow, we bring the right mix of product thinking, design, and engineering."
      />
      <Services />
      <Process />
      <PageCta label="Ready to begin?" />
    </>
  );
}
