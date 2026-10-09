import { useState } from "react";
import { Link } from "react-router";
import ProjectVisual from "../components/ProjectVisual";
import { projects } from "../data/siteContent";

const featuredProjects = projects.filter((project) => project.featured);

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex];
  const heroScreenshot = activeProject.screenshot;
  const showProject = (direction) => {
    setActiveIndex(
      (index) =>
        (index + direction + featuredProjects.length) % featuredProjects.length,
    );
  };

  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="hero-inner wrap">
        <div className="hero-content">
          <span className="eyebrow">NivraSolutions / Software engineering</span>
          <h1 id="home-title">
            Software built around <span>your business.</span>
          </h1>
          <p>
            We design and build custom web applications, internal platforms, and
            integrations that simplify operations and support growth.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" to="/contact/">
              Discuss your project <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button-secondary" to="/services/">
              Explore services
            </Link>
          </div>
          <div className="hero-capabilities" aria-label="Core capabilities">
            <span>Custom software</span>
            <span>Web applications</span>
            <span>Automation</span>
          </div>
        </div>
        <div className={`hero-visual hero-visual--${activeProject.type}`}>
          <div className="hero-visual-top">
            <span>Selected project / Actual product UI</span>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(featuredProjects.length).padStart(2, "0")}
            </span>
          </div>
          <div
            className="hero-visual-stage"
            id="hero-concept-stage"
            key={activeProject.type}
          >
            <ProjectVisual
              type={activeProject.type}
              screenshot={heroScreenshot}
              loading={heroScreenshot ? "eager" : "lazy"}
            />
          </div>
          <div className="hero-visual-bottom">
            <div className="hero-visual-caption" aria-live="polite">
              <strong>{activeProject.title}</strong>
              <span>{activeProject.category}</span>
            </div>
            <div
              className="hero-visual-controls"
              role="group"
              aria-label="Browse featured projects"
            >
              <button
                type="button"
                aria-label="Previous project"
                aria-controls="hero-concept-stage"
                onClick={() => showProject(-1)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                aria-controls="hero-concept-stage"
                onClick={() => showProject(1)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
