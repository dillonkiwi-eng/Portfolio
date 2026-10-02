export const FAVICON_LIGHT = "/assets/favicon/icon-light.png";
export const FAVICON_DARK = "/assets/favicon/icon-dark.png";

export type FaviconTheme = "light" | "dark";

export function faviconHrefForTheme(theme: FaviconTheme) {
  return theme === "dark" ? FAVICON_DARK : FAVICON_LIGHT;
}
