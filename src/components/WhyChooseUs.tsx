import { BookOpenCheck, Car, ClipboardList, HeartHandshake, Smile, TrafficCone, UserCheck, Gauge } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const items = [
  { icon: UserCheck, title: "Experienced Guidance", text: "Learn with an instructor who stays with you through every exercise." },
  { icon: Car, title: "Practical Learning", text: "Time behind the wheel is the heart of every programme." },
  { icon: BookOpenCheck, title: "Theory + Practical Training", text: "Understand the why, then practise the how." },
  { icon: ClipboardList, title: "Traffic Rules Education", text: "Signs, signals and markings explained clearly." },
  { icon: Smile, title: "Beginner-Friendly Environment", text: "No pressure, no judgement — start at your own pace." },
  { icon: HeartHandshake, title: "Personalized Attention", text: "Guidance shaped around what you need to improve." },
  { icon: TrafficCone, title: "Road Safety Focus", text: "Safe habits for yourself, passengers and other road users." },
  { icon: Gauge, title: "Confidence Building", text: "Steady practice that turns nervousness into calm control." },
];

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-mist py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="why-title"
          tone="light"
          eyebrow="Why choose Mahaveer?"
          title={
            <>
              Your safety is our <span className="text-racing">priority.</span>
            </>
          }
          intro="Everything we teach is built around one goal: helping you drive safely and confidently for life."
        />
        <ul className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={(i % 4) * 0.08} className="bg-white">
              <div className="group relative h-full p-7 transition-colors duration-300 hover:bg-ink">
                <it.icon
                  className="size-10 text-ink transition-all duration-300 group-hover:-translate-y-1 group-hover:text-racing"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="headline mt-6 text-2xl transition-colors group-hover:text-white">{it.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600 transition-colors group-hover:text-silver">
                  {it.text}
                </p>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-racing transition-all duration-500 group-hover:w-full" aria-hidden />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
