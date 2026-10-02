"use client";

import { FaviconTheme } from "@/components/favicon-theme";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ScrollToTopOnNavigate } from "@/components/scroll-to-top-on-navigate";
import { ThemeProvider } from "@/lib/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FaviconTheme />
      <SmoothScrollProvider>
        <ScrollToTopOnNavigate />
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
