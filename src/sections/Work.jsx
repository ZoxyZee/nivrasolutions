import ProjectVisual from "../components/ProjectVisual";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/siteContent";

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <SectionHeading number="02" label="Project portfolio">
          Systems built for the work behind the scenes.
        </SectionHeading>
        <p className="work-disclaimer">
          Project visuals are illustrative. Delivery status is shown with each
          project.
        </p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal
              as="article"
              className={`project ${project.type}`}
              key={project.title}
            >
              <div className="project-card">
                <span className="project-card-label">
                  N/S PROJECT / 0{index + 1}
                </span>
                <ProjectVisual type={project.type} />
              </div>
              <div className="project-meta">
                <h3>{project.title}</h3>
                <span>
                  {project.status} · {project.category}
                </span>
              </div>
              <details className="project-brief">
                <summary>
                  Project details <span aria-hidden="true">+</span>
                </summary>
                <p>{project.brief}</p>
                {project.highlights.length > 0 && (
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {project.stack.length > 0 && (
                  <div className="project-stack" aria-label="Technology stack">
                    {project.stack.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                )}
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
