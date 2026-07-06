import { SOCIAL } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

const links = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon },
];

export function SocialRail() {
  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex lg:right-6">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex drop-shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110"
        >
          <Icon size={40} />
        </a>
      ))}
    </div>
  );
}
