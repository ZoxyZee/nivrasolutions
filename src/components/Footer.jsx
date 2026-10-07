import { Link } from "react-router";
import { contactEmail } from "../data/siteContent";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <Link className="footer-brand" to="/">
            NivraSolutions
          </Link>
          <p>Software solutions built with purpose</p>
        </div>
        <div className="footer-navigation">
          <Link to="/">Home</Link>
          <Link to="/services/">Services</Link>
          <Link to="/work/">Work</Link>
          <Link to="/about/">About</Link>
          <a href="/blog/">Blog</a>
          <Link to="/contact/">Contact</Link>
        </div>
        <div className="footer-end">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <span>© {new Date().getFullYear()} NivraSolutions</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
