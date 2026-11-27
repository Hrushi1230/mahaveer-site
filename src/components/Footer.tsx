import Image from "next/image";
import { LOGO, SITE, telLink } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./icons";

const links = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Driving Courses", "#courses"],
  ["Road Safety", "#road-safety"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
] as const;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink pb-24 pt-16 text-white md:pb-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-racing to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr] lg:px-8">
        <div>
          <a href="#home" className="flex items-center gap-4" aria-label="Back to top">
            <Image src={LOGO.src} alt="Mahaveer Driving Training logo" width={80} height={80} loading="lazy" className="size-20 rounded-full border border-white/20 object-cover" />
            <span className="headline text-2xl leading-tight">
              Mahaveer
              <br />
              Driving Training School
            </span>
          </a>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-racing">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-silver">Quick links</h2>
          <ul className="mt-5 grid gap-3">
            {links.map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-white/90 transition-colors hover:text-racing">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-silver">Contact</h2>
          <ul className="mt-5 grid gap-3">
            {SITE.phones.map((p) => (
              <li key={p.raw}>
                <a href={telLink(p.raw)} className="text-white/90 transition-colors hover:text-racing">
                  {p.raw}
                </a>
              </li>
            ))}
            <li className="text-white/90">Bhadrak, Odisha</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-silver">Follow us</h2>
          <div className="mt-5 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-12 place-items-center border border-white/20 transition-colors hover:border-racing hover:bg-racing">
              <InstagramIcon className="size-5" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-12 place-items-center border border-white/20 transition-colors hover:border-racing hover:bg-racing">
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 px-5 pt-6 text-sm text-silver lg:px-8">
        © 2026 Mahaveer Driving Training School. All Rights Reserved.
      </div>
    </footer>
  );
}
