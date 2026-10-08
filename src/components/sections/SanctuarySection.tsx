"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BRAND_INFO } from "@/lib/constants/brand";
import BrandDiamond from "../brand/BrandDiamond";

export const SanctuarySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (
          !containerRef.current ||
          !pinWrapRef.current ||
          !slide1Ref.current ||
          !slide2Ref.current ||
          !video1Ref.current ||
          !video2Ref.current ||
          !text1Ref.current ||
          !text2Ref.current
        ) {
          return;
        }

        gsap.set(slide2Ref.current, {
          opacity: 0,
        });

        gsap.set(video1Ref.current, {
          scale: 1.04,
        });

        gsap.set(video2Ref.current, {
          scale: 1.08,
        });

        gsap.set(text1Ref.current, {
          x: 0,
          opacity: 1,
        });

        gsap.set(text2Ref.current, {
          x: 50,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=190%",
            pin: pinWrapRef.current,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(video1Ref.current, {
          scale: 1,
          duration: 1,
          ease: "none",
        })
          .to(
            text1Ref.current,
            {
              x: -70,
              opacity: 0,
              duration: 0.9,
              ease: "power2.inOut",
            },
            "-=0.55"
          )
          .to(
            slide1Ref.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.7"
          )
          .fromTo(
            slide2Ref.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.7,
              ease: "power2.inOut",
            },
            "-=0.25"
          )
          .to(
            video2Ref.current,
            {
              scale: 1,
              duration: 1.1,
              ease: "none",
            },
            "<"
          )
          .to(
            text2Ref.current,
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.7"
          );
      });

      mm.add("(max-width: 768px)", () => {
        if (slide1Ref.current) {
          gsap.from(slide1Ref.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slide1Ref.current,
              start: "top 82%",
              once: true,
            },
          });
        }

        if (slide2Ref.current) {
          gsap.from(slide2Ref.current, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slide2Ref.current,
              start: "top 82%",
              once: true,
            },
          });
        }
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      id="sanctuary"
      ref={containerRef}
      className="relative overflow-hidden bg-ink text-ivory"
    >
      <div
        ref={pinWrapRef}
        className="relative mx-auto flex min-h-screen w-full max-w-[1800px] items-center px-6 py-20 sm:px-10 md:px-14 lg:px-20 xl:px-24"
      >
        <div className="relative flex min-h-[620px] w-full items-center">
          <div
            ref={slide1Ref}
            className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 xl:gap-24"
          >
            <div
              ref={text1Ref}
              className="max-w-xl lg:pl-4"
            >
              <div className="mb-7 flex items-center gap-3">
                <BrandDiamond size={6} color="#B0925C" />

                <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
                  The Botanical Sanctuary
                </span>
              </div>

              <h2 className="max-w-[650px] font-display text-[clamp(3rem,5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.045em] text-ivory">
                {BRAND_INFO.essence}
              </h2>

              <p className="mt-8 max-w-lg font-editorial-italic text-lg leading-[1.45] text-ivory/70 md:text-xl">
                Where unhurried craftsmanship meets living botanical matter. Every
                drop is an ode to skin in balance.
              </p>

              <p className="mt-8 font-sans text-[8px] font-medium uppercase tracking-[0.28em] text-stone/70">
                Diffuse daylight · Tactile linen · Pure extracts
              </p>
            </div>

            <div className="relative h-[55vh] min-h-[460px] overflow-hidden lg:h-[68vh] lg:min-h-[560px]">
              <video
                ref={video1Ref}
                src="/images/video/morning.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover will-change-transform"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/[0.04]" />
            </div>
          </div>

          <div
            ref={slide2Ref}
            className="absolute inset-0 z-20 grid w-full items-center gap-10 lg:grid-cols-[1.22fr_0.78fr] lg:gap-16 xl:gap-24"
          >
            <div className="relative order-2 h-[55vh] min-h-[460px] overflow-hidden lg:order-1 lg:h-[68vh] lg:min-h-[560px]">
              <video
                ref={video2Ref}
                src="/images/video/night.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover will-change-transform"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />
            </div>

            <div
              ref={text2Ref}
              className="order-1 max-w-xl lg:order-2 lg:pr-4"
            >
              <div className="mb-7 flex items-center gap-3">
                <BrandDiamond size={6} color="#B0925C" />

                <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-gold">
                  The Evening Stillness
                </span>
              </div>

              <h2 className="max-w-[600px] font-display text-[clamp(3rem,5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.045em] text-ivory">
                Skin, at rest.
              </h2>

              <p className="mt-8 max-w-lg font-editorial-italic text-lg leading-[1.45] text-ivory/70 md:text-xl">
                In the quietest moments, your truest ritual begins. Take your time:
                the texture turns from balm to oil as it meets the warmth of your hands.
              </p>

              <p className="mt-8 font-sans text-[8px] font-medium uppercase tracking-[0.28em] text-stone/70">
                Warm shadow · Restorative lipids · Unbroken calm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuarySection;