import Reveal from "../components/Reveal";
import { teamMembers } from "../data/siteContent";
import { Link } from "react-router";

function linkedinHref(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      /(^|\.)linkedin\.com$/i.test(url.hostname)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export default function Team() {
  const visibleMembers = teamMembers.filter((member) => member.name.trim());
  if (!visibleMembers.length) return null;

  return (
    <section className="team" aria-labelledby="team-title">
      <div className="wrap">
        <Reveal className="team-heading">
          <span className="kicker">The people / NivraSolutions</span>
          <div>
            <h2 id="team-title">Meet the team behind NivraSolutions.</h2>
            <p>
              The people you can speak with about your next software project.
            </p>
          </div>
        </Reveal>

        <div className="team-grid">
          {visibleMembers.map((member, index) => {
            const number = String(index + 1).padStart(2, "0");
            const linkedin = linkedinHref(member.linkedin);

            return (
              <Reveal as="article" className="team-card" key={number}>
                <div className="team-card-body">
                  <span className="team-card-label">
                    NivraSolutions / {number}
                  </span>
                  <span className="team-card-monogram" aria-hidden="true">
                    {member.name.charAt(0)}
                  </span>
                  <h3>{member.name}</h3>
                  {member.role && <p>{member.role}</p>}
                  {linkedin && (
                    <div className="team-card-links">
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
        <Link className="team-contact-link" to="/contact/">
          Contact the team <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
