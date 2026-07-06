import { MapPin } from "lucide-react";
import { MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, BUSINESS } from "@/lib/constants";

export function MapEmbed({
  directionsLabel,
  className = "",
}: {
  directionsLabel: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className}`}>
      <iframe
        src={MAPS_EMBED_URL}
        title={`${BUSINESS.name} – ${BUSINESS.address.street}, ${BUSINESS.address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full sm:h-80"
      />
      <a
        href={MAPS_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-t border-border bg-white py-3 text-sm font-medium text-foreground transition-colors hover:text-gold-dark"
      >
        <MapPin size={16} />
        {directionsLabel}
      </a>
    </div>
  );
}
