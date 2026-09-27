"use client";

import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ScrollToTopOnNavigate } from "@/components/scroll-to-top-on-navigate";
import { ThemeProvider } from "@/lib/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <ScrollToTopOnNavigate />
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
