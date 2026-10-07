"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { OFFICIAL_ASSETS } from "@/lib/constants/assets";
import GoldRule from "../ui/GoldRule";

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;

    if (!section || !image || !imageInner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        {
          yPercent: 10,
        },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        imageInner,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F8F3] py-32 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5 md:pt-20">
          <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8C887C]">
            01 — The House
          </p>

          <h2 className="mt-8 font-display text-6xl leading-[0.9] tracking-[-0.04em] text-[#30302B] md:text-8xl">
            Caring for
            <br />
            skin as a
            <br />
            <span className="font-editorial-italic">
              ritual.
            </span>
          </h2>

          <GoldRule className="mt-10" />

          <p className="mt-10 max-w-md font-sans text-sm leading-7 text-[#8C887C]">
            Sévane is a skincare house built on the belief
            that caring for skin should feel like a ritual,
            not a routine.
          </p>

          <p className="mt-5 max-w-md font-sans text-sm leading-7 text-[#8C887C]">
            Everything we make is unhurried, precise and
            warm — rooted in botanical matter and made
            with intention.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <div
              ref={imageInnerRef}
              className="absolute inset-0"
            >
              {/* <Image
                src={OFFICIAL_ASSETS.editorial.story}
                alt="Sévane botanical still life"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              /> */}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#8C887C]">
              Botanical study
            </span>

            <span className="font-sans text-[8px] uppercase tracking-[0.24em] text-[#8C887C]">
              01 / 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}