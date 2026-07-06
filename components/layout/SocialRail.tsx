import { SOCIAL } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const links = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export function SocialRail() {
  return (
    <div className="fixed bottom-24 right-3 z-40 flex flex-col gap-2.5 sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2 sm:gap-3 lg:right-6">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex drop-shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
        >
          <Icon size={40} className="h-8 w-8 sm:h-10 sm:w-10" />
        </a>
      ))}
    </div>
  );
}
