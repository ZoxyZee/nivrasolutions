import { Link } from "react-router";
import Reveal from "./Reveal";

export default function PageCta({ label = "Have something in mind?" }) {
  return (
    <section className="page-cta">
      <Reveal className="wrap">
        <span>{label}</span>
        <h2>Let's discuss your next software project.</h2>
        <Link to="/contact/">
          Start a conversation <b aria-hidden="true">↗</b>
        </Link>
      </Reveal>
    </section>
  );
}
