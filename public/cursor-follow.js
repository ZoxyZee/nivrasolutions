(() => {
  const motionAllowed = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  if (!motionAllowed.matches) return;

  const follower = document.createElement("div");
  const point = document.createElement("div");
  follower.className = "cursor-follow";
  point.className = "cursor-point";
  follower.setAttribute("aria-hidden", "true");
  point.setAttribute("aria-hidden", "true");
  document.body.append(follower, point);

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let visible = false;

  const animate = () => {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    if (Math.abs(targetX - x) > 0.2 || Math.abs(targetY - y) > 0.2) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
    }
  };

  const hide = () => {
    follower.classList.remove("is-visible", "is-interactive", "is-pressed");
    point.classList.remove("is-visible");
    visible = false;
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" || !motionAllowed.matches) return;

      targetX = event.clientX;
      targetY = event.clientY;
      point.style.transform = `translate3d(${targetX + 10}px, ${targetY + 10}px, 0)`;

      if (!visible) {
        x = targetX;
        y = targetY;
        visible = true;
        follower.classList.add("is-visible");
        point.classList.add("is-visible");
      }

      const target = event.target;
      const interactive = target.closest?.(
        "a, button, summary, [role='button']",
      );
      const textField = target.closest?.(
        "input:not([type='button']):not([type='submit']), textarea, select, [contenteditable='true']",
      );
      const onDark = target.closest?.(
        ".hero, .site-header, .site-footer, .page-cta, .blog-header, .blog-footer",
      );

      follower.classList.toggle("is-interactive", Boolean(interactive));
      follower.classList.toggle("is-text", Boolean(textField));
      point.classList.toggle("is-text", Boolean(textField));
      follower.classList.toggle("is-on-dark", Boolean(onDark));
      point.classList.toggle("is-on-dark", Boolean(onDark));

      if (!frame) frame = requestAnimationFrame(animate);
    },
    { passive: true },
  );

  document.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") follower.classList.add("is-pressed");
  });
  document.addEventListener("pointerup", () => {
    follower.classList.remove("is-pressed");
  });
  document.documentElement.addEventListener("pointerleave", hide);
  window.addEventListener("blur", hide);
  motionAllowed.addEventListener("change", () => {
    if (!motionAllowed.matches) hide();
  });
})();
