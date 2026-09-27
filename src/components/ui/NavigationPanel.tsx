"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenisInstance } from "@/components/smooth-scroll-provider";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

export interface NavigationPanelProps {
  name?: string;
  onAboutClick?: () => void;
  onContactClick?: () => void;
  className?: string;
  overlay?: boolean;
}

const NAV_ALBUM_COVER = "/assets/ui/album-cover.png";
const CONTACT_EMAIL = "dillonrco@gmail.com";

const PANEL_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };
const PANEL_SURFACE =
  "nav-panel-glass overflow-hidden rounded-[12px] transition-colors duration-200";
const PANEL_SHADOW =
  "drop-shadow-[0px_4px_10px_rgba(0,0,0,0.02)] dark:drop-shadow-[0px_4px_24px_rgba(0,0,0,0.35)]";

function NavBackdrop({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="nav-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={PANEL_TRANSITION}
      className="fixed inset-0 z-20 bg-[var(--ui-backdrop)] backdrop-blur-[6px]"
      onClick={onClose}
      aria-hidden
    />
  );
}

function RotatingAlbumCover() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-label="Now playing">
      <Image
        src={NAV_ALBUM_COVER}
        alt=""
        fill
        className="scale-125 object-cover blur-2xl"
        sizes="(max-width: 640px) 50vw, 300px"
        aria-hidden
        unoptimized
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative aspect-square w-[92%]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 10, repeat: Infinity, ease: "linear" }
          }
        >
          <Image
            src={NAV_ALBUM_COVER}
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, 300px"
            unoptimized
          />
        </motion.div>
      </div>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#2a2a2a]">
      <div className="relative flex size-[140px] items-center justify-center rounded-full border border-white/10">
        <div className="absolute left-4 rounded bg-black/80 px-2 py-1 font-mono text-[11px] tracking-wide text-white">
          {time ?? "--:--"} BST
        </div>
        <div className="absolute h-[1px] w-10 origin-left rotate-[30deg] bg-white/50" />
        <div className="absolute h-[1px] w-7 origin-left rotate-[-60deg] bg-white/70" />
        <div className="size-1.5 rounded-full bg-white/80" />
      </div>
    </div>
  );
}

const MENU_ICON_TRANSITION = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

function AnimatedMenuIcon({ isOpen }: { isOpen: boolean }) {
  const lineClass = "absolute block h-[1.5px] rounded-full bg-ui-nav-icon";
  const lineOrigin = {
    left: "50%",
    top: "50%",
    originX: "50%",
    originY: "50%",
  } as const;

  return (
    <span className="relative block size-[18px]" aria-hidden>
      <motion.span
        className={lineClass}
        initial={false}
        style={lineOrigin}
        animate={
          isOpen
            ? { x: "-50%", y: "-50%", rotate: 45, width: 10.5 }
            : { x: "-50%", y: "calc(-50% - 3.75px)", rotate: 0, width: 13.5 }
        }
        transition={MENU_ICON_TRANSITION}
      />
      <motion.span
        className={lineClass}
        initial={false}
        style={lineOrigin}
        animate={
          isOpen
            ? { x: "-50%", y: "-50%", opacity: 0, scaleX: 0, rotate: 0, width: 13.5 }
            : { x: "-50%", y: "-50%", opacity: 1, scaleX: 1, rotate: 0, width: 13.5 }
        }
        transition={{ duration: 0.18, ease: MENU_ICON_TRANSITION.ease }}
      />
      <motion.span
        className={lineClass}
        initial={false}
        style={lineOrigin}
        animate={
          isOpen
            ? { x: "-50%", y: "-50%", rotate: -45, width: 10.5 }
            : { x: "-50%", y: "calc(-50% + 3.75px)", rotate: 0, width: 13.5 }
        }
        transition={MENU_ICON_TRANSITION}
      />
    </span>
  );
}

function NavPanelHeader({
  name,
  isOpen,
  onToggle,
  pathname,
  onClose,
}: {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  pathname: string;
  onClose: () => void;
}) {
  const handleHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (pathname === "/") {
      event.preventDefault();
      if (isOpen) onClose();
    }
  };

  return (
    <div className="flex items-center justify-between px-5 py-4">
      <Link
        href="/"
        onClick={handleHomeClick}
        aria-label="Go to homepage"
        className="flex min-w-0 items-center gap-4 rounded-md transition-opacity hover:opacity-80"
      >
        <Image
          src="/assets/ui/eye-logo.svg"
          alt=""
          width={45}
          height={20}
          className="h-5 w-[45px] shrink-0 dark:invert"
        />
        <span className="whitespace-nowrap text-[16px] leading-[1.5] text-ui-text">
          {name}
        </span>
      </Link>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={onToggle}
        className="relative flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[var(--ui-hover-overlay)]"
      >
        <AnimatedMenuIcon isOpen={isOpen} />
      </button>
    </div>
  );
}

function NavPanelContent({
  onAboutClick,
  onContactClick,
  onClose,
}: {
  onAboutClick?: () => void;
  onContactClick?: () => void;
  onClose: () => void;
}) {
  const pathname = usePathname();

  const handleAboutClick: React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = (event) => {
    if (onAboutClick) {
      event.preventDefault();
      onClose();
      onAboutClick();
      return;
    }

    if (pathname === "/about") {
      event.preventDefault();
      onClose();
    }
  };

  const handleContactClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = (
    event,
  ) => {
    if (onContactClick) {
      event.preventDefault();
      onClose();
      onContactClick();
      return;
    }

    onClose();
  };

  return (
    <div className="flex flex-col gap-4 px-5 pb-5">
      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[12px]"
        >
          <RotatingAlbumCover />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.3 }}
          className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[12px]"
        >
          <LiveClock />
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="min-w-[240px] flex-1">
          <Button
            label="About"
            size="nav"
            href={onAboutClick ? undefined : "/about"}
            onClick={handleAboutClick}
          />
        </div>
        <div className="min-w-[240px] flex-1">
          <Button
            label="Contact"
            size="nav"
            href={onContactClick ? undefined : `mailto:${CONTACT_EMAIL}`}
            onClick={handleContactClick}
          />
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
}

export function NavigationPanel({
  name = "Dillon Ramesh",
  onAboutClick,
  onContactClick,
  className = "",
  overlay = false,
}: NavigationPanelProps) {
  const pathname = usePathname();
  const lenis = useLenisInstance();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((open) => !open);
  const closePanel = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();

    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  if (overlay) {
    return (
      <div className={["relative h-[67px] w-full max-w-[640px]", className].join(" ")}>
        <AnimatePresence initial={false}>
          {isOpen && <NavBackdrop onClose={toggle} />}
        </AnimatePresence>
        <div className={["absolute left-0 right-0 top-0 z-30", PANEL_SHADOW].join(" ")}>
          <div className={PANEL_SURFACE}>
            <NavPanelHeader
              name={name}
              isOpen={isOpen}
              onToggle={toggle}
              pathname={pathname}
              onClose={closePanel}
            />
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="nav-panel-overlay-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={PANEL_TRANSITION}
                  className="overflow-hidden"
                >
                  <NavPanelContent
                    onAboutClick={onAboutClick}
                    onContactClick={onContactClick}
                    onClose={closePanel}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={["relative w-full max-w-[640px]", PANEL_SHADOW, className].join(" ")}>
      <AnimatePresence initial={false}>
        {isOpen && <NavBackdrop onClose={toggle} />}
      </AnimatePresence>
      <div className={["relative z-30", PANEL_SURFACE].join(" ")}>
        <NavPanelHeader
          name={name}
          isOpen={isOpen}
          onToggle={toggle}
          pathname={pathname}
          onClose={closePanel}
        />
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="nav-panel-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={PANEL_TRANSITION}
              className="overflow-hidden"
            >
              <NavPanelContent
                onAboutClick={onAboutClick}
                onContactClick={onContactClick}
                onClose={closePanel}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
