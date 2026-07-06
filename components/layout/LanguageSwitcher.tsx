"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/constants";

function swapLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = nextLocale;
  return segments.join("/") || "/";
}

function persistLocaleCookie(next: Locale) {
  document.cookie = `NEXT_LOCALE=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitch(next: Locale) {
    if (next === locale) return;
    persistLocaleCookie(next);
    router.push(swapLocale(pathname, next));
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleSwitch(l)}
            aria-current={l === locale}
            className={`min-h-11 min-w-11 rounded-full px-2 uppercase transition-colors ${
              l === locale ? "text-gold-dark" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {l}
          </button>
          {i < LOCALES.length - 1 ? <span className="text-foreground/20">/</span> : null}
        </span>
      ))}
    </div>
  );
}
