import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import useSmoothAnchors from "./hooks/useSmoothAnchors";
import seoConfig from "../seo.config.json";

const pagesByPath = Object.fromEntries(
  seoConfig.pages.map((page) => [page.path, page]),
);

function setMeta(selector, key, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [, attribute, name] = selector.match(
      /^meta\[(name|property)="([^"]+)"\]$/,
    );
    element.setAttribute(attribute, name);
    document.head.append(element);
  }
  element.setAttribute(key, value);
}

export default function App({ initialPosts = [] }) {
  const { pathname, hash } = useLocation();
  useSmoothAnchors();

  useEffect(() => {
    const page = pagesByPath[pathname];
    document.title = page?.title ?? "Page not found — NivraSolutions";
    if (page) {
      document.head.querySelector('meta[name="robots"]')?.remove();
      const canonical = `${seoConfig.siteUrl.replace(/\/$/, "")}${pathname}`;
      setMeta('meta[name="description"]', "content", page.description);
      setMeta('meta[property="og:title"]', "content", page.title);
      setMeta('meta[property="og:description"]', "content", page.description);
      setMeta('meta[property="og:url"]', "content", canonical);
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.append(link);
      }
      link.href = canonical;
    } else {
      setMeta('meta[name="robots"]', "content", "noindex");
      document.head.querySelector('link[rel="canonical"]')?.remove();
    }
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname, hash]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Navigation />
      <main id="top" tabIndex="-1">
        <Routes>
          <Route path="/" element={<HomePage initialPosts={initialPosts} />} />
          <Route path="/services/" element={<ServicesPage />} />
          <Route path="/work/" element={<WorkPage />} />
          <Route path="/about/" element={<AboutPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
