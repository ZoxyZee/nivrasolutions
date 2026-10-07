import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { processSteps } from "../data/siteContent";

export default function Process() {
  return (
    <section className="process">
      <div className="wrap">
        <SectionHeading number="02" label="How it works">
          A straightforward process from discovery to delivery.
        </SectionHeading>
        <div className="steps">
          {processSteps.map(({ title, description }, index) => (
            <Reveal as="article" className="step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
