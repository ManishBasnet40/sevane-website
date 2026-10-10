"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const content = contentRef.current;

    if (!section || !image || !imageInner || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageInner,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        image,
        { yPercent: 3 },
        {
          yPercent: -3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
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
      className="relative overflow-hidden bg-[#F8F8F3] py-24 text-[#30302B] sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div
            ref={contentRef}
            className="relative z-10 md:col-span-6 md:pt-6 lg:col-span-5 lg:pt-10"
          >
            <p className="mb-7 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[#B0925C] sm:text-[10px]">
              A quieter kind of skincare
            </p>

            <h2 className="max-w-[700px] font-display text-[clamp(3.8rem,7.5vw,7.8rem)] font-normal leading-[0.86] tracking-[-0.055em] text-[#30302B]">
              Caring
              <br />
              for skin
              <br />
              as a
              <br />
              <span className="font-editorial-italic text-[#8C887C]">
                ritual.
              </span>
            </h2>

            <div className="mt-10 max-w-[390px] space-y-5 sm:mt-12">
              <p className="font-sans text-[13px] leading-[1.95] text-[#68685E] sm:text-sm">
                Sévane is a skincare house built on the belief that caring for skin should feel like a ritual, not a routine.
              </p>

              <p className="font-sans text-[13px] leading-[1.95] text-[#68685E] sm:text-sm">
                Everything we make is unhurried, precise and warm — rooted in botanical matter and made with intention.
              </p>
            </div>

            <p className="mt-12 max-w-[320px] font-display text-xl italic leading-relaxed text-[#8C887C] sm:mt-16 sm:text-2xl">
              Considered in every detail. Gentle by nature.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden bg-[#E7DCC6]"
            >
              <div
                ref={imageInnerRef}
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src="/images/brand/morining.jpg"
                  alt="Sévane botanical still life"
                  fill
                  sizes="(max-width: 767px) 90vw, (max-width: 1023px) 48vw, 44vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}