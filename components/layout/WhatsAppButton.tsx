import { BUSINESS } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function WhatsAppButton() {
  const digits = BUSINESS.phones[0].href.replace("tel:+", "");
  const message = encodeURIComponent("Hallo, ich interessiere mich für ein Fahrzeug.");
  const href = `https://wa.me/${digits}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl"
    >
      <WhatsAppIcon size={56} />
    </a>
  );
}
