"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { LOGO, NAV_LINKS, SITE, telLink } from "@/lib/site";
import { Button, cn } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label={`${SITE.name} — home`}>
          <Image
            src={LOGO.src}
            alt="Mahaveer Driving Training logo"
            width={48}
            height={48}
            priority
            className="size-11 rounded-full border border-white/20 object-cover"
          />
          <span className="leading-none">
            <span className="headline block text-xl text-white">Mahaveer</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-silver">
              Driving Training
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative whitespace-nowrap py-2 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors",
                  active === l.href ? "text-white" : "text-silver hover:text-white",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-racing transition-transform duration-300",
                    active === l.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={telLink(SITE.phones[0].raw)}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-racing 2xl:flex"
          >
            <Phone className="size-4 text-racing" aria-hidden />
            {SITE.phones[0].display}
          </a>
          <div className="hidden lg:block">
            <Button href="#contact" className="!min-h-10 whitespace-nowrap !px-5">
              Join Driving Training
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center border border-white/20 text-white xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto bg-ink xl:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col px-5 pb-28 pt-4">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="headline flex items-center justify-between border-b border-white/10 py-4 text-3xl text-white"
                  >
                    {l.label}
                    <span className="text-sm not-italic text-racing">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="mt-8 grid gap-3">
                <Button href="#contact" onClick={() => setOpen(false)}>
                  Join Driving Training
                </Button>
                <Button href={telLink(SITE.phones[0].raw)} variant="outline">
                  Call {SITE.phones[0].display}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
