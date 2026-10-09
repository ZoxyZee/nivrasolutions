import { Link } from "react-router";
import Reveal from "../components/Reveal";
import ProjectVisual from "../components/ProjectVisual";
import PageCta from "../components/PageCta";
import Hero from "../sections/Hero";
import BlogPreview from "../sections/BlogPreview";
import { projects, services } from "../data/siteContent";

const featuredProjects = projects.filter((project) => project.featured);

export default function HomePage({ initialPosts = [] }) {
  return (
    <>
      <Hero />
      <section className="home-services wrap" id="services">
        <Reveal className="home-split-head">
          <span className="kicker">01 / Capabilities</span>
          <h2>Software expertise for the way your business operates.</h2>
        </Reveal>
        <div className="home-service-grid">
          {services.map(({ title, description }, index) => (
            <Reveal as="article" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </Reveal>
          ))}
        </div>
        <Link className="text-link" to="/services/">
          Explore services <span>↗</span>
        </Link>
      </section>

      <section className="work home-work" id="work">
        <div className="wrap">
          <Reveal className="home-split-head">
            <span className="kicker">02 / Selected work</span>
            <h2>Software built for real operations.</h2>
          </Reveal>
          <p className="home-work-context">
            Two deployed systems shown with actual product screenshots. Private
            details in the hospital image have been obscured.
          </p>
          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <Reveal
                as="article"
                className={`project ${project.type}`}
                key={project.title}
              >
                <div className="project-card">
                  <span className="project-card-label">
                    N/S PROJECT / 0{index + 1}
                  </span>
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
              </Reveal>
            ))}
          </div>
          <Link className="text-link light" to="/work/">
            View all work <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="home-about wrap">
        <Reveal>
          <span className="kicker">03 / The company</span>
          <h2>A focused team for complex work.</h2>
          <p>
            We bring product thinking, useful design, and disciplined
            engineering together to build software people can rely on.
          </p>
          <Link className="text-link" to="/about/">
            Get to know us <span>↗</span>
          </Link>
        </Reveal>
      </section>
      <BlogPreview initialPosts={initialPosts} />
      <PageCta />
    </>
  );
}
