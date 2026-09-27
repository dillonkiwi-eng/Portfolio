"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLenisInstance } from "@/components/smooth-scroll-provider";

export function ScrollToTopOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenisInstance();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
