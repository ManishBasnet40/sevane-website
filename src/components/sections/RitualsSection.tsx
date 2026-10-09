"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PRODUCTS } from "@/lib/constants/brand";

const BACKGROUND_COLOR = "#F8F8F3";
const products = PRODUCTS.slice(0, 3);

export default function RitualsSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const backgroundRefs = useRef<(HTMLDivElement | null)[]>([]);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const previewRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const stage = stageRef.current;
      const track = trackRef.current;

      if (!container || !stage || !track || products.length === 0) return;

      const slides = productRefs.current.slice(0, products.length);
      const bottles = bottleRefs.current.slice(0, products.length);
      const textBlocks = textRefs.current.slice(0, products.length);
      const previews = previewRefs.current.slice(0, products.length);
      const backgrounds = backgroundRefs.current
        .slice(0, products.length)
        .filter((element): element is HTMLDivElement => element !== null);

      if (
        slides.some((element) => !element) ||
        bottles.some((element) => !element) ||
        textBlocks.some((element) => !element)
      ) {
        return;
      }

      const validSlides = slides as HTMLDivElement[];
      const validBottles = bottles as HTMLDivElement[];
      const validTextBlocks = textBlocks as HTMLElement[];

      let slideWidth = stage.clientWidth;
      let currentIndex = 0;

      const updateNavigation = (index: number) => {
        const safeIndex = gsap.utils.clamp(0, products.length - 1, index);

        if (indicatorRef.current) {
          indicatorRef.current.textContent = String(safeIndex + 1).padStart(
            2,
            "0"
          );
        }

        previews.forEach((preview, previewIndex) => {
          if (!preview) return;

          gsap.to(preview, {
            opacity: previewIndex === safeIndex ? 1 : 0.4,
            duration: 0.3,
            overwrite: true,
          });

          preview.setAttribute(
            "aria-current",
            previewIndex === safeIndex ? "true" : "false"
          );
        });
      };

      const updateVisuals = (progress: number) => {
        const clampedProgress = gsap.utils.clamp(
          0,
          products.length - 1,
          progress
        );

        gsap.set(track, {
          x: -clampedProgress * slideWidth,
        });

        backgrounds.forEach((background, index) => {
          const distance = Math.abs(index - clampedProgress);

          gsap.set(background, {
            autoAlpha: gsap.utils.clamp(0, 1, 1 - distance),
          });
        });

        validSlides.forEach((slide, index) => {
          const distanceRaw = index - clampedProgress;
          const distance = Math.min(Math.abs(distanceRaw), 1);
          const parallax =
            distanceRaw > 0 ? distanceRaw * slideWidth * -0.5 : 0;
          const isActive = Math.round(clampedProgress) === index;

          gsap.set(validBottles[index], {
            xPercent: -50,
            yPercent: -50,
            x: parallax,
            y: 0,
            scaleX: 1 - distance * 0.19,
            scaleY: 1 - distance * 0.375,
            transformOrigin: "center center",
            force3D: true,
          });

          gsap.set(validTextBlocks[index], {
            autoAlpha: isActive ? 1 : 0,
          });

          gsap.set(slide, {
            autoAlpha: distance < 1 ? 1 : 0,
          });
        });

        const nearestIndex = Math.round(clampedProgress);

        if (nearestIndex !== currentIndex) {
          currentIndex = nearestIndex;
          updateNavigation(nearestIndex);
        }
      };

      const refreshLayout = () => {
        slideWidth = stage.clientWidth;

        gsap.set(track, {
          width: `${products.length * slideWidth}px`,
        });

        gsap.set(validSlides, {
          width: `${slideWidth}px`,
          flex: "0 0 auto",
        });

        updateVisuals(currentIndex);
      };

      gsap.set(track, {
        width: `${products.length * slideWidth}px`,
        x: 0,
      });

      gsap.set(validSlides, {
        width: `${slideWidth}px`,
        flex: "0 0 auto",
        autoAlpha: 1,
      });

      gsap.set(backgrounds, {
        autoAlpha: 0,
      });

      if (backgrounds[0]) {
        gsap.set(backgrounds[0], {
          autoAlpha: 1,
        });
      }

      gsap.set(validBottles, {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "center center",
      });

      gsap.set(validTextBlocks, {
        autoAlpha: 0,
      });

      gsap.set(validTextBlocks[0], {
        autoAlpha: 1,
      });

      const introElements =
        validTextBlocks[0].querySelectorAll("[data-ritual-intro]");

      const introTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline.fromTo(
        introElements,
        {
          autoAlpha: 0,
          y: 28,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          clearProps: "transform",
        },
        0
      );

      const trigger = ScrollTrigger.create({
        id: "rituals-scroll",
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight * (products.length - 1) * 2}`,
        pin: stage,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateVisuals(self.progress * (products.length - 1));
        },
        onRefresh: refreshLayout,
      });

      previews.forEach((preview, index) => {
        if (!preview) return;

        preview.onclick = () => {
          const safeIndex = gsap.utils.clamp(
            0,
            products.length - 1,
            index
          );

          const targetProgress = safeIndex / (products.length - 1 || 1);
          const targetY =
            trigger.start +
            (trigger.end - trigger.start) * targetProgress;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        };
      });

      const introObserver = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          introTimeline.play(0);
        },
      });

      const handleResize = () => {
        refreshLayout();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        updateVisuals(0);
      });

      return () => {
        trigger.kill();
        introObserver.kill();
        introTimeline.kill();
        window.removeEventListener("resize", handleResize);

        previews.forEach((preview) => {
          if (preview) preview.onclick = null;
        });

        gsap.killTweensOf([
          track,
          ...validSlides,
          ...validBottles,
          ...validTextBlocks,
          ...backgrounds,
          ...previews.filter(
            (preview): preview is HTMLButtonElement => preview !== null
          ),
        ]);
      };
    },
    {
      scope: containerRef,
      dependencies: [products.length],
      revertOnUpdate: true,
    }
  );

  return (
    <>
      <section
        ref={containerRef}
        id="rituals"
        className="relative hidden lg:block"
        style={{
          backgroundColor: BACKGROUND_COLOR,
          minHeight: `${100 + Math.max(products.length - 1, 0) * 100}svh`,
        }}
      >
        <div
          ref={stageRef}
          className="relative h-[100svh] min-h-[700px] w-full overflow-hidden"
          style={{ backgroundColor: BACKGROUND_COLOR }}
        >
          <div className="rituals__bg pointer-events-none absolute inset-0">
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(element) => {
                  backgroundRefs.current[index] = element;
                }}
                className="absolute inset-0"
                style={{ backgroundColor: BACKGROUND_COLOR }}
              >
                <div className="absolute inset-0 opacity-[0.08]">
                  <Image
                    src={product.placeholderSrc}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-contain blur-3xl"
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            ref={trackRef}
            className="rituals__track relative z-10 flex h-full"
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(element) => {
                  productRefs.current[index] = element;
                }}
                className="rituals__slide relative h-full shrink-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    ref={(element) => {
                      bottleRefs.current[index] = element;
                    }}
                    className="rituals__bottle-img absolute left-1/2 top-1/2 h-[72vh] max-h-[780px] w-[70vw] max-w-[900px]"
                  >
                    <Image
                      src={product.placeholderSrc}
                      alt={product.name}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 70vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                <article
                  ref={(element) => {
                    textRefs.current[index] = element;
                  }}
                  className="rituals__slide-info absolute bottom-0 left-8 top-0 z-20 flex w-[30%] max-w-[420px] flex-col justify-center text-[#30302B] xl:left-16 xl:max-w-[480px] 2xl:left-24"
                >
                  <p
                    data-ritual-intro
                    className="mb-5 text-xs uppercase tracking-[0.25em] text-[#77766F]"
                  >
                    {product.category}
                  </p>

                  <h2
                    data-ritual-intro
                    className="text-5xl font-light leading-[1.05] tracking-[-0.045em] xl:text-6xl 2xl:text-7xl"
                  >
                    {product.name}
                  </h2>

                  <p
                    data-ritual-intro
                    className="mt-6 text-sm uppercase tracking-[0.18em] text-[#77766F]"
                  >
                    {product.volume}
                  </p>

                  <p
                    data-ritual-intro
                    className="mt-8 max-w-[400px] text-base leading-8 text-[#57564F]"
                  >
                    {product.description}
                  </p>

                  <p
                    data-ritual-intro
                    className="mt-8 max-w-[400px] text-xs uppercase leading-6 tracking-[0.2em] text-[#77766F]"
                  >
                    {product.role}
                  </p>
                </article>
              </div>
            ))}
          </div>

          <div className="absolute bottom-8 right-8 z-30 flex items-end gap-4 xl:bottom-10 xl:right-16 xl:gap-7 2xl:right-24">
            {products.map((product, index) => (
              <button
                key={product.id}
                ref={(element) => {
                  previewRefs.current[index] = element;
                }}
                type="button"
                aria-label={`View ${product.name}`}
                aria-current={index === 0 ? "true" : "false"}
                className="group flex w-[76px] cursor-pointer flex-col items-center gap-3 text-center xl:w-[100px]"
              >
                <span className="relative block h-[68px] w-full xl:h-[90px]">
                  <Image
                    src={product.placeholderSrc}
                    alt={product.name}
                    fill
                    sizes="100px"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </span>

                <span className="min-h-8 text-[9px] uppercase leading-4 tracking-[0.12em] text-[#30302B] xl:text-[10px] xl:tracking-[0.15em]">
                  {product.name}
                </span>

                <span className="h-px w-full bg-[#C9C5BB]" />
              </button>
            ))}

            <div className="mb-6 flex shrink-0 items-center gap-2 text-xs tracking-[0.15em] text-[#30302B]">
              <span ref={indicatorRef}>01</span>
              <span className="text-[#77766F]">/</span>
              <span>{String(products.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="block px-5 py-20 lg:hidden"
        style={{ backgroundColor: BACKGROUND_COLOR }}
      >
        <div className="mx-auto flex max-w-xl flex-col gap-20">
          {products.map((product, index) => (
            <article key={product.id} className="text-[#30302B]">
              <div className="relative mx-auto mb-8 h-[55svh] min-h-[360px] w-full max-w-[420px]">
                <Image
                  src={product.placeholderSrc}
                  alt={product.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1023px) 100vw, 420px"
                  className="object-contain"
                />
              </div>

              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#77766F]">
                {product.category}
              </p>

              <h2 className="text-4xl font-light leading-tight tracking-[-0.04em]">
                {product.name}
              </h2>

              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#77766F]">
                {product.volume}
              </p>

              <p className="mt-6 text-sm leading-7 text-[#57564F]">
                {product.description}
              </p>

              <p className="mt-6 text-xs uppercase leading-6 tracking-[0.18em] text-[#77766F]">
                {product.role}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}