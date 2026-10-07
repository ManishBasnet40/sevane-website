"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PLACEHOLDER_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO } from "@/lib/constants/brand";
import BrandDiamond from "../brand/BrandDiamond";
import HairlineRule from "../common/HairlineRule";

export const SanctuarySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop Pinning & Crossfade (min-width: 769px)
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=160%",
            pin: pinWrapRef.current,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // Slide 1 stays, then transitions smoothly to Slide 2
        tl.to(slide1Ref.current, {
          opacity: 0,
          y: -24,
          duration: 1,
          ease: "power2.inOut",
        }).fromTo(
          slide2Ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
          "-=0.4"
        );
      });

      // Mobile Unpinned Sequential Flow (max-width: 768px)
      mm.add("(max-width: 768px)", () => {
        if (slide1Ref.current) {
          gsap.from(slide1Ref.current, {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide1Ref.current,
              start: "top 85%",
              once: true,
            },
          });
        }

        if (slide2Ref.current) {
          gsap.from(slide2Ref.current, {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide2Ref.current,
              start: "top 85%",
              once: true,
            },
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="sanctuary"
      ref={containerRef}
      className="relative bg-ink text-ivory overflow-hidden"
    >
      <div
        ref={pinWrapRef}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 py-20 md:py-24 max-w-7xl mx-auto"
      >
        {/* Container: Relative flex-col on mobile (stacked), pinned container on desktop */}
        <div className="relative w-full flex flex-col md:block items-center justify-center">
          {/* Slide 1: The Daytime Bloom */}
          <div
            ref={slide1Ref}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
          >
            <div className="lg:col-span-6 space-y-5 md:space-y-6">
              <div className="flex items-center gap-2.5">
                <BrandDiamond size={6} color="#B0925C" />
                <span className="font-sans text-[11px] uppercase tracking-brand-wide text-gold">
                  The Botanical Sanctuary
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ivory font-medium leading-[1.12]">
                {BRAND_INFO.essence}
              </h2>

              <p className="font-editorial-italic text-base sm:text-lg lg:text-xl text-ivory/80 leading-relaxed max-w-lg">
                Where unhurried craftsmanship meets living botanical matter. Every
                drop is an ode to skin in balance.
              </p>

              <div className="pt-2">
                <span className="font-sans text-[10px] uppercase tracking-brand-wide text-stone">
                  Diffuse daylight · Tactile linen · Pure extracts
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border border-gold/30 bg-ink/80">
              <Image
                src={PLACEHOLDER_ASSETS.immersiveDaylight.src}
                alt={PLACEHOLDER_ASSETS.immersiveDaylight.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-ink/90 px-2.5 py-1 text-[9px] font-sans uppercase tracking-brand-wide text-gold">
                Slot: Morning Light
              </div>
            </div>
          </div>

          {/* Mobile Divider Between Stacked Slides */}
          <div className="w-full my-16 md:hidden">
            <HairlineRule withDiamond={true} color="gold" />
          </div>

          {/* Slide 2: The Night Restorative Veil */}
          {/* On mobile: relative in normal document flow. On desktop: absolute inset-0 driven by pinning */}
          <div
            ref={slide2Ref}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative md:absolute md:inset-0 md:opacity-0 z-20"
          >
            <div className="lg:col-span-6 space-y-5 md:space-y-6">
              <div className="flex items-center gap-2.5">
                <BrandDiamond size={6} color="#B0925C" />
                <span className="font-sans text-[11px] uppercase tracking-brand-wide text-gold">
                  The Evening Stillness
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ivory font-medium leading-[1.12]">
                Skin, at rest.
              </h2>

              <p className="font-editorial-italic text-base sm:text-lg lg:text-xl text-ivory/80 leading-relaxed max-w-lg">
                In the quietest moments, your truest ritual begins. Take your time:
                the texture turns from balm to oil as it meets the warmth of your hands.
              </p>

              <div className="pt-2">
                <span className="font-sans text-[10px] uppercase tracking-brand-wide text-stone">
                  Warm shadow · Restorative lipids · Unbroken calm
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden border border-gold/30 bg-ink/80">
              <Image
                src={PLACEHOLDER_ASSETS.immersiveNight.src}
                alt={PLACEHOLDER_ASSETS.immersiveNight.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-ink/90 px-2.5 py-1 text-[9px] font-sans uppercase tracking-brand-wide text-gold">
                Slot: Evening Ritual
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuarySection;
