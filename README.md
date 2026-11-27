# Mahaveer Driving Training School — Website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
- `src/lib/site.ts` — all business details, links, course options and the **real photo list** (alt text + gallery categories).
- `src/components/` — Navbar, Hero, Intro, TrainingCourses, WhyChooseUs, LearningJourney, RoadSafety (+ `signs.tsx` SVG signs), VehicleShowcase, Testimonials, StudentGallery (+ Lightbox), FAQ, Contact (enquiry + location), Footer, WhatsAppButton, MobileActionBar.
- `public/images/` — supplied logo and photos (optimised by `next/image`).

## To confirm / add before publishing
Copy `.env.example` to `.env.local` and set:
- `NEXT_PUBLIC_SITE_URL` — your live domain (SEO, sitemap, structured data).
- `NEXT_PUBLIC_MAP_EMBED_URL` / `NEXT_PUBLIC_MAPS_DIRECTIONS_URL` — exact school location (the map shows Bhadrak town until set).

Deliberately **not** invented: street address, fees, timings, course duration, experience years, licence guarantees, written reviews/ratings.
Confirm both phone numbers and that people in the photos consent to public use.
Adding a written testimonial: extend `src/components/Testimonials.tsx` once real, consented quotes exist.

## Deploy (Vercel — recommended)
1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo (framework auto-detected as Next.js; no build settings needed).
3. Under **Settings → Environment Variables** add `NEXT_PUBLIC_SITE_URL` (your final domain, e.g. `https://example.in`) and, when known, `NEXT_PUBLIC_MAP_EMBED_URL` and `NEXT_PUBLIC_MAPS_DIRECTIONS_URL`. Redeploy after changing them.
4. Add your custom domain under **Settings → Domains**.
5. After going live: submit `https://<domain>/sitemap.xml` in Google Search Console and claim/verify the Google Business Profile (important for local search; rankings are never guaranteed).

## Pre-launch checklist
- [ ] Both phone numbers confirmed
- [ ] Exact map pin + directions link set
- [ ] Consent for public use of the people in the photos
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] Instagram / Facebook links open the correct pages
- [ ] Test the enquiry form on a real phone (opens WhatsApp)
