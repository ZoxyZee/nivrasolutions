export default function Reveal({
  children,
  className = "",
  as: Element = "div",
}) {
  return <Element className={`reveal ${className}`.trim()}>{children}</Element>;
}
