"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation, Phone, Send } from "lucide-react";
import { COURSE_OPTIONS, SITE, telLink, waLink } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { Button, Reveal, SectionHeading, cn } from "./ui";

type Errors = Partial<Record<"name" | "mobile", string>>;

function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [course, setCourse] = useState<string>(COURSE_OPTIONS[0]);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  // "Enquire about this" buttons on course cards preselect the training preference.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-course]");
      if (el?.dataset.course) setCourse(el.dataset.course);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const mobile = String(f.get("mobile") ?? "").replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
    const message = String(f.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(mobile)) next.mobile = "Enter a valid 10-digit mobile number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      `Hello ${SITE.name}, I would like to enquire about driving training.`,
      "",
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Training preference: ${course}`,
      message ? `Message: ${message}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const url = waLink(text);
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-2 w-full border bg-white/[0.06] px-4 py-3.5 text-base text-white placeholder:text-white/40 transition-colors focus:border-racing focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="border border-white/10 bg-charcoal/80 p-6 backdrop-blur sm:p-8">
      <h3 className="headline text-3xl">Quick enquiry</h3>
      <p className="mt-1 text-sm text-silver">Your details open in WhatsApp — nothing is stored on this website.</p>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-[0.18em] text-silver">
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            className={cn(field, errors.name ? "border-racing" : "border-white/15")}
          />
          {errors.name && (
            <p id="name-err" role="alert" className="mt-1.5 text-sm text-[#ff8a80]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="mobile" className="text-xs font-bold uppercase tracking-[0.18em] text-silver">
            Mobile number
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "mobile-err" : undefined}
            className={cn(field, errors.mobile ? "border-racing" : "border-white/15")}
          />
          {errors.mobile && (
            <p id="mobile-err" role="alert" className="mt-1.5 text-sm text-[#ff8a80]">
              {errors.mobile}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="course" className="text-xs font-bold uppercase tracking-[0.18em] text-silver">
            Training preference
          </label>
          <select
            id="course"
            name="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={cn(field, "border-white/15 [&>option]:bg-charcoal")}
          >
            {COURSE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
            {!COURSE_OPTIONS.includes(course as (typeof COURSE_OPTIONS)[number]) && <option>{course}</option>}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-[0.18em] text-silver">
            Message <span className="font-normal normal-case tracking-normal text-white/40">(optional)</span>
          </label>
          <textarea id="message" name="message" rows={3} placeholder="Tell us about your driving experience or questions" className={cn(field, "resize-none border-white/15")} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-racing px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-racing-dark"
      >
        <Send className="size-4" aria-hidden /> Send enquiry on WhatsApp
      </button>
      {waUrl && (
        <p role="status" className="mt-4 text-sm text-silver">
          WhatsApp should have opened. If not,{" "}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-racing underline">
            tap here to open it
          </a>
          .
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <>
      {/* SECTION 10 — enquiry / admission CTA */}
      <section id="contact" aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_20%,rgba(229,57,53,0.25),transparent_65%)]" aria-hidden />
        <div className="bg-grid-dark absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="red-bar" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-racing">Admissions open for enquiry</p>
              </div>
              <h2 id="cta-title" className="headline mt-4 text-4xl sm:text-5xl lg:text-7xl">
                Ready to start your <span className="text-racing">driving journey?</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-silver">
                Whether you&apos;re a complete beginner or looking to improve your driving skills, Mahaveer Driving
                Training School is here to help you take the next step.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={waLink("Hello, I would like to join driving training at Mahaveer Driving Training School.")} external icon={<WhatsAppIcon className="size-5" />}>
                Enquire on WhatsApp
              </Button>
              <Button href={telLink(SITE.phones[0].raw)} variant="outline" icon={<Phone className="size-4" aria-hidden />}>
                Call for admission
              </Button>
            </Reveal>
            <Reveal delay={0.25} className="mt-8 grid gap-2 text-silver">
              {SITE.phones.map((p) => (
                <a key={p.raw} href={telLink(p.raw)} className="flex w-fit items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-racing">
                  <Phone className="size-5 text-racing" aria-hidden /> {p.display}
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      {/* SECTION 11 — location & contact */}
      <section id="location" aria-labelledby="location-title" className="bg-mist py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            id="location-title"
            tone="light"
            eyebrow="Location & contact"
            title={
              <>
                Visit <span className="text-racing">Mahaveer</span> Driving Training School
              </>
            }
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <address className="not-italic">
                <ul className="grid gap-px border border-ink/10 bg-ink/10">
                  <li className="flex items-start gap-4 bg-white p-5">
                    <MapPin className="mt-1 size-6 shrink-0 text-racing" aria-hidden />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Location</p>
                      <p className="text-lg font-bold">{SITE.location}</p>
                    </div>
                  </li>
                  {SITE.phones.map((p) => (
                    <li key={p.raw} className="bg-white">
                      <a href={telLink(p.raw)} className="flex items-start gap-4 p-5 transition-colors hover:bg-ink hover:text-white">
                        <Phone className="mt-1 size-6 shrink-0 text-racing" aria-hidden />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Phone</p>
                          <p className="text-lg font-bold">{p.display}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                  <li className="bg-white">
                    <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 transition-colors hover:bg-ink hover:text-white">
                      <InstagramIcon className="size-6 shrink-0 text-racing" />
                      <span className="font-bold">@mahaveer_driving_training</span>
                    </a>
                  </li>
                  <li className="bg-white">
                    <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 transition-colors hover:bg-ink hover:text-white">
                      <FacebookIcon className="size-6 shrink-0 text-racing" />
                      <span className="font-bold">Mahaveer Driving Training on Facebook</span>
                    </a>
                  </li>
                </ul>
              </address>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button href={telLink(SITE.phones[0].raw)} icon={<Phone className="size-4" aria-hidden />}>
                  Call now
                </Button>
                <Button href={waLink("Hello, I would like to know more about driving training.")} external variant="ghost-dark" icon={<WhatsAppIcon className="size-4" />}>
                  WhatsApp us
                </Button>
                <Button href={SITE.instagram} external variant="ghost-dark" icon={<InstagramIcon className="size-4" />}>
                  Instagram
                </Button>
                <Button href={SITE.facebook} external variant="ghost-dark" icon={<FacebookIcon className="size-4" />}>
                  Facebook
                </Button>
                <Button href={SITE.directionsUrl} external variant="light" className="col-span-2 border border-ink/15" icon={<Navigation className="size-4" aria-hidden />}>
                  Get directions
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative h-full min-h-[22rem] overflow-hidden border border-ink/10 bg-white">
                {/*
                  MAP PLACEHOLDER: shows Bhadrak town until the exact school pin is supplied.
                  Set NEXT_PUBLIC_MAP_EMBED_URL in .env.local (Google Maps → Share → Embed a map → src URL).
                */}
                <iframe
                  title="Map of Bhadrak, Odisha"
                  src={SITE.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
