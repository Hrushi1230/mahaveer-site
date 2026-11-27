import type { ReactNode } from "react";

/**
 * Hand-drawn SVG road signs (Indian convention): circular = mandatory/prohibitory,
 * triangular = warning, rectangular blue = informatory. Meanings are general learner
 * guidance — learners should always refer to the official RTO / Motor Vehicles rules.
 */

export interface SignItem {
  id: string;
  name: string;
  meaning: string;
  art: ReactNode;
}

const RED = "#d32f2f";
const BLUE = "#1e56a0";
const svg = (children: ReactNode) => (
  <svg viewBox="0 0 100 100" role="img" aria-hidden className="size-full">
    {children}
  </svg>
);

const triangle = (symbol: ReactNode) =>
  svg(
    <>
      <polygon points="50,8 94,88 6,88" fill="#fff" stroke={RED} strokeWidth="8" strokeLinejoin="round" />
      <g fill="#111" stroke="#111">
        {symbol}
      </g>
    </>,
  );

const infoBox = (symbol: ReactNode) =>
  svg(
    <>
      <rect x="6" y="10" width="88" height="80" rx="8" fill={BLUE} stroke="#fff" strokeWidth="3" />
      {symbol}
    </>,
  );

const lamp = (on: "red" | "amber" | "green" | "arrow", blink = false) => {
  const col = { red: "#ef3b36", amber: "#ffb300", green: "#2ecc71", arrow: "#2ecc71" } as const;
  const y = { red: 24, amber: 50, green: 76, arrow: 76 } as const;
  return svg(
    <>
      <rect x="30" y="4" width="40" height="92" rx="10" fill="#14171c" stroke="#3a404c" strokeWidth="2" />
      {[24, 50, 76].map((cy) => (
        <circle key={cy} cx="50" cy={cy} r="11" fill="#2a2f3a" />
      ))}
      <circle cx="50" cy={y[on]} r="11" fill={col[on]} className={blink ? "animate-pulse" : undefined} />
      <circle cx="50" cy={y[on]} r="17" fill={col[on]} opacity="0.25" className={blink ? "animate-pulse" : undefined} />
      {on === "arrow" && <path d="M44 80 V72 H52 V68 L60 76 L52 84 V80 Z" fill="#fff" />}
    </>,
  );
};

const road = (marks: ReactNode) =>
  svg(
    <>
      <rect width="100" height="100" rx="6" fill="#2a2f3a" />
      {marks}
    </>,
  );

export const SIGN_TABS = [
  "Mandatory Signs",
  "Warning Signs",
  "Informatory Signs",
  "Traffic Signals",
  "Road Markings",
  "Safe Driving Rules",
] as const;
export type SignTab = (typeof SIGN_TABS)[number];

export const SIGNS: Record<Exclude<SignTab, "Safe Driving Rules">, SignItem[]> = {
  "Mandatory Signs": [
    {
      id: "stop",
      name: "Stop",
      meaning: "Come to a complete halt at the line, look both ways, and move off only when it is safe.",
      art: svg(
        <>
          <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#fff" />
          <polygon points="31,9 69,9 91,31 91,69 69,91 31,91 9,69 9,31" fill={RED} />
          <text x="50" y="59" textAnchor="middle" fontSize="23" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
            STOP
          </text>
        </>,
      ),
    },
    {
      id: "give-way",
      name: "Give Way",
      meaning: "Slow down and let traffic on the main road pass first. Stop if you need to.",
      art: svg(<polygon points="8,14 92,14 50,90" fill="#fff" stroke={RED} strokeWidth="9" strokeLinejoin="round" />),
    },
    {
      id: "no-entry",
      name: "No Entry",
      meaning: "Vehicles are not allowed to enter this road from this direction.",
      art: svg(
        <>
          <circle cx="50" cy="50" r="46" fill={RED} />
          <rect x="18" y="42" width="64" height="16" fill="#fff" />
        </>,
      ),
    },
    {
      id: "speed-limit",
      name: "Speed Limit",
      meaning: "Do not drive faster than the speed shown (in km/h). Slower is safer in poor conditions.",
      art: svg(
        <>
          <circle cx="50" cy="50" r="42" fill="#fff" stroke={RED} strokeWidth="9" />
          <text x="50" y="63" textAnchor="middle" fontSize="38" fontWeight="800" fill="#111" fontFamily="Arial, sans-serif">
            40
          </text>
        </>,
      ),
    },
    {
      id: "no-parking",
      name: "No Parking",
      meaning: "Parking is not permitted here. Do not leave your vehicle standing in this area.",
      art: svg(
        <>
          <circle cx="50" cy="50" r="42" fill={BLUE} stroke={RED} strokeWidth="8" />
          <line x1="24" y1="76" x2="76" y2="24" stroke={RED} strokeWidth="8" strokeLinecap="round" />
        </>,
      ),
    },
    {
      id: "ahead-only",
      name: "Ahead Only",
      meaning: "Traffic must go straight ahead. Turning is not permitted.",
      art: svg(
        <>
          <circle cx="50" cy="50" r="46" fill={BLUE} />
          <path d="M50 18 L74 46 H58 V80 H42 V46 H26 Z" fill="#fff" />
        </>,
      ),
    },
    {
      id: "turn-left",
      name: "Compulsory Turn Left",
      meaning: "Traffic must turn left at this point.",
      art: svg(
        <>
          <circle cx="50" cy="50" r="46" fill={BLUE} />
          <path d="M18 50 L46 24 V40 H80 V60 H46 V76 Z" fill="#fff" />
        </>,
      ),
    },
  ],
  "Warning Signs": [
    {
      id: "curve",
      name: "Sharp Curve",
      meaning: "A bend lies ahead. Slow down before the curve and stay in your lane.",
      art: triangle(
        <>
          <path d="M40 80 V64 Q40 50 56 46 L56 38" fill="none" strokeWidth="6" strokeLinecap="round" />
          <polygon points="47,40 56,26 65,40" />
        </>,
      ),
    },
    {
      id: "pedestrian",
      name: "Pedestrian Crossing",
      meaning: "People may be crossing ahead. Slow down and be ready to stop.",
      art: triangle(
        <>
          <circle cx="50" cy="40" r="5" />
          <path d="M50 47 V64 M50 64 L42 79 M50 64 L58 79 M50 53 L41 60 M50 53 L59 58" fill="none" strokeWidth="4.5" strokeLinecap="round" />
        </>,
      ),
    },
    {
      id: "slippery",
      name: "Slippery Road",
      meaning: "The surface may be slippery, especially in rain. Avoid sudden braking and sharp steering.",
      art: triangle(
        <>
          <rect x="35" y="48" width="30" height="12" rx="4" />
          <circle cx="42" cy="62" r="3.5" />
          <circle cx="58" cy="62" r="3.5" />
          <path d="M33 76 q4 -5 8 0 t8 0 t8 0 t8 0" fill="none" strokeWidth="3.5" strokeLinecap="round" />
        </>,
      ),
    },
    {
      id: "narrow",
      name: "Road Narrows",
      meaning: "The road becomes narrower ahead. Be prepared to give way to oncoming traffic.",
      art: triangle(
        <path d="M36 80 C44 66 44 56 40 42 M64 80 C56 66 56 56 60 42" fill="none" strokeWidth="6" strokeLinecap="round" />,
      ),
    },
    {
      id: "cross-road",
      name: "Cross Road",
      meaning: "A road crosses ahead. Slow down and watch for traffic from both sides.",
      art: triangle(
        <>
          <rect x="46" y="34" width="8" height="46" />
          <rect x="30" y="52" width="40" height="8" />
        </>,
      ),
    },
    {
      id: "hump",
      name: "Speed Breaker / Hump",
      meaning: "A raised hump lies ahead. Reduce speed smoothly before crossing it.",
      art: triangle(
        <>
          <path d="M30 76 A20 20 0 0 1 70 76 Z" />
          <rect x="24" y="76" width="52" height="4" />
        </>,
      ),
    },
  ],
  "Informatory Signs": [
    {
      id: "parking",
      name: "Parking",
      meaning: "A designated parking place. Park only within the marked area.",
      art: infoBox(
        <text x="50" y="68" textAnchor="middle" fontSize="54" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
          P
        </text>,
      ),
    },
    {
      id: "hospital",
      name: "Hospital",
      meaning: "A hospital is nearby. Drive slowly, avoid unnecessary horn use and keep the way clear for ambulances.",
      art: infoBox(
        <>
          <rect x="26" y="22" width="48" height="56" rx="4" fill="#fff" />
          <rect x="45" y="32" width="10" height="36" fill={RED} />
          <rect x="37" y="45" width="26" height="10" fill={RED} />
        </>,
      ),
    },
    {
      id: "fuel",
      name: "Petrol Pump",
      meaning: "A fuel station is ahead. Check your fuel and indicate early before turning in.",
      art: infoBox(
        <g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="30" y="26" width="26" height="48" rx="3" fill="#fff" />
          <path d="M56 40 H66 V62 A5 5 0 0 0 76 62 V42 L68 34" />
        </g>,
      ),
    },
    {
      id: "first-aid",
      name: "First Aid Post",
      meaning: "Basic first-aid help is available nearby.",
      art: infoBox(
        <>
          <rect x="44" y="24" width="12" height="52" fill="#fff" />
          <rect x="24" y="44" width="52" height="12" fill="#fff" />
        </>,
      ),
    },
    {
      id: "one-way",
      name: "One Way",
      meaning: "Traffic moves in one direction only, as the arrow shows. Do not drive against it.",
      art: infoBox(<path d="M18 50 H64 V34 L84 50 L64 66 V50" fill="#fff" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />),
    },
  ],
  "Traffic Signals": [
    { id: "red", name: "Red Light", meaning: "Stop behind the stop line and wait until the signal changes.", art: lamp("red") },
    {
      id: "amber",
      name: "Amber (Yellow) Light",
      meaning: "The signal is about to turn red. Stop if you can do so safely; do not speed up to beat it.",
      art: lamp("amber"),
    },
    {
      id: "green",
      name: "Green Light",
      meaning: "You may go if the way ahead is clear. Give way to pedestrians still crossing.",
      art: lamp("green"),
    },
    {
      id: "flash",
      name: "Flashing Amber",
      meaning: "Proceed with caution. Slow down and check for crossing traffic or pedestrians.",
      art: lamp("amber", true),
    },
    {
      id: "arrow",
      name: "Green Arrow",
      meaning: "You may move only in the direction of the arrow. Still give way to pedestrians.",
      art: lamp("arrow"),
    },
  ],
  "Road Markings": [
    {
      id: "solid",
      name: "Solid Centre Line",
      meaning: "A continuous line: do not cross it or overtake across it.",
      art: road(<rect x="47" y="0" width="6" height="100" fill="#fff" />),
    },
    {
      id: "broken",
      name: "Broken Line",
      meaning: "You may cross it to overtake or change lanes — only when the road is clear and it is safe.",
      art: road(
        <>
          {[4, 36, 68].map((y) => (
            <rect key={y} x="47" y={y} width="6" height="22" fill="#fff" />
          ))}
        </>,
      ),
    },
    {
      id: "double",
      name: "Double Solid Line",
      meaning: "Strict no-crossing line. Never overtake or cross over it.",
      art: road(
        <>
          <rect x="42" y="0" width="5" height="100" fill="#fff" />
          <rect x="53" y="0" width="5" height="100" fill="#fff" />
        </>,
      ),
    },
    {
      id: "zebra",
      name: "Zebra Crossing",
      meaning: "Pedestrians have priority. Stop before the crossing and let people cross safely.",
      art: road(
        <>
          {[14, 30, 46, 62, 78].map((y) => (
            <rect key={y} x="14" y={y} width="72" height="8" fill="#fff" />
          ))}
        </>,
      ),
    },
    {
      id: "stop-line",
      name: "Stop Line",
      meaning: "Halt behind this line at a signal or junction — never with your wheels over it.",
      art: road(
        <>
          <rect x="10" y="56" width="80" height="8" fill="#fff" />
          <rect x="10" y="0" width="4" height="100" fill="#fff" opacity="0.5" />
          <rect x="86" y="0" width="4" height="100" fill="#fff" opacity="0.5" />
        </>,
      ),
    },
  ],
};
