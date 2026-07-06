type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
