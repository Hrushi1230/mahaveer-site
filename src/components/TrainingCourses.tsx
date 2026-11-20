import { Check, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const courses = [
  {
    n: "01",
    title: "Beginner Driving Course",
    desc: "For people learning driving from scratch.",
    points: ["Basic vehicle controls", "Steering techniques", "Accelerator and braking control", "Clutch and gear operation", "Starting and stopping", "Basic road driving"],
  },
  {
    n: "02",
    title: "Practical Road Training",
    desc: "Hands-on experience in real driving conditions.",
    points: ["Road practice", "Lane discipline", "Turning and U-turns", "Parking techniques", "Traffic awareness", "Practical confidence"],
  },
  {
    n: "03",
    title: "Traffic Rules & Theory",
    desc: "Understand the rules before driving on the road.",
    points: ["Traffic signs", "Signals", "Road markings", "Safety regulations", "Driving etiquette", "Basic road knowledge"],
  },
  {
    n: "04",
    title: "Parking & Vehicle Control",
    desc: "Learn vehicle positioning and control.",
    points: ["Reverse parking", "Parallel parking", "Tight-space handling", "Vehicle judgement", "Steering control"],
  },
  {
    n: "05",
    title: "Confidence Improvement Course",
    desc: "For learners who already know the basics but need more confidence.",
    points: ["Traffic handling", "Road awareness", "Smooth driving", "Independent driving confidence"],
  },
  {
    n: "06",
    title: "Driving Licence Guidance",
    desc: "Guidance on the driving licence process and the steps involved.",
    points: ["Understanding the required steps", "Help knowing what to prepare", "Follows official procedures"],
    note: "Licences are issued only by the transport authority. We guide — we do not guarantee outcomes.",
  },
];

export default function TrainingCourses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="courses-title"
          eyebrow="Our training programs"
          title={
            <>
              Six ways to <span className="text-racing">master</span> the road.
            </>
          }
          intro="Choose the programme that matches where you are today — from your very first time behind the wheel to building everyday confidence."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <Reveal as="li" key={c.n} delay={(i % 3) * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-gradient-to-b from-charcoal to-ink p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-racing/60">
                <span
                  aria-hidden
                  className="headline absolute -right-2 -top-4 text-[7rem] leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-racing/15"
                >
                  {c.n}
                </span>
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-racing transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-sm font-bold tracking-[0.2em] text-racing">{c.n}</p>
                <h3 className="headline mt-3 text-3xl">{c.title}</h3>
                <p className="mt-3 text-silver">{c.desc}</p>
                <ul className="mt-6 grid gap-2.5 border-t border-white/10 pt-6">
                  {c.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[15px] text-white/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-racing" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                {c.note && <p className="mt-5 border-l-2 border-racing pl-3 text-xs leading-relaxed text-silver">{c.note}</p>}
                <a
                  href={`#contact`}
                  data-course={c.title}
                  className="mt-auto flex items-center justify-between pt-8 text-sm font-bold uppercase tracking-[0.15em] text-white transition-colors hover:text-racing"
                >
                  Enquire about this
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
