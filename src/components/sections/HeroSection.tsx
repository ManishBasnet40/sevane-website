"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { EDITORIAL_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO } from "@/lib/constants/brand";
import BrandDiamond from "../brand/BrandDiamond";

interface HeroSectionProps {
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Folio header elements
  const topFolioRef = useRef<HTMLDivElement>(null);
  const bgNumberRef = useRef<HTMLDivElement>(null);

  // Typography elements
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const lineThreeRef = useRef<HTMLSpanElement>(null);

  // Content & Action elements
  const promiseRef = useRef<HTMLParagraphElement>(null);
  const goldRuleRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const metaNotesRef = useRef<HTMLDivElement>(null);

  // Image & Visual framing elements
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const imageCaptionRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);

  // Marginal footer indicators
  const bottomMarginalsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial hidden state while preloader is active
      if (!isLoaded) {
        gsap.set(
          [
            topFolioRef.current,
            bgNumberRef.current,
            eyebrowRef.current,
            promiseRef.current,
            actionsRef.current,
            metaNotesRef.current,
            imageFrameRef.current,
            imageCaptionRef.current,
            floatingBadgeRef.current,
            bottomMarginalsRef.current,
            scrollIndicatorRef.current,
          ],
          {
            opacity: 0,
          }
        );

        gsap.set(
          [lineOneRef.current, lineTwoRef.current, lineThreeRef.current],
          {
            yPercent: 120,
          }
        );

        gsap.set(goldRuleRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        gsap.set(imageFrameRef.current, {
          clipPath: "inset(0% 0% 100% 0%)",
        });

        gsap.set(imageInnerRef.current, {
          scale: 1.15,
        });

        return;
      }

      // 2. Reduced Motion check for accessibility
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        gsap.set(
          [
            topFolioRef.current,
            bgNumberRef.current,
            eyebrowRef.current,
            titleRef.current,
            promiseRef.current,
            actionsRef.current,
            metaNotesRef.current,
            imageFrameRef.current,
            imageCaptionRef.current,
            floatingBadgeRef.current,
            bottomMarginalsRef.current,
            scrollIndicatorRef.current,
          ],
          {
            clearProps: "all",
            opacity: 1,
          }
        );

        gsap.set(
          [lineOneRef.current, lineTwoRef.current, lineThreeRef.current],
          {
            clearProps: "all",
            yPercent: 0,
          }
        );

        gsap.set([goldRuleRef.current, imageInnerRef.current], {
          clearProps: "all",
        });

        return;
      }

      /*
       * ==========================================================
       * EDITORIAL ENTRANCE CHOREOGRAPHY
       * Staggered, calm and intentional reveal
       * ==========================================================
       */
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Background chapter number drifts into subtle visibility
      tl.fromTo(
        bgNumberRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
      )
        // Top Folio header details
        .fromTo(
          topFolioRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=1.1"
        )
        // Eyebrow label
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.6"
        )
        // Headline line-by-line reveal through masks
        .to(
          lineOneRef.current,
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .to(
          lineTwoRef.current,
          {
            yPercent: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.85"
        )
        .to(
          lineThreeRef.current,
          {
            yPercent: 0,
            duration: 1.15,
            ease: "power4.out",
          },
          "-=0.85"
        )
        // Photography unmasks via clip-path bloom
        .fromTo(
          imageFrameRef.current,
          {
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power4.inOut",
          },
          "-=1.1"
        )
        // Image counter-scale settling
        .fromTo(
          imageInnerRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 1.8, ease: "power3.out" },
          "-=1.4"
        )
        // Floating botanical badge
        .fromTo(
          floatingBadgeRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
          "-=0.9"
        )
        // Image caption badge
        .fromTo(
          imageCaptionRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.7"
        )
        // Brand Promise text
        .fromTo(
          promiseRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        // Gold hairline rule draws across
        .to(
          goldRuleRef.current,
          {
            scaleX: 1,
            duration: 0.85,
            ease: "power3.inOut",
          },
          "-=0.65"
        )
        // CTAs & Actions
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.55"
        )
        // Marginal notes & specifications
        .fromTo(
          metaNotesRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.75 },
          "-=0.4"
        )
        // Bottom marginal indicators & scroll line
        .fromTo(
          [bottomMarginalsRef.current, scrollIndicatorRef.current],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 },
          "-=0.3"
        );

      /*
       * ==========================================================
       * SCROLL-DRIVEN PARALLAX (Subtle, Layered & Calm)
       * ==========================================================
       */
      if (sectionRef.current) {
        // Photography drifts downwards smoothly
        gsap.to(imageInnerRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        // Headline breathes upward slightly
        gsap.to(titleRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        // Floating botanical badge drifts with independent depth
        gsap.to(floatingBadgeRef.current, {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Large folio watermark moves softly
        gsap.to(bgNumberRef.current, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }
    },
    {
      scope: sectionRef,
      dependencies: [isLoaded],
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-ivory text-ink selection:bg-gold/20 pt-18 sm:pt-22 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col justify-between"
      aria-label="Sévane Hero Introduction"
    >
      {/* ========================================================
          BACKGROUND WATERMARK FOLIO (Chapter 01)
          ======================================================== */}
      <div
        ref={bgNumberRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 sm:right-10 lg:right-16 top-[10%] select-none font-display text-[15rem] sm:text-[20rem] lg:text-[25rem] font-medium leading-none tracking-[-0.08em] text-ink/[0.025]"
      >
        01
      </div>

      <div>
        {/* ========================================================
            TOP EDITORIAL MARGIN / FOLIO HEADER
            ======================================================== */}
        <div
          ref={topFolioRef}
          className="relative z-20 max-w-7xl mx-auto flex items-center justify-between border-b border-stone/15 pb-2.5 sm:pb-3 mb-4 sm:mb-6 lg:mb-6"
        >
          {/* Folio left */}
          <div className="flex items-center gap-3">
            <BrandDiamond size={6} color="#B0925C" />
            <span className="font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.28em] text-stone">
              {BRAND_INFO.descriptor} · PARIS
            </span>
          </div>

          {/* Folio right (Maison coordinates & edition index) */}
          <div className="hidden sm:flex items-center gap-6 text-stone/80">
            <span className="font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.24em]">
              FOLIO 01 · INITIATION
            </span>
            <span className="h-px w-8 bg-stone/25" />
            <span className="font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.24em] text-gold">
              EST. 2026
            </span>
          </div>
        </div>

        {/* ========================================================
            MAIN EDITORIAL CANVAS
            Desktop: 12-column asymmetrical overlapping composition
            Mobile: Sequential, unhurried, natural reading flow
            ======================================================== */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-10 xl:gap-x-12 items-center">
            {/* ======================================================
                LEFT PLANE: MONUMENTAL TYPOGRAPHY & MANIFESTO
                (Spans 12 cols on mobile, 7 cols on lg)
                ====================================================== */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center z-20">
              {/* Editorial Eyebrow */}
              <div
                ref={eyebrowRef}
                className="flex items-center gap-3 mb-2.5 sm:mb-3"
              >
                <span className="font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.28em] text-gold">
                  Collection Botanique
                </span>
                <span className="h-px w-6 sm:w-8 bg-gold/50" />
                <span className="font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.25em] text-stone">
                  Chapitre Premier
                </span>
              </div>

              {/* Monumental Headline */}
              <h1
                ref={titleRef}
                className="font-display font-medium text-ink leading-[0.88] tracking-[-0.04em] text-[3.1rem] sm:text-[4.2rem] md:text-[4.9rem] lg:text-[5.4rem] xl:text-[6.1rem]"
              >
                <span className="block overflow-hidden">
                  <span
                    ref={lineOneRef}
                    className="block will-change-transform"
                  >
                    A quiet
                  </span>
                </span>

                <span className="block overflow-hidden">
                  <span
                    ref={lineTwoRef}
                    className="block will-change-transform pl-[6%] sm:pl-[10%] lg:pl-[12%]"
                  >
                    kind of
                  </span>
                </span>

                <span className="block overflow-hidden">
                  <span
                    ref={lineThreeRef}
                    className="block font-editorial-italic font-medium will-change-transform pl-[12%] sm:pl-[20%] lg:pl-[24%] text-ink/95"
                  >
                    luxury.
                  </span>
                </span>
              </h1>

              {/* Brand Promise & Narrative Balancer */}
              <div className="mt-5 sm:mt-6 lg:mt-6 max-w-xl">
                <p
                  ref={promiseRef}
                  className="font-editorial-italic text-lg sm:text-xl lg:text-[1.3rem] leading-[1.45] text-ink/80"
                >
                  {BRAND_INFO.promise}
                </p>

                {/* Animated Gold Rule */}
                <div className="mt-3.5 sm:mt-4 flex items-center gap-3">
                  <div
                    ref={goldRuleRef}
                    className="h-px w-20 sm:w-28 bg-gold will-change-transform"
                  />
                  <BrandDiamond size={5} color="#B0925C" />
                </div>

                {/* Action Buttons */}
                <div
                  ref={actionsRef}
                  className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-6 sm:gap-x-7 gap-y-3"
                >
                  <Link
                    href="#rituals"
                    className="group inline-flex items-center gap-3.5 bg-ink px-6 sm:px-7 py-3 font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.25em] text-ivory transition-all duration-500 hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <span>Explore The Rituals</span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-gold transition-colors duration-500 group-hover:bg-ink"
                    />
                  </Link>

                  <Link
                    href="#story"
                    className="group relative py-2 font-sans text-[8px] sm:text-[8.5px] font-medium uppercase tracking-[0.25em] text-ink/75 transition-colors duration-300 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <span>The Maison Story</span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </Link>
                </div>

                {/* Subtle Atelier Specifications / Micro-metadata */}
                <div
                  ref={metaNotesRef}
                  className="mt-5 sm:mt-6 pt-3.5 border-t border-stone/15 flex flex-wrap items-center gap-x-6 gap-y-1 text-[7.5px] sm:text-[8px] font-sans font-medium uppercase tracking-[0.24em] text-stone"
                >
                  <span>01 · Extrait De Pivoine</span>
                  <span>·</span>
                  <span>02 · Lipides D&apos;Avoine</span>
                  <span>·</span>
                  <span>03 · Façonné En France</span>
                </div>
              </div>
            </div>

            {/* ======================================================
                RIGHT PLANE: EDITORIAL PHOTOGRAPHY & VISUAL DEPTH
                (Spans 12 cols on mobile, 5 cols on lg)
                Features real botanical still-life under diffused natural daylight
                ====================================================== */}
            <div className="lg:col-span-5 xl:col-span-5 relative mt-4 lg:mt-0 z-10 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[390px] xl:max-w-[420px]">
                {/* Main Framed Photograph */}
                <div
                  ref={imageFrameRef}
                  className="relative aspect-[3/4] w-full overflow-hidden border border-stone/20 bg-ivory shadow-xs will-change-clip"
                >
                  <div
                    ref={imageInnerRef}
                    className="relative h-full w-full will-change-transform"
                  >
                    <Image
                      src={EDITORIAL_ASSETS.hero.stillLife.src}
                      alt={EDITORIAL_ASSETS.hero.stillLife.alt}
                      fill
                      priority
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 350px, 420px"
                      className="object-cover object-center"
                    />

                    {/* Refined inner hairline border */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-3 sm:inset-4 border border-ivory/50"
                    />

                    {/* Folio registration stamp */}
                    <div
                      aria-hidden="true"
                      className="absolute top-3.5 right-3.5 flex items-center gap-1.5 bg-ivory/85 backdrop-blur-xs px-2.5 py-1"
                    >
                      <BrandDiamond size={4} color="#B0925C" />
                      <span className="font-sans text-[7.5px] font-medium uppercase tracking-[0.22em] text-ink">
                        FIG. 01
                      </span>
                    </div>
                  </div>

                  {/* Bottom Caption Pill */}
                  <div
                    ref={imageCaptionRef}
                    className="absolute bottom-0 left-0 right-0 bg-ivory/92 backdrop-blur-sm border-t border-stone/15 px-3.5 sm:px-4 py-2.5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <BrandDiamond size={4} color="#B0925C" />
                      <span className="font-sans text-[7.5px] sm:text-[8px] font-medium uppercase tracking-[0.22em] text-stone">
                        {EDITORIAL_ASSETS.hero.stillLife.caption}
                      </span>
                    </div>

                    <span className="font-sans text-[7.5px] font-medium uppercase tracking-[0.2em] text-gold hidden sm:inline">
                      NATURAL LIGHT
                    </span>
                  </div>
                </div>

                {/* Floating Botanical Essence Seal (Desktop Layered Accent) */}
                <div
                  ref={floatingBadgeRef}
                  aria-hidden="true"
                  className="hidden lg:flex absolute -left-9 bottom-10 z-30 bg-ivory border border-stone/20 p-3.5 shadow-sm max-w-[180px] flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[7px] font-medium uppercase tracking-[0.26em] text-gold">
                      MAISON ESSENCE
                    </span>
                    <BrandDiamond size={4} color="#B0925C" />
                  </div>
                  <p className="font-editorial-italic text-[13px] text-ink/85 leading-snug">
                    &ldquo;{BRAND_INFO.essence}&rdquo;
                  </p>
                  <div className="h-px w-6 bg-stone/25 mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          BOTTOM MARGINALIA & SCROLL CHOREOGRAPHY
          ======================================================== */}
      <div className="relative max-w-7xl w-full mx-auto mt-6 sm:mt-8 lg:mt-8 pt-3 border-t border-stone/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left marginal: Botanical statement */}
        <div
          ref={bottomMarginalsRef}
          className="order-2 sm:order-1 flex items-center gap-4 text-stone/80 text-[7.5px] sm:text-[8px] font-sans font-medium uppercase tracking-[0.26em]"
        >
          <span>100% BOTANICAL INTEGRITY</span>
          <span className="h-px w-5 bg-stone/25" />
          <span>PARIS · BORDEAUX</span>
        </div>

        {/* Center: Scroll down indicator with animated gold hairline */}
        <div
          ref={scrollIndicatorRef}
          className="order-1 sm:order-2 flex flex-col items-center gap-1.5 select-none"
        >
          <span className="font-sans text-[7px] sm:text-[7.5px] font-medium uppercase tracking-[0.3em] text-stone/90">
            Scroll to Begin
          </span>
          <div className="relative h-7 w-px overflow-hidden bg-stone/25">
            <div className="hero-scroll-line absolute left-0 top-0 h-1/2 w-full bg-gold" />
          </div>
        </div>

        {/* Right marginal: Coordinates */}
        <div className="order-3 hidden sm:flex items-center gap-3 text-stone/80 text-[7.5px] sm:text-[8px] font-sans font-medium uppercase tracking-[0.24em]">
          <span>48°51&apos;24&quot; N · 2°21&apos;07&quot; E</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;