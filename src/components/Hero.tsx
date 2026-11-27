"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { LOGO, SITE, photo, telLink } from "@/lib/site";
import { Button } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

function RoadBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_30%,rgba(229,57,53,0.20),transparent_65%),radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(191,197,204,0.07),transparent_60%)]" />
      <div className="bg-grid-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_65%)]" />

      {/* perspective road */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] overflow-hidden [perspective:420px] sm:h-[52%]">
        <div className="absolute inset-x-[-60%] top-0 h-[230%] origin-top [transform:rotateX(68deg)]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1218] to-[#1a1e27]" />
          <div className="road-flow absolute left-1/2 top-0 h-full w-2.5 -translate-x-1/2 [background:repeating-linear-gradient(to_bottom,#e53935_0_70px,transparent_70px_140px)]" />
          <div className="absolute left-[32%] top-0 h-full w-1.5 bg-white/40" />
          <div className="absolute right-[32%] top-0 h-full w-1.5 bg-white/40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const main = photo("08");
  const second = photo("12");
  const line = (delay: number) => ({
    initial: reduce ? false : { y: "110%" },
    animate: { y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink">
      <RoadBackdrop />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pb-28 pt-28 sm:pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:px-8 lg:pb-24">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 border border-racing/50 bg-racing/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              <ShieldCheck className="size-4 text-racing" aria-hidden />
              Professional Driving Training
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-silver">
              <MapPin className="size-4 text-racing" aria-hidden />
              {SITE.locality}, {SITE.region}
            </span>
          </motion.div>

          <h1
            id="hero-title"
            className="headline mt-7 text-[clamp(2.9rem,9.2vw,6.6rem)] text-white"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" {...line(0.1)}>
                Learn to drive.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" {...line(0.25)}>
                Drive with{" "}
                <span className="bg-gradient-to-r from-racing to-[#ff7a6b] bg-clip-text text-transparent">
                  confidence.
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-7 h-1 w-28 origin-left -skew-x-[25deg] bg-racing"
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-silver sm:text-lg"
          >
            Start your driving journey with professional training, practical experience, road safety
            knowledge, and personalized guidance from Mahaveer Driving Training School, Bhadrak.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#contact">Start your training</Button>
            <Button
              href={telLink(SITE.phones[0].raw)}
              variant="outline"
              icon={<Phone className="size-4" aria-hidden />}
            >
              Call us now
            </Button>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-silver/80"
          >
            {SITE.tagline}
          </motion.p>
        </div>

        {/* Real photo composition */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-[78%] sm:w-[72%] lg:w-[74%]">
            <div className="absolute -right-4 -top-4 size-full border border-racing/70 [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%)]" aria-hidden />
            <div className="relative size-full overflow-hidden bg-charcoal shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%,0_88%)]">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                priority
                sizes="(min-width:1024px) 30vw, 70vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
              <p className="absolute right-4 top-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                <span className="mr-2 inline-block size-2 rounded-full bg-racing pulse-ring" />
                Our training car · Bhadrak
              </p>
            </div>

            <div className="float-y absolute -bottom-8 -left-6 w-[44%] overflow-hidden border-4 border-ink shadow-2xl sm:-left-12">
              <Image
                src={second.src}
                alt={second.alt}
                width={second.width}
                height={second.height}
                sizes="14rem"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="absolute -right-3 bottom-10 grid size-24 place-items-center rounded-full border border-white/20 bg-ink/80 p-1 shadow-xl backdrop-blur sm:-right-8 sm:size-28">
              <Image
                src={LOGO.src}
                alt="Mahaveer Driving Training emblem"
                width={112}
                height={112}
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-silver md:flex"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <span className="scroll-cue block h-2 w-1 rounded-full bg-racing" />
        </span>
      </a>
    </section>
  );
}
