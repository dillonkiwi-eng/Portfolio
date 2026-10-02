import type { Metadata } from "next";
import { AppProviders } from "@/components/app-providers";
import { ThemeScript } from "@/components/theme-script";
import { FAVICON_DARK, FAVICON_LIGHT } from "@/lib/favicon";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dillon Ramesh",
    template: "%s · Dillon Ramesh",
  },
  description: "Senior Product Designer — London",
  icons: {
    icon: [
      { url: FAVICON_LIGHT, media: "(prefers-color-scheme: light)" },
      { url: FAVICON_DARK, media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
