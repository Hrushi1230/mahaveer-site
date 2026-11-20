"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/site";

export default function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = useCallback(() => index !== null && onIndex((index - 1 + photos.length) % photos.length), [index, onIndex, photos.length]);
  const next = useCallback(() => index !== null && onIndex((index + 1) % photos.length), [index, onIndex, photos.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, prev, next]);

  const ph = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {ph && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 grid size-12 place-items-center border border-white/30 bg-ink/70 text-white hover:bg-racing"
          >
            <X className="size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/30 bg-ink/70 text-white hover:bg-racing sm:left-6"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/30 bg-ink/70 text-white hover:bg-racing sm:right-6"
          >
            <ChevronRight className="size-6" />
          </button>

          <motion.figure
            key={ph.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[88vh] w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ph.src}
              alt={ph.alt}
              width={ph.width}
              height={ph.height}
              sizes="(min-width:640px) 28rem, 92vw"
              className="max-h-[80vh] w-full object-contain"
              priority
            />
            <figcaption className="mt-3 text-center text-sm text-silver">
              {ph.alt} · {index! + 1} / {photos.length}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
