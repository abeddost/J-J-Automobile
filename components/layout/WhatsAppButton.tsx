import { BUSINESS } from "@/lib/constants";

function WhatsAppIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.29-.15-1.71-.84-1.97-.94-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.91-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.71-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.35Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.02 2C6.5 2 2.03 6.48 2.03 12c0 1.87.52 3.62 1.4 5.12L2 22l4.99-1.31A9.96 9.96 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm0 18.2a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-2.96.78.79-2.88-.19-.3a8.18 8.18 0 1 1 6.82 3.72Z"
      />
    </svg>
  );
}

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
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-xl"
    >
      <WhatsAppIcon />
    </a>
  );
}
