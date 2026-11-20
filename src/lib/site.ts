/**
 * Central business configuration.
 * Everything that is not supplied by the school (exact address, map pin, fees,
 * timings…) is deliberately NOT invented here — set the optional env vars in
 * `.env.local` (see `.env.example`) once the details are confirmed.
 */
export const SITE = {
  name: "Mahaveer Driving Training School",
  shortName: "Mahaveer Driving Training",
  tagline: "Safe Drive • Confident Drive • Life Save",
  locality: "Bhadrak",
  region: "Odisha",
  country: "India",
  location: "Bhadrak, Odisha, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phones: [
    { display: "+91 70088 27825", raw: "7008827825" },
    { display: "+91 98534 85223", raw: "9853485223" },
  ],
  whatsappNumber: "917008827825",
  instagram: "https://www.instagram.com/mahaveer_driving_training",
  facebook: "https://www.facebook.com/mahaveerdrivingtraining",
  /** Optional: paste the Google Maps "Embed a map" src URL for the exact school location. */
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ??
    "https://www.google.com/maps?q=Bhadrak,+Odisha,+India&output=embed",
  /** Optional: paste the Google Maps share link of the exact school location. */
  directionsUrl:
    process.env.NEXT_PUBLIC_MAPS_DIRECTIONS_URL ??
    "https://www.google.com/maps/search/?api=1&query=Mahaveer+Driving+Training+School+Bhadrak+Odisha",
  hasExactMap: Boolean(process.env.NEXT_PUBLIC_MAP_EMBED_URL),
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telLink = (raw: string) => `tel:+91${raw}`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Road Safety", href: "#road-safety" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const COURSE_OPTIONS = [
  "Beginner Driving Course",
  "Practical Road Training",
  "Traffic Rules & Theory",
  "Parking & Vehicle Control",
  "Confidence Improvement Course",
  "Driving Licence Guidance",
  "Not sure yet — need advice",
] as const;

export type GalleryCategory =
  | "Training Moments"
  | "Student Experiences"
  | "Instructor Interaction"
  | "Training Vehicle"
  | "School Activities";

export interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  categories: GalleryCategory[];
}

const p = (
  n: string,
  width: number,
  height: number,
  alt: string,
  categories: GalleryCategory[],
): Photo => ({
  id: n,
  src: `/images/training-moment-${n}.webp`,
  width,
  height,
  alt,
  categories,
});

/** The school's real photographs. Never swap these for stock images. */
export const PHOTOS: Photo[] = [
  p("01", 432, 568, "Instructor and a learner standing in front of the Mahaveer Driving Training car at night", ["Training Vehicle", "Instructor Interaction"]),
  p("02", 447, 532, "Instructor and a learner with the Mahaveer training car outside Bhadrak Bus Stand", ["Training Moments", "Training Vehicle"]),
  p("03", 454, 576, "Instructor speaking with a learner beside the training car", ["Instructor Interaction", "School Activities"]),
  p("04", 442, 577, "Instructor with a learner next to the training car in the evening", ["Student Experiences", "Training Moments"]),
  p("05", 450, 540, "Instructor and a learner discussing driving practice beside the car", ["Instructor Interaction", "School Activities"]),
  p("06", 435, 429, "A learner sharing her experience with Mahaveer Driving Training", ["Student Experiences"]),
  p("07", 448, 550, "A learner talking about her driving training experience", ["Student Experiences"]),
  p("08", 435, 558, "A learner and instructor in front of the white Mahaveer training car", ["Training Moments", "Training Vehicle", "Student Experiences"]),
  p("09", 450, 571, "Instructor with a learner in front of the training car", ["Instructor Interaction", "School Activities"]),
  p("10", 447, 571, "A student and instructor with the Mahaveer training car on the road", ["Training Moments", "Training Vehicle", "Student Experiences"]),
  p("11", 441, 543, "Instructor and a learner with the Mahaveer Driving Training car showing the school's branding", ["Training Vehicle", "Instructor Interaction"]),
  p("12", 439, 561, "A learner and instructor beside the training car on a road in Bhadrak", ["Training Moments", "Student Experiences", "Training Vehicle"]),
];

export const photo = (id: string) => PHOTOS.find((x) => x.id === id)!;

export const GALLERY_CATEGORIES: ("All" | GalleryCategory)[] = [
  "All",
  "Training Moments",
  "Student Experiences",
  "Instructor Interaction",
  "Training Vehicle",
  "School Activities",
];

export const LOGO = { src: "/images/mahaveer-logo.webp", width: 870, height: 870 };
