"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE, photo } from "@/lib/site";
import { Button, Reveal, SectionHeading } from "./ui";
import { FacebookIcon, InstagramIcon } from "./icons";

const ids = ["06", "07", "04", "08", "10", "12", "02"];

/**
 * Real learner photos only. No names, ratings or quotes are invented —
 * add written testimonials here once the school has them with consent.
 */
export default function Testimonials() {
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * Math.min(360, rail.current.clientWidth * 0.8), behavior: "smooth" });

  return (
    <section aria-labelledby="learners-title" className="bg-mist py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="learners-title"
            tone="light"
            eyebrow="Our learners. Our pride."
            title={
              <>
                Real learners. <span className="text-racing">Real experiences.</span>
              </>
            }
            intro="The faces behind every successful driving journey — real students who trained with us in Bhadrak."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous learners"
              className="grid size-12 place-items-center border border-ink/20 transition-colors hover:border-racing hover:bg-racing hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next learners"
              className="grid size-12 place-items-center border border-ink/20 transition-colors hover:border-racing hover:bg-racing hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <ul
          ref={rail}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:px-0"
          aria-label="Learner photos"
        >
          {ids.map((id, i) => {
            const p = photo(id);
            return (
              <li key={id} className="w-[74%] shrink-0 snap-start sm:w-[44%] md:w-[32%] lg:w-[23.5%]">
                <Reveal delay={i * 0.05}>
                  <figure className="group relative aspect-[3/4] overflow-hidden bg-ink">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width:1024px) 22vw, 70vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-racing transition-transform duration-500 group-hover:scale-x-100" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="headline text-xl">Mahaveer Learner</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-silver">Bhadrak, Odisha</p>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 border-l-4 border-racing bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-slate-700">
            See more learner moments and driving tips on our social pages.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={SITE.instagram} external variant="ghost-dark" icon={<InstagramIcon className="size-4" />}>
              Instagram
            </Button>
            <Button href={SITE.facebook} external variant="ghost-dark" icon={<FacebookIcon className="size-4" />}>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
