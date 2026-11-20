"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionHeading, cn } from "./ui";

export const FAQS = [
  {
    q: "Is driving training available for complete beginners?",
    a: "Yes. Our Beginner Driving Course is designed for people learning to drive from scratch — starting with basic vehicle controls, steering, braking, clutch and gear operation.",
  },
  {
    q: "Do you provide practical driving training?",
    a: "Yes. Practical road training is a core part of our programmes, including road practice, lane discipline, turning, parking and building real traffic awareness.",
  },
  {
    q: "Do you teach traffic rules and road signs?",
    a: "Yes. Our Traffic Rules & Theory training covers traffic signs, signals, road markings, safety regulations and driving etiquette.",
  },
  {
    q: "Can someone who already knows driving improve their skills?",
    a: "Absolutely. Our Confidence Improvement Course is for learners who know the basics but want smoother driving, better road awareness and more independent confidence.",
  },
  {
    q: "How can I enquire about admission?",
    a: "Use the enquiry form on this page to send your details on WhatsApp, tap the WhatsApp button, or call us directly. We will guide you on the next steps.",
  },
  {
    q: "How can I contact Mahaveer Driving Training School?",
    a: `You can call ${SITE.phones[0].display} or ${SITE.phones[1].display}, message us on WhatsApp, or reach us on Instagram and Facebook. We are located in Bhadrak, Odisha.`,
  },
  {
    q: "Do you provide driving licence guidance?",
    a: "We offer guidance on the driving licence process and the steps involved. Licences are issued only by the official transport authority following its procedures, so we cannot guarantee any licence outcome.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-20 text-ink sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            id="faq-title"
            tone="light"
            eyebrow="FAQ"
            title={
              <>
                Questions? <span className="text-racing">Answered.</span>
              </>
            }
            intro="Quick answers about our training. For anything else, just call or message us."
          />
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={cn("text-lg font-bold transition-colors sm:text-xl", on && "text-racing")}>{f.q}</span>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center border transition-all duration-300",
                        on ? "rotate-45 border-racing bg-racing text-white" : "border-ink/20",
                      )}
                    >
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 leading-relaxed text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
