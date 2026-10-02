"use client";

import { useEffect } from "react";
import { faviconHrefForTheme } from "@/lib/favicon";
import { useTheme } from "@/lib/theme-provider";

function ensureFaviconLink() {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-app-favicon]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.setAttribute("data-app-favicon", "");
    document.head.appendChild(link);
  }
  return link;
}

export function FaviconTheme() {
  const { theme } = useTheme();

  useEffect(() => {
    ensureFaviconLink().href = faviconHrefForTheme(theme);
  }, [theme]);

  return null;
}
