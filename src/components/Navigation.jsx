import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services/" },
  { label: "Work", to: "/work/" },
  { label: "About", to: "/about/" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const progressRef = useRef(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { pathname } = useLocation();
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (to) => {
    closeMenu();
    if (to === "/" && pathname === "/") {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }
  };

  useEffect(() => {
    closeMenu();
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
      headerRef.current?.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <header className="site-header" ref={headerRef}>
        <nav className="nav wrap" aria-label="Main navigation">
          <Link
            className="brand"
            to="/"
            onClick={() => handleNavClick("/")}
            aria-label="NivraSolutions home"
          >
            <img
              className="brand-mark"
              src="/brand-mark.svg"
              alt=""
              width="28"
              height="28"
            />
            NivraSolutions
          </Link>

          <button
            className="menu"
            ref={menuRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="nav-links"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>

          <div className={`nav-links ${isOpen ? "open" : ""}`} id="nav-links">
            {links.map(({ label, to }) => (
              <NavLink
                to={to}
                key={to}
                end={to === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => handleNavClick(to)}
              >
                {label}
              </NavLink>
            ))}
            <a href="/blog/" onClick={closeMenu}>
              Blog
            </a>
            <NavLink className="pill" to="/contact/" onClick={closeMenu}>
              Start a project ↗
            </NavLink>
          </div>
        </nav>
        <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </header>
    </>
  );
}
