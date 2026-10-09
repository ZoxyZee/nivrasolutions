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
          HMS, ATS, and AttendX show product screenshots. Private operational
          data in the HMS visual is hidden; other previews are illustrative.
        </p>
        <div className="project-grid">
          {projects.map((project) => (
            <Reveal
              as="article"
              className={`project ${project.type}`}
              key={project.title}
            >
              <div className="project-card">
                <ProjectVisual
                  type={project.type}
                  screenshot={project.screenshot}
                />
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
                {project.gallery?.map((image) => (
                  <figure
                    className={`project-detail-image${image.portrait ? " project-detail-image--portrait" : ""}`}
                    key={image.src}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                ))}
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
