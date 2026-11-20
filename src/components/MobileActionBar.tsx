import { ClipboardEdit, Phone } from "lucide-react";
import { SITE, telLink, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Sticky bottom bar on mobile: CALL | WHATSAPP | ENQUIRE — every action is one tap. */
export default function MobileActionBar() {
  const base = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white active:brightness-90";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 flex border-t border-white/15 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <a href={telLink(SITE.phones[0].raw)} className={base}>
        <Phone className="size-5 text-racing" aria-hidden />
        Call
      </a>
      <a
        href={waLink("Hello, I would like to know more about driving training.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border-x border-white/10`}
      >
        <WhatsAppIcon className="size-5 text-[#25d366]" />
        WhatsApp
      </a>
      <a href="#contact" className={`${base} bg-racing`}>
        <ClipboardEdit className="size-5" aria-hidden />
        Enquire
      </a>
    </nav>
  );
}
