"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "./ui";

const steps = [
  { n: "01", title: "Understanding the Vehicle", text: "Learn the basic controls, components, and functions." },
  { n: "02", title: "Basic Driving Skills", text: "Learn starting, stopping, steering, braking, and control." },
  { n: "03", title: "Practical Training", text: "Practice driving with proper guidance." },
  { n: "04", title: "Road & Traffic Awareness", text: "Understand signals, traffic rules, and safe driving behavior." },
  { n: "05", title: "Improve Confidence", text: "Build your driving skills through continuous practice." },
  { n: "06", title: "Become a Responsible Driver", text: "Develop safe driving habits for everyday life." },
];

export default function LearningJourney() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section aria-labelledby="journey-title" className="relative overflow-hidden bg-charcoal py-20 text-white sm:py-28">
      <div className="absolute -left-40 top-1/3 size-[32rem] rounded-full bg-racing/10 blur-[120px]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          id="journey-title"
          align="center"
          eyebrow="Learn the right way"
          title={
            <>
              Six steps. One <span className="text-racing">confident</span> driver.
            </>
          }
          intro="A clear path from first-time learner to responsible driver — follow the road."
        />

        <ol ref={ref} className="relative mt-16 grid gap-10 sm:gap-14">
          {/* The road */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[1.35rem] top-0 w-2 bg-[#0b0d10] md:left-1/2 md:-translate-x-1/2"
          >
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.35)_0_10px,transparent_10px_22px)]" />
            <motion.div
              style={{ scaleY: reduce ? 1 : progress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-racing to-[#ff7a6b] shadow-[0_0_18px_rgba(229,57,53,0.8)]"
            />
          </div>

          {steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <li key={s.n} className="relative pl-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 grid size-11 place-items-center rounded-full border-2 border-racing bg-ink text-sm font-extrabold text-white shadow-[0_0_0_6px_#151922] md:left-1/2 md:-translate-x-1/2"
                >
                  {s.n}
                </span>
                <Reveal
                  y={right ? 28 : 28}
                  className={`border border-white/10 bg-ink/70 p-6 backdrop-blur transition-colors hover:border-racing/60 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-racing">Step {s.n}</p>
                  <h3 className="headline mt-2 text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="mt-2 text-silver">{s.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
