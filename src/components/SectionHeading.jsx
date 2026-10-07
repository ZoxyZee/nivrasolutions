import Reveal from "./Reveal";

export default function SectionHeading({ number, label, children }) {
  return (
    <Reveal className="heading">
      <div className="kicker">
        {number} / {label}
      </div>
      <h2>{children}</h2>
    </Reveal>
  );
}
