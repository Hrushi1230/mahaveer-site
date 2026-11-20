import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp button (desktop/tablet). On phones the bottom action bar covers this. */
export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Hello, I would like to know more about driving training at Mahaveer Driving Training School.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="pulse-ring fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-2xl transition-transform hover:scale-110 md:grid"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
