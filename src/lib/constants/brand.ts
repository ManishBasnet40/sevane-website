/**
 * Official Sévane Brand Copy & Content Registry
 * Sourced directly from Sévane Brand Guidelines v1.0
 */

import { PLACEHOLDER_ASSETS } from "./assets";

export const BRAND_INFO = {
  name: "Sévane",
  descriptor: "MAISON DE CRÉATIONS",
  essence: "Ritual, in bloom.",
  promise: "Skincare that is gentle, honest and beautifully made.",
  tagline: "A quiet kind of luxury.",
} as const;

export const NAV_LINKS = [
  { label: "Maison", href: "#story" },
  { label: "Rituals", href: "#rituals" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Sanctuary", href: "#sanctuary" },
  { label: "Contact", href: "#invitation" },
] as const;

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  volume: string;
  role: string;
  description: string;
  ritualStep: string;
  placeholderSrc: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "serum-eclat",
    name: "Sérum Éclat",
    category: "DAY & NIGHT RITUAL",
    volume: "30 ml",
    role: "Radiance & Botanical Hydration",
    description:
      "A featherweight botanical infusion designed to awaken natural radiance and reinforce the skin barrier with cold-extracted peony lipids.",
    ritualStep: "Warm 3–4 drops between fingertips. Press gently into clean skin.",
    placeholderSrc: PLACEHOLDER_ASSETS.products.serumEclat.src,
  },
  {
    id: "baume-de-nuit",
    name: "Baume de Nuit",
    category: "NIGHT RITUAL",
    volume: "50 ml",
    role: "Melting Peony Restorative Balm",
    description:
      "Pressed peony and oat lipids, for skin that feels calm by morning. A rich balm that melts on contact into a nourishing restorative veil.",
    ritualStep:
      "Warm a small amount between the fingertips and press into clean, dry skin. Press, don't rub.",
    placeholderSrc: PLACEHOLDER_ASSETS.products.baumeDeNuit.src,
  },
  {
    id: "creme-hydratante",
    name: "Crème Hydratante",
    category: "DAILY ESSENTIAL",
    volume: "50 ml / 1.7 fl oz",
    role: "Comforting Barrier Cream",
    description:
      "An unhurried daily hydration treatment formulated with gentle botanicals to protect against environmental dehydration without heavy residue.",
    ritualStep:
      "Smooth gently over face and neck in upward ritual strokes each morning.",
    placeholderSrc: PLACEHOLDER_ASSETS.products.cremeHydratante.src,
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "Considered",
    description:
      "Every formula, word and surface is edited down to what earns its place. Nothing superfluous, nothing decorative without intent.",
  },
  {
    number: "02",
    title: "Botanical",
    description:
      "Rooted in the flower at the heart of our mark — plant-led, never synthetic in spirit. Formulated with pure, living integrity.",
  },
  {
    number: "03",
    title: "Gentle",
    description:
      "Kind to skin, kind in tone. We never shame, rush or over-promise. Skincare conceived as reverence, not aggression.",
  },
  {
    number: "04",
    title: "Crafted",
    description:
      "A maison, not a factory. Small details are where the care shows — from tactile unglazed glass to measured botanical extractions.",
  },
] as const;
