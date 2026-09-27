"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, type ReactNode, useEffect, useState } from "react";

/** Matches Tailwind `md` — viewports below this use the static hero PNG. */
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

const HeroEyeCanvas = dynamic(
  () => import("@/components/home/hero-eye-canvas").then((mod) => mod.HeroEyeCanvas),
  { ssr: false },
);

const HERO_IMAGE = (
  <Image
    src="/assets/homepage/hero-logo.png"
    alt=""
    width={1125}
    height={500}
    className="h-full w-full object-contain dark:invert dark:opacity-90"
    priority
    aria-hidden
  />
);

class HeroEyeErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function HeroEye({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  /** null until measured — keeps PNG visible and avoids loading WebGL on mobile. */
  const [allowWebGL, setAllowWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    const sync = () => setAllowWebGL(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const showCanvas = mounted && allowWebGL === true && !webglFailed;

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <div className={showCanvas ? "opacity-0" : "opacity-100"} aria-hidden={showCanvas}>
        {HERO_IMAGE}
      </div>
      {showCanvas ? (
        <HeroEyeErrorBoundary onError={() => setWebglFailed(true)}>
          <div className="absolute inset-0">
            <HeroEyeCanvas />
          </div>
        </HeroEyeErrorBoundary>
      ) : null}
    </div>
  );
}
