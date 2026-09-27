export const ABOUT_ASSET_BASE = "/assets/about/about%20us";

export const aboutImages = {
  hero: { src: `${ABOUT_ASSET_BASE}/about-us-hero.png`, width: 2796, height: 1500 },
  pair: [
    { src: `${ABOUT_ASSET_BASE}/about-us-image.png`, width: 1374, height: 1500 },
    { src: `${ABOUT_ASSET_BASE}/about-us-image-02.png`, width: 1374, height: 1500 },
  ],
} as const;

/** @deprecated use aboutImages.hero.src */
export const ABOUT_HERO_IMAGE = aboutImages.hero.src;

export const aboutContent = {
  experience: {
    heading: "Experience",
    body: "Product Designer with 8+ years of experience. Originally from New Zealand, shaped by time in London. Currently at &above, designing for AI and building products used by millions.",
  },
  offline: {
    heading: "Offline",
    body: "When I'm not designing, i'm kickboxing, hoarding vinyl, pretending to be a photographer, or hunting down the best Vietnamese spot (Tough job, someone's gotta do it)",
  },
} as const;
