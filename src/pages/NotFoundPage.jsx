import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="not-found wrap">
      <span className="kicker">404 / Wrong turn</span>
      <h1>
        This page took a <em>different path.</em>
      </h1>
      <Link className="text-link" to="/">
        Back to home <span>↗</span>
      </Link>
    </section>
  );
}
