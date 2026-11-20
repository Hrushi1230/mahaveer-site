import Image from "next/image";
import { Gauge, Route, ShieldCheck } from "lucide-react";
import { photo } from "@/lib/site";
import { Reveal } from "./ui";

const benefits = [
  { icon: Gauge, title: "Practical Driving Experience", text: "Learn by actually driving, with guidance beside you." },
  { icon: Route, title: "Traffic Rules & Road Safety", text: "Understand signs, signals and safe road behaviour." },
  { icon: ShieldCheck, title: "Confidence Behind the Wheel", text: "Build calm, steady confidence step by step." },
];

export default function Intro() {
  const a = photo("02");
  const b = photo("09");
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-white py-20 text-ink sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative ml-auto aspect-[4/5] w-[78%] overflow-hidden bg-ink [clip-path:polygon(0_0,100%_0,100%_100%,10%_100%,0_90%)]">
            <Image src={a.src} alt={a.alt} fill sizes="(min-width:1024px) 28vw, 70vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
          <div className="absolute -bottom-8 left-0 aspect-[4/5] w-[48%] overflow-hidden border-[6px] border-white bg-ink shadow-2xl">
            <Image src={b.src} alt={b.alt} fill sizes="18rem" className="object-cover" loading="lazy" />
          </div>
          <div className="absolute -left-2 top-6 hidden border-l-4 border-racing bg-ink px-5 py-4 text-white shadow-xl sm:block">
            <p className="headline text-2xl">Real training.</p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver">Real roads of Bhadrak</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="red-bar" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-racing">About the school</p>
            </div>
            <h2 id="about-title" className="headline mt-4 text-4xl sm:text-5xl lg:text-6xl">
              More than driving.
              <br />
              We teach <span className="text-racing">responsible</span> driving.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Learning to drive is not just about controlling a vehicle. It&apos;s about understanding the road,
              respecting traffic rules, making the right decisions, and protecting yourself and others.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Mahaveer Driving Training School helps beginners and existing drivers learn safe, confident, responsible
              driving through practical training, theoretical education, traffic-rule awareness, road-safety knowledge
              and personalized guidance.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-4">
            {benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={0.1 * i}>
                <div className="group flex items-start gap-4 border border-ink/10 bg-mist p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-racing/40 hover:bg-white hover:shadow-lg">
                  <span className="grid size-12 shrink-0 place-items-center bg-ink text-white transition-colors group-hover:bg-racing">
                    <b.icon className="size-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <div>
                    <h3 className="headline text-xl not-italic sm:text-2xl">{b.title}</h3>
                    <p className="mt-1 text-slate-600">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
