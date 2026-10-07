import Reveal from "../components/Reveal";
import { contactEmail, contactPeople } from "../data/siteContent";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <Reveal className="wrap">
        <small>Tell us what you're working on</small>
        <h1>Let's discuss your project.</h1>
        <a className="contact-link" href={`mailto:${contactEmail}`}>
          {contactEmail} <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
      <div
        className="contact-people wrap"
        aria-labelledby="contact-people-title"
      >
        <div className="contact-people-heading">
          <span className="kicker">Direct contacts</span>
          <h2 id="contact-people-title">Prefer to speak with someone?</h2>
        </div>
        <div className="contact-people-grid">
          {contactPeople.map(({ name, phone }) => (
            <div className="contact-person" key={name}>
              <h3>{name}</h3>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                aria-label={`Call ${name} at ${phone}`}
              >
                {phone} <span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="contact-details wrap">
        <div>
          <span>What to send</span>
          <p>
            The problem you're solving, who will use the software, your
            timeline, and any existing systems we should know about.
          </p>
        </div>
        <div>
          <span>Where we work</span>
          <p>Based in India. Collaborating with people and teams everywhere.</p>
        </div>
        <div>
          <span>Next step</span>
          <p>
            Send an email and we'll discuss scope, priorities, and next steps.
          </p>
        </div>
      </div>
    </section>
  );
}
