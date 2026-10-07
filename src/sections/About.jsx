import Reveal from "../components/Reveal";
import { values } from "../data/siteContent";

export default function About() {
  return (
    <section className="about wrap" id="about">
      <div className="about-grid">
        <Reveal className="about-card">
          <span>NivraSolutions / Our approach</span>
          <b>Clarity before complexity.</b>
          <p>
            We focus on the workflow, the people using it, and the outcomes the
            software needs to deliver.
          </p>
        </Reveal>
        <Reveal className="about-copy">
          <div className="kicker">03 / About NivraSolutions</div>
          <h2>We start with the problem, then build the right solution.</h2>
          <p>
            NivraSolutions is a software solutions company working across
            product strategy, interface design, development, and integration. We
            start with the business problem, keep users in view, and make
            technical decisions that serve the long term.
          </p>
          <div className="values">
            {values.map(({ title, description }) => (
              <div key={title}>
                <b>{title}</b>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
