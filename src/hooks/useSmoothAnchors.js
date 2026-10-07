import { useEffect } from "react";

const easeInOutCubic = (progress) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export default function useSmoothAnchors() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const stopAnimation = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const onKeyDown = (event) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      ) {
        stopAnimation();
      }
    };

    const onAnchorClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      const target = hash && document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      stopAnimation();

      const headerHeight =
        document.querySelector(".site-header")?.offsetHeight ?? 0;
      const destination =
        hash === "#top"
          ? 0
          : Math.max(
              0,
              target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                18,
            );

      history.pushState(null, "", hash);

      const finish = () => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };

      if (reducedMotion.matches) {
        window.scrollTo({ top: destination, behavior: "instant" });
        finish();
        return;
      }

      const start = window.scrollY;
      const distance = destination - start;
      const duration = Math.min(1050, Math.max(480, Math.abs(distance) * 0.45));
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        window.scrollTo({
          top: start + distance * easeInOutCubic(progress),
          behavior: "instant",
        });

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          frameId = 0;
          finish();
        }
      };

      frameId = requestAnimationFrame(tick);
    };

    document.addEventListener("click", onAnchorClick);
    window.addEventListener("wheel", stopAnimation, { passive: true });
    window.addEventListener("touchstart", stopAnimation, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      stopAnimation();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("wheel", stopAnimation);
      window.removeEventListener("touchstart", stopAnimation);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}
