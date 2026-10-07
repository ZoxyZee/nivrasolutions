import Reveal from "./Reveal";

export default function PageIntro({
  eyebrow,
  number,
  title,
  accent,
  description,
}) {
  return (
    <section className="page-intro wrap">
      <Reveal>
        <div className="eyebrow">{eyebrow || `Page / ${number}`}</div>
        <h1>
          {title} <span>{accent}</span>
        </h1>
        <p>{description}</p>
      </Reveal>
      <div className="page-intro-line" />
    </section>
  );
}
