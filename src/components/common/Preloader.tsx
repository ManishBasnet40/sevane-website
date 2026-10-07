"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { OFFICIAL_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO } from "@/lib/constants/brand";
import BrandDiamond from "../brand/BrandDiamond";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsDone(true);
        },
      });

      // Subtle initial state
      gsap.set(containerRef.current, { opacity: 1, pointerEvents: "all" });
      gsap.set(logoRef.current, { opacity: 0, y: 12 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
      gsap.set(tagRef.current, { opacity: 0, y: 8 });

      // Slow, cinematic sequence
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        delay: 0.2,
      })
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        .to(
          tagRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        // Gentle pause for brand reflection
        .to({}, { duration: 0.6 })
        // Smooth exit - trigger hero start right as dissolve starts
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: "power2.inOut",
          onStart: () => {
            onComplete?.();
          },
        });
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory px-6 select-none"
      aria-label="Sévane Introduction"
    >
      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Official Sévane Logo */}
        <div ref={logoRef} className="relative w-48 md:w-56 aspect-[2/1]">
          <Image
            src={OFFICIAL_ASSETS.logo}
            alt={BRAND_INFO.name}
            fill
            priority
            sizes="224px"
            className="object-contain"
          />
        </div>

        {/* Refined Center Divider */}
        <div
          ref={lineRef}
          className="w-32 my-5 flex items-center justify-center gap-2"
        >
          <div className="h-px w-full bg-[#B0925C]/40" />
          <BrandDiamond size={6} color="#B0925C" />
          <div className="h-px w-full bg-[#B0925C]/40" />
        </div>

        {/* Brand Essence */}
        <div ref={tagRef} className="space-y-1">
          <p className="font-editorial-italic text-stone text-base md:text-lg tracking-wide">
            {BRAND_INFO.essence}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-brand-wide text-[#8C887C] pt-1">
            PARIS · MAISON DE CRÉATIONS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
