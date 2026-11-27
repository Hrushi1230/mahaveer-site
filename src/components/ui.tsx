"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** Scroll-triggered fade/slide-in. `delay` lets siblings stagger. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** `dark` = text for dark backgrounds, `light` = text for light backgrounds */
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <div className={cn("flex items-center gap-3", center && "justify-center")}>
        <span className="red-bar" />
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-racing">{eyebrow}</p>
      </div>
      <h2
        id={id}
        className={cn(
          "headline mt-4 text-4xl sm:text-5xl lg:text-6xl",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-silver" : "text-slate-600",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost-dark";
  external?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
};

/** All CTA links are real anchors (tel:, wa.me, #section) so they always work. */
export function Button({ href, children, variant = "primary", external, className, onClick, icon }: BtnProps) {
  const styles = {
    primary:
      "bg-racing text-white hover:bg-racing-dark shadow-[0_10px_30px_-10px_rgba(229,57,53,0.8)]",
    outline: "border border-white/30 text-white hover:border-white hover:bg-white/10",
    light: "bg-white text-ink hover:bg-mist",
    "ghost-dark": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  }[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 px-5 py-3 text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 [clip-path:polygon(10px_0,100%_0,calc(100%-10px)_100%,0_100%)] active:scale-[0.98] sm:px-8 sm:text-sm sm:tracking-[0.12em]",
        styles,
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </a>
  );
}
