(() => {
  const motionAllowed = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  if (!motionAllowed.matches) return;

  const follower = document.createElement("div");
  follower.className = "cursor-follow";
  follower.setAttribute("aria-hidden", "true");
  document.body.append(follower);

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let visible = false;

  const animate = () => {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    if (Math.abs(targetX - x) > 0.2 || Math.abs(targetY - y) > 0.2) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
    }
  };

  const hide = () => {
    follower.classList.remove("is-visible", "is-interactive");
    visible = false;
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" || !motionAllowed.matches) return;

      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        visible = true;
        follower.classList.add("is-visible");
      }

      const interactive = event.target.closest?.(
        "a, button, input, select, textarea, summary, [role='button']",
      );
      follower.classList.toggle("is-interactive", Boolean(interactive));
      if (!frame) frame = requestAnimationFrame(animate);
    },
    { passive: true },
  );

  document.documentElement.addEventListener("pointerleave", hide);
  window.addEventListener("blur", hide);
  motionAllowed.addEventListener("change", () => {
    if (!motionAllowed.matches) hide();
  });
})();
