import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const sizes: Record<Size, string> = {
  md: "min-h-11 px-6 py-3 text-sm",
  lg: "min-h-14 px-8 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-white shadow-sm hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-lg",
  secondary:
    "border border-foreground/20 text-foreground hover:-translate-y-0.5 hover:border-gold hover:text-gold-dark hover:shadow-md",
  ghost: "text-foreground/80 hover:text-gold-dark",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
