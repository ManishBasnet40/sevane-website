/**
 * Centralized Asset Registry for Sévane Website
 *
 * Sourced editorial photography curated from Unsplash under the Unsplash License
 * (free commercial use, no attribution required, curated for Sévane art direction:
 * natural diffused daylight, delicate botanicals, soft tactile textures, ivory/stone ground).
 */

export const OFFICIAL_ASSETS = {
  logo: "/images/brand/sevane-logo.png",
  logoJpg: "/images/brand/sevane-logo.jpg",
} as const;

export interface EditorialImageAsset {
  src: string;
  alt: string;
  caption: string;
  credit?: {
    photographer: string;
    source: string;
  };
}

export const EDITORIAL_ASSETS = {
  hero: {
    stillLife: {
      src: "/images/editorial/hero-peony-still-life.jpg",
      alt: "Single pale pink peony on natural textured limestone wall in diffused daylight",
      caption: "Botanical Still Life · Pale Peony & Mineral Ground",
      credit: {
        photographer: "Unsplash Community",
        source: "Unsplash (Free License)",
      },
    },
  },
  story: {
    botanical: {
      src: "/images/editorial/story-peony-study.jpg",
      alt: "Living peony bud in mid-bloom surrounded by botanical sage leaves",
      caption: "Botanical Study · Living Peony in Bloom",
      credit: {
        photographer: "Olena Bohovyk",
        source: "Unsplash (Free License)",
      },
    },
  },
  rituals: {
    serumEclat: {
      src: "/images/placeholders/product-serum.svg",
      alt: "Sérum Éclat 30 ml bottle",
    },
    baumeDeNuit: {
      src: "/images/placeholders/product-baume.svg",
      alt: "Baume de Nuit 50 ml jar",
    },
    cremeHydratante: {
      src: "/images/placeholders/product-creme.svg",
      alt: "Crème Hydratante 50 ml jar",
    },
  },
  philosophy: {
    atelier: {
      src: "/images/placeholders/story-botanical.svg",
      alt: "Quiet formulation atelier",
      caption: "Maison Formulation Archive",
    },
  },
  sanctuary: {
    daylight: {
      src: "/images/placeholders/immersive-daylight.svg",
      alt: "Tactile unbleached linen and morning daylight",
      caption: "Diffused Daylight & Unbleached Linen",
    },
    night: {
      src: "/images/placeholders/immersive-night.svg",
      alt: "Quiet night ritual, amber shadow and stillness",
      caption: "Warm Shadow & Restorative Lipids",
    },
  },
} as const;

// Backward-compatible alias for existing sections during incremental refactor
export const PLACEHOLDER_ASSETS = {
  heroStillLife: EDITORIAL_ASSETS.hero.stillLife,
  storyBotanical: EDITORIAL_ASSETS.story.botanical,
  products: EDITORIAL_ASSETS.rituals,
  immersiveDaylight: EDITORIAL_ASSETS.sanctuary.daylight,
  immersiveNight: EDITORIAL_ASSETS.sanctuary.night,
} as const;
