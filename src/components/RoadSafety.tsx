"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Footprints, Gauge, MoveHorizontal, CornerUpRight, ShieldCheck, Smartphone, Wine, type LucideIcon } from "lucide-react";
import { SIGNS, SIGN_TABS, type SignTab } from "./signs";
import { Reveal, SectionHeading, cn } from "./ui";

const RULES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "Wear your seat belt", text: "Every time, for every passenger — it is your first protection." },
  { icon: Smartphone, title: "No phone while driving", text: "Keep your eyes on the road and your hands on the wheel." },
  { icon: Gauge, title: "Respect speed limits", text: "Adjust your speed to the road, weather and traffic." },
  { icon: Wine, title: "Never drink and drive", text: "Alcohol and driving never mix. Hand over the keys." },
  { icon: MoveHorizontal, title: "Keep a safe distance", text: "Leave enough space to brake smoothly if the vehicle ahead stops." },
  { icon: CornerUpRight, title: "Indicate early", text: "Signal before turning or changing lanes so others can react." },
  { icon: Footprints, title: "Give way to pedestrians", text: "Slow down near crossings, schools and crowded areas." },
  { icon: Eye, title: "Check mirrors often", text: "Know what is around you before you move or turn." },
];

export default function RoadSafety() {
  const [tab, setTab] = useState<SignTab>("Mandatory Signs");
  const [activeId, setActiveId] = useState<Record<string, string>>({});

  const isRules = tab === "Safe Driving Rules";
  const list = isRules ? [] : SIGNS[tab];
  const active = list.find((s) => s.id === activeId[tab]) ?? list[0];

  return (
    <section id="road-safety" aria-labelledby="safety-title" className="relative bg-white py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="safety-title"
          tone="light"
          eyebrow="Traffic signs & road safety"
          title={
            <>
              Know the rules. <span className="text-racing">Respect</span> the road.
            </>
          }
          intro="Tap or hover any sign to see what it means. A small taste of what you learn in our Traffic Rules & Theory training."
        />

        <div
          role="tablist"
          aria-label="Road safety categories"
          className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:px-0"
        >
          {SIGN_TABS.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 border px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-300",
                tab === t ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-racing hover:text-racing",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {isRules ? (
            <motion.ul
              key="rules"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {RULES.map((r) => (
                <li key={r.title} className="group border border-ink/10 bg-mist p-6 transition-all hover:-translate-y-1 hover:border-racing/50 hover:bg-white hover:shadow-lg">
                  <r.icon className="size-9 text-racing" strokeWidth={1.4} aria-hidden />
                  <h3 className="headline mt-4 text-2xl">{r.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{r.text}</p>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]"
            >
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {list.map((s) => {
                  const on = active?.id === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId((m) => ({ ...m, [tab]: s.id }))}
                        onMouseEnter={() => setActiveId((m) => ({ ...m, [tab]: s.id }))}
                        onFocus={() => setActiveId((m) => ({ ...m, [tab]: s.id }))}
                        aria-pressed={on}
                        aria-label={`${s.name} — show meaning`}
                        className={cn(
                          "group flex w-full flex-col items-center gap-3 border bg-mist p-4 text-center transition-all duration-300",
                          on ? "border-racing bg-white shadow-lg" : "border-ink/10 hover:border-ink/40 hover:bg-white",
                        )}
                      >
                        <span className="block size-20 transition-transform duration-300 group-hover:scale-110 sm:size-24">{s.art}</span>
                        <span className="text-[13px] font-bold uppercase leading-tight tracking-wide">{s.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <Reveal className="lg:sticky lg:top-24 lg:self-start">
                <div aria-live="polite" className="relative overflow-hidden bg-ink p-7 text-white">
                  <div className="absolute inset-x-0 top-0 h-1 bg-racing" />
                  {active && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="mx-auto size-36 sm:size-40">{active.art}</div>
                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-racing">{tab}</p>
                        <h3 className="headline mt-1 text-3xl">{active.name}</h3>
                        <p className="mt-3 leading-relaxed text-silver">{active.meaning}</p>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-8 max-w-3xl text-sm text-slate-500">
          These are simplified learning aids. Always refer to the official traffic rules and RTO guidance for the
          complete and current rules.
        </p>
      </div>
    </section>
  );
}
