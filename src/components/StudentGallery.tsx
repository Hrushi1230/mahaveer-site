"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { GALLERY_CATEGORIES, PHOTOS } from "@/lib/site";
import Lightbox from "./Lightbox";
import { SectionHeading, cn } from "./ui";

export default function StudentGallery() {
  const [cat, setCat] = useState<(typeof GALLERY_CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => (cat === "All" ? PHOTOS : PHOTOS.filter((p) => p.categories.includes(cat))),
    [cat],
  );

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-charcoal py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          id="gallery-title"
          eyebrow="Photo gallery"
          title={
            <>
              Moments from the <span className="text-racing">road.</span>
            </>
          }
          intro="Authentic photographs from our training sessions, learners and instructors in Bhadrak. Tap any photo to view it larger."
        />

        <div role="group" aria-label="Filter photos" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
          {GALLERY_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 border px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-300",
                cat === c ? "border-racing bg-racing text-white" : "border-white/20 text-silver hover:border-white hover:text-white",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
                className="mb-3 break-inside-avoid sm:mb-4"
              >
                <button
                  type="button"
                  onClick={() => setOpen(shown.indexOf(p))}
                  aria-label={`Open photo: ${p.alt}`}
                  className="group relative block w-full overflow-hidden bg-ink"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 right-3 grid size-9 place-items-center bg-racing text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 className="size-4" aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Lightbox photos={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
