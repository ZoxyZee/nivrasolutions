import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { services } from "../data/siteContent";

export default function Services() {
  return (
    <section className="services wrap" id="services">
      <SectionHeading number="01" label="What we do">
        Capabilities that support your next stage of growth.
      </SectionHeading>
      <div className="service-list">
        {services.map(({ title, description }, index) => (
          <Reveal as="article" className="service" key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <b aria-hidden="true">↗</b>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
