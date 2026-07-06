"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 94;
const framePath = (variant: "desktop" | "mobile", index: number) =>
  `/hero-frames/${variant}/frame_${String(index).padStart(3, "0")}.jpg`;

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroReveal({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const variantRef = useRef<"desktop" | "mobile">("desktop");

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const variant: "desktop" | "mobile" = window.innerWidth < 768 ? "mobile" : "desktop";
    variantRef.current = variant;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      drawFrame(currentFrameRef.current);
    }

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const clamped = Math.min(index, Math.max(loadedCountRef.current - 1, 0));
      const img = framesRef.current[clamped];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      const scale = 0.78;
      let drawW: number;
      let drawH: number;
      if (canvasRatio > imgRatio) {
        // Canvas relatively wider than the frame: height is the constraint.
        drawH = ch * scale;
        drawW = drawH * imgRatio;
      } else {
        // Canvas relatively narrower/taller (e.g. mobile portrait): width constrains.
        drawW = cw * scale;
        drawH = drawW / imgRatio;
      }
      const drawX = (cw - drawW) / 2;
      // Bias toward the bottom so the car sits clear of the intro copy above it.
      const drawY = Math.min(ch - drawH - ch * 0.06, ch * 0.5 - drawH * 0.15);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // Preload: first batch blocking-ish, rest trickle in background.
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const PRIORITY_COUNT = 14;

    function loadFrame(i: number, onDone?: () => void) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = framePath(variant, i + 1);
      img.onload = () => {
        if (disposed) return;
        images[i] = img;
        if (i + 1 > loadedCountRef.current) loadedCountRef.current = i + 1;
        onDone?.();
      };
      img.onerror = () => onDone?.();
      images[i] = img;
    }

    let loadedPriority = 0;
    for (let i = 0; i < Math.min(PRIORITY_COUNT, FRAME_COUNT); i++) {
      loadFrame(i, () => {
        loadedPriority++;
        if (loadedPriority === Math.min(PRIORITY_COUNT, FRAME_COUNT)) {
          setReady(true);
          resizeCanvas();
        }
      });
    }

    let cursor = PRIORITY_COUNT;
    function loadNextBackground() {
      if (disposed || cursor >= FRAME_COUNT) return;
      const i = cursor++;
      loadFrame(i, () => {
        const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void })
          .requestIdleCallback;
        if (idle) idle(loadNextBackground);
        else setTimeout(loadNextBackground, 16);
      });
    }
    loadNextBackground();

    framesRef.current = images;

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
      onUpdate: (self) => {
        requestAnimationFrame(() => {
          const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT));
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }
          setProgress(self.progress);
        });
      },
    });

    return () => {
      disposed = true;
      window.removeEventListener("resize", resizeCanvas);
      trigger.kill();
    };
  }, [reducedMotion]);

  const introOpacity = Math.max(0, 1 - progress / 0.32);
  const outroOpacity = Math.max(0, Math.min(1, (progress - 0.82) / 0.15));

  if (reducedMotion) {
    return (
      <section className="flex min-h-[90vh] flex-col items-center justify-center gap-10 overflow-hidden bg-white pb-12 pt-20 text-center">
        <HeroCopy locale={locale} dict={dict} opacity={1} />
        <div className="relative aspect-[16/9] w-full max-w-3xl px-6">
          <Image
            src={framePath("desktop", FRAME_COUNT)}
            alt="J&J Fair Automobile"
            fill
            priority
            className="object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapperRef} className="relative h-[220vh] sm:h-[260vh] lg:h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-border">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-gold" />
            </div>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex h-full flex-col items-center justify-start bg-[linear-gradient(to_bottom,white_0%,white_40%,transparent_65%)] px-6 pt-20 text-center sm:pt-28"
          style={{ opacity: introOpacity }}
        >
          <HeroCopy locale={locale} dict={dict} opacity={1} showButtons={false} />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-6 px-6 pb-16"
          style={{ opacity: outroOpacity }}
        >
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
          style={{ opacity: introOpacity }}
        >
          <div className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest text-muted">
            {dict.hero.scrollHint}
            <ChevronDown size={18} className="animate-bounce text-gold-dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCopy({
  dict,
  showButtons = true,
}: {
  locale: Locale;
  dict: Dictionary;
  opacity: number;
  showButtons?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
        {dict.hero.eyebrow}
      </p>
      <h1 className="text-balance font-heading text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
        {dict.hero.title}
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-balance text-base text-muted sm:text-lg">
        {dict.hero.subtitle}
      </p>
      {showButtons && (
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-white">
            {dict.hero.ctaPrimary}
          </span>
        </div>
      )}
    </div>
  );
}
