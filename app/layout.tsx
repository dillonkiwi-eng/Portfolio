import type { Metadata } from "next";
import { AppProviders } from "@/components/app-providers";
import { ThemeScript } from "@/components/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dillon Ramesh",
    template: "%s · Dillon Ramesh",
  },
  description: "Senior Product Designer — London",
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
