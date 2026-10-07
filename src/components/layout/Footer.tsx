import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OFFICIAL_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO, NAV_LINKS, PRODUCTS } from "@/lib/constants/brand";
import BrandDiamond from "../brand/BrandDiamond";
import HairlineRule from "../common/HairlineRule";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ivory text-ink border-t border-stone/20 pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-36 md:w-44 h-14 md:h-16">
              <Image
                src={OFFICIAL_ASSETS.logo}
                alt={BRAND_INFO.name}
                fill
                sizes="(max-width: 768px) 144px, 176px"
                className="object-contain object-left"
              />
            </div>

            <p className="font-editorial-italic text-base sm:text-lg text-ink/80 max-w-sm leading-relaxed">
              {BRAND_INFO.essence}
            </p>

            <p className="font-sans text-xs text-stone max-w-sm leading-relaxed">
              A skincare house built on the belief that caring for skin should feel
              like an unhurried ritual, not a routine.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <BrandDiamond size={6} color="#B0925C" />
              <span className="font-sans text-[10px] uppercase tracking-brand-wide text-stone">
                Maison de Créations · Paris
              </span>
            </div>
          </div>

          {/* Links Column 1: Rituals (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-sans text-[11px] uppercase tracking-brand-wide text-ink font-medium">
              Creations
            </h4>
            <ul className="space-y-2.5">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href="#rituals"
                    className="font-sans text-xs text-stone hover:text-gold transition-colors duration-200"
                  >
                    {prod.name} ({prod.volume})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-[11px] uppercase tracking-brand-wide text-ink font-medium">
              The Maison
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-stone hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3: Inquiries (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-sans text-[11px] uppercase tracking-brand-wide text-ink font-medium">
              Correspondence
            </h4>
            <ul className="space-y-2.5 text-xs text-stone">
              <li>
                <span className="block text-ink/70">Maison Inquiries:</span>
                <span className="text-stone">contact@sevane.com</span>
              </li>
              <li>
                <span className="block text-ink/70">Private Salon:</span>
                <span className="text-stone">salon@sevane.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hairline Divider with Diamond */}
        <HairlineRule withDiamond={true} color="gold" className="my-8" />

        {/* Bottom Legal / Copyright Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-sans text-[11px] text-stone">
            © {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.
          </p>

          <p className="font-editorial-italic text-xs text-stone">
            {BRAND_INFO.promise}
          </p>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-brand-wide text-stone">
            <span>Terms</span>
            <span>·</span>
            <span>Privacy</span>
            <span>·</span>
            <span>Maison Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
