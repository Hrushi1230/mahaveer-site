"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photo } from "@/lib/site";
import { Reveal, SectionHeading, cn } from "./ui";

const ids = ["11", "01", "10", "08", "12", "02"];

const facts = [
  "Branded with the Mahaveer Driving Training name and contact number",
  "Clearly marked training vehicle, easy to spot on the road",
  "Real training on the roads of Bhadrak",
];

export default function VehicleShowcase() {
  const [current, setCurrent] = useState(ids[0]);
  const hero = photo(current);

  return (
    <section aria-labelledby="vehicle-title" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="absolute left-1/2 top-1/3 size-[40rem] -translate-x-1/2 rounded-full bg-racing/10 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="vehicle-title"
          eyebrow="Our training vehicle"
          title={
            <>
              Your journey starts <span className="text-racing">behind the wheel.</span>
            </>
          }
          intro="Practice with confidence in our branded Mahaveer training cars — as seen in real photos from our learners and instructors."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 -skew-x-3 border border-racing/50" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal shadow-[0_50px_100px_-30px_rgba(229,57,53,0.35)]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hero.id}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image src={hero.src} alt={hero.alt} fill sizes="(min-width:1024px) 28rem, 90vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(229,57,53,0.3),transparent_60%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
                <p className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-[0.22em]">Mahaveer Training Car</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="headline text-3xl sm:text-4xl">Practice with confidence.</h3>
              <ul className="mt-6 grid gap-3">
                {facts.map((f) => (
                  <li key={f} className="flex gap-3 border-l-2 border-racing bg-white/[0.04] px-4 py-3 text-silver">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-silver">Browse the vehicle</p>
              <div className="mt-3 grid grid-cols-6 gap-2">
                {ids.map((id) => {
                  const ph = photo(id);
                  const on = id === current;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setCurrent(id)}
                      aria-label={`Show photo: ${ph.alt}`}
                      aria-pressed={on}
                      className={cn(
                        "relative aspect-[3/4] overflow-hidden border-2 transition-all duration-300",
                        on ? "border-racing" : "border-transparent opacity-60 hover:opacity-100",
                      )}
                    >
                      <Image src={ph.src} alt="" fill sizes="8rem" className="object-cover" loading="lazy" />
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
