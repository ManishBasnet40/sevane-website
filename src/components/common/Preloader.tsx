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

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const [isDone, setIsDone] = useState(false);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !logoRef.current ||
        !lineRef.current ||
        !tagRef.current
      ) {
        return;
      }

      const container = containerRef.current;
      const logo = logoRef.current;
      const line = lineRef.current;
      const tag = tagRef.current;

      const ctx = gsap.context(() => {
        gsap.set(container, {
          opacity: 1,
          pointerEvents: "auto",
        });

        gsap.set(logo, {
          opacity: 0,
          y: 16,
        });

        gsap.set(line, {
          scaleX: 0,
          transformOrigin: "center center",
        });

        gsap.set(tag, {
          opacity: 0,
          y: 10,
        });

        const tl = gsap.timeline();

        tl.to(logo, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.25,
          ease: "power3.out",
        })
          .to(
            line,
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.inOut",
            },
            "-=0.55"
          )
          .to(
            tag,
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to({}, {
            duration: 0.8,
          })
          .to(container, {
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              setIsDone(true);
              onComplete?.();
            },
          });
      }, containerRef);

      return () => {
        ctx.revert();
      };
    },
    {
      scope: containerRef,
    }
  );

  if (isDone) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex select-none items-center justify-center bg-ivory px-6"
      aria-label="Sévane Introduction"
      role="status"
    >
      <div className="flex max-w-sm flex-col items-center text-center">
        <div
          ref={logoRef}
          className="relative aspect-[2/1] w-48 md:w-56"
        >
          <Image
            src={OFFICIAL_ASSETS.logo}
            alt={BRAND_INFO.name}
            fill
            priority
            sizes="224px"
            className="object-contain"
          />
        </div>

        <div
          ref={lineRef}
          className="my-5 flex w-32 items-center justify-center gap-2"
        >
          <div className="h-px w-full bg-[#B0925C]/40" />

          <BrandDiamond
            size={6}
            color="#B0925C"
          />

          <div className="h-px w-full bg-[#B0925C]/40" />
        </div>

        <div
          ref={tagRef}
          className="space-y-1"
        >
          <p className="font-editorial-italic text-base tracking-wide text-stone md:text-lg">
            {BRAND_INFO.essence}
          </p>

          <p className="pt-1 font-sans text-[10px] uppercase tracking-brand-wide text-[#8C887C]">
            PARIS · MAISON DE CRÉATIONS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;