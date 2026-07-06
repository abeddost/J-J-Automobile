import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants";

const LOCALE_COOKIE = "NEXT_LOCALE";

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && (LOCALES as readonly string[]).includes(preferred)) {
    return preferred;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = new URL(`/${locale}${pathname}`, request.url);
  url.search = request.nextUrl.search;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365, path: "/" });
  return response;
}

export const config = {
  // Skip API routes, Next internals, and any request for a static file in
  // public/ (anything with a file extension) — not just specific filenames,
  // so new assets dropped into public/ never get wrongly locale-prefixed.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
