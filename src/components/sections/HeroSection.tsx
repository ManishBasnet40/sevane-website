"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { EDITORIAL_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO } from "@/lib/constants/brand";

interface HeroSectionProps {
  isLoaded?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isLoaded = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isLoaded) {
        gsap.set(
          [
            labelRef.current,
            titleRef.current,
            textRef.current,
            actionRef.current,
            imageRef.current,
          ],
          {
            opacity: 0,
          }
        );

        gsap.set(titleRef.current, {
          y: 35,
        });

        gsap.set(
          [
            labelRef.current,
            textRef.current,
            actionRef.current,
          ],
          {
            y: 18,
          }
        );

        gsap.set(imageRef.current, {
          y: 30,
        });

        gsap.set(imageInnerRef.current, {
          scale: 1.06,
        });

        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        gsap.set(
          [
            labelRef.current,
            titleRef.current,
            textRef.current,
            actionRef.current,
            imageRef.current,
          ],
          {
            clearProps: "all",
          }
        );

        gsap.set(imageInnerRef.current, {
          clearProps: "all",
        });

        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          "-=0.4"
        )
        .to(
          actionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.4"
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          imageInnerRef.current,
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1"
        );

      if (sectionRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
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
      className="relative overflow-hidden bg-ivory px-6 py-24 text-ink sm:px-10 sm:py-28 md:px-14 md:py-32 lg:px-20 lg:py-36"
      aria-label="Sévane Introduction"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:gap-20 lg:grid-cols-[1fr_0.85fr] lg:gap-24 xl:gap-32">
        <div className="max-w-2xl">
          <span
            ref={labelRef}
            className="block font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-gold"
          >
            The Sévane Philosophy
          </span>

          <h2
            ref={titleRef}
            className="mt-7 font-display text-[3.5rem] font-medium leading-[0.88] tracking-[-0.05em] text-ink sm:text-[4.7rem] md:text-[5.4rem] lg:text-[5.8rem] xl:text-[6.8rem]"
          >
            A quiet
            <br />
            approach to
            <br />
            <span className="font-editorial-italic">
              beauty.
            </span>
          </h2>

          <p
            ref={textRef}
            className="mt-8 max-w-md font-editorial-italic text-lg leading-[1.55] text-ink/70 sm:mt-10 sm:text-xl"
          >
            {BRAND_INFO.promise}
          </p>

          <div
            ref={actionRef}
            className="mt-9 sm:mt-11"
          >
            <Link
              href="#story"
              className="group inline-flex items-center gap-4 font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:text-gold"
            >
              <span>Discover Our Story</span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <div
              ref={imageInnerRef}
              className="relative h-full w-full will-change-transform"
            >
              <Image
                src={EDITORIAL_ASSETS.hero.stillLife.src}
                alt={EDITORIAL_ASSETS.hero.stillLife.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 470px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;