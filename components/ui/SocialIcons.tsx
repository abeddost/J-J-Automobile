"use client";

import { useId } from "react";

export function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.23 22 17.08 22 12.06Z"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  const gradientId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(7 24) rotate(-55) scale(26)"
        >
          <stop stopColor="#FFDD55" />
          <stop offset="0.15" stopColor="#FFDD55" />
          <stop offset="0.42" stopColor="#FD1D1D" />
          <stop offset="0.75" stopColor="#C13584" />
          <stop offset="1" stopColor="#405DE6" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill={`url(#${gradientId})`} />
      <rect
        x="3.3"
        y="3.3"
        width="17.4"
        height="17.4"
        rx="4.8"
        stroke="white"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.1" stroke="white" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="white" />
    </svg>
  );
}

export function TikTokIcon({ size = 20 }: { size?: number }) {
  const note =
    "M16.6 5.82a4.28 4.28 0 0 1-3.14-1.39V15.5a5.5 5.5 0 1 1-5.5-5.5c.19 0 .38.01.56.04v2.44a2.9 2.9 0 0 0-.56-.05 3.07 3.07 0 1 0 3.07 3.07V2h2.4a4.28 4.28 0 0 0 3.17 4.13v2.31a6.6 6.6 0 0 1-2.4-.45v6a5.06 5.06 0 0 1-.02.4z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6.5" fill="#010101" />
      <path d={note} fill="#25F4EE" transform="translate(-0.9 0.5)" />
      <path d={note} fill="#FE2C55" transform="translate(0.9 -0.5)" />
      <path d={note} fill="#FFFFFF" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="white"
        d="M17.47 14.38c-.29-.15-1.71-.84-1.97-.94-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.6-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.91-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43 0 1.43 1.04 2.82 1.19 3.01.15.2 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.71-.7 1.95-1.37.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.35Z"
      />
      <path
        fill="white"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.02 4c-4.42 0-8 3.58-8 8 0 1.4.37 2.77 1.05 3.97L4 20l4.16-1.09a7.96 7.96 0 0 0 3.86 1c4.42 0 8-3.58 8-8s-3.58-8-8-8Zm0 14.53a6.5 6.5 0 0 1-3.32-.91l-.24-.14-2.47.65.66-2.4-.16-.25a6.53 6.53 0 1 1 5.53 3.05Z"
      />
    </svg>
  );
}
