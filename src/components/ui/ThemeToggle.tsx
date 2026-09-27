"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";

const NAV_BUTTON_SHELL =
  "flex w-full items-center rounded-[16px] p-5 text-[16px] leading-[1.2] tracking-[-0.16px]";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="8" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.25" />
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M8 1.5v1.75M8 12.75V14.5M14.5 8h-1.75M3.25 8H1.5M12.54 3.46l-1.24 1.24M4.7 11.3l-1.24 1.24M12.54 12.54l-1.24-1.24M4.7 4.7 3.46 3.46"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  return (
    <div
      className={[NAV_BUTTON_SHELL, "justify-between bg-ui-surface-subtle"].join(" ")}
    >
      <span className="text-ui-text">Theme</span>

      <div
        className="relative flex h-9 w-[72px] shrink-0 items-center rounded-full bg-ui-surface-hover p-1"
        role="group"
        aria-label="Theme"
      >
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1 flex size-7 -translate-y-1/2 items-center justify-center overflow-visible rounded-full bg-black dark:bg-white"
          animate={{ x: isDark ? 32 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {isDark ? (
            <MoonIcon className="block size-4 shrink-0 text-white dark:text-black" />
          ) : (
            <SunIcon className="block size-4 shrink-0 text-white dark:text-black" />
          )}
        </motion.div>

        <button
          type="button"
          aria-label="Light mode"
          aria-pressed={!isDark}
          onClick={() => setTheme("light")}
          className="relative z-10 flex h-7 flex-1 cursor-pointer items-center justify-center"
        >
          {isDark ? (
            <SunIcon className="block size-4 shrink-0 text-[#9a9a9a]" />
          ) : null}
        </button>

        <button
          type="button"
          aria-label="Dark mode"
          aria-pressed={isDark}
          onClick={() => setTheme("dark")}
          className="relative z-10 flex h-7 flex-1 cursor-pointer items-center justify-center"
        >
          {!isDark ? (
            <MoonIcon className="block size-4 shrink-0 text-[#9a9a9a]" />
          ) : null}
        </button>
      </div>
    </div>
  );
}
