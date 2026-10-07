"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PRODUCTS } from "@/lib/constants/brand";
import BrandDiamond from "../brand/BrandDiamond";

export default function RitualsSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const overtureRef = useRef<HTMLDivElement | null>(null);
  const folioRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numeralRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleScrollToProduct = (index: number) => {
    const container = containerRef.current;

    if (!container) return;

    const positions = [0.08, 0.5, 0.92];
    const progress = positions[index] ?? 0;

    const rect = container.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollDistance = container.offsetHeight - window.innerHeight;

    window.scrollTo({
      top: start + scrollDistance * progress,
      behavior: "smooth",
    });
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      const stage = stageRef.current;
      const background = backgroundRef.current;
      const overture = overtureRef.current;
      const folio = folioRef.current;
      const progress = progressRef.current;

      if (
        !container ||
        !stage ||
        !background ||
        !overture ||
        !folio ||
        !progress
      ) {
        return;
      }

      const products = productRefs.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

      const images = imageRefs.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

      const infos = infoRefs.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

      const numerals = numeralRefs.current.filter(
        (item): item is HTMLDivElement => item !== null
      );

      const tabs = tabRefs.current.filter(
        (item): item is HTMLButtonElement => item !== null
      );

      gsap.set(products, {
        opacity: 0,
      });

      gsap.set(images, {
        opacity: 0,
        scale: 0.88,
        x: -30,
      });

      gsap.set(infos, {
        opacity: 0,
        x: 45,
      });

      gsap.set(numerals, {
        opacity: 0,
      });

      gsap.set(background, {
        opacity: 0,
      });

      gsap.set(overture, {
        opacity: 0,
        y: 20,
      });

      gsap.set(folio, {
        opacity: 0,
        y: 20,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const activateProduct = (index: number) => {
        products.forEach((product, productIndex) => {
          gsap.to(product, {
            opacity: productIndex === index ? 1 : 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
          });
        });

        images.forEach((image, imageIndex) => {
          gsap.to(image, {
            opacity: imageIndex === index ? 1 : 0,
            scale: imageIndex === index ? 1 : 0.88,
            x: imageIndex === index ? 0 : -30,
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
          });
        });

        infos.forEach((info, infoIndex) => {
          gsap.to(info, {
            opacity: infoIndex === index ? 1 : 0,
            x: infoIndex === index ? 0 : 45,
            duration: 0.75,
            ease: "power3.out",
            overwrite: true,
          });
        });

        numerals.forEach((numeral, numeralIndex) => {
          gsap.to(numeral, {
            opacity: numeralIndex === index ? 1 : 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        });

        tabs.forEach((tab, tabIndex) => {
          gsap.to(tab, {
            opacity: tabIndex === index ? 1 : 0.35,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        });
      };

      activateProduct(0);

      const intro = gsap.timeline();

      intro
        .to(background, {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          overture,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .to(
          folio,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        );

      const scrollAnimation = gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const value = self.progress;

              gsap.set(progress, {
                scaleX: value,
              });

              if (value < 0.333) {
                activateProduct(0);
              } else if (value < 0.666) {
                activateProduct(1);
              } else {
                activateProduct(2);
              }
            },
          },
        }
      );

      return () => {
        scrollAnimation.scrollTrigger?.kill();
      };
    },
    {
      scope: containerRef,
    }
  );

  return (
    <>
      <section
        ref={containerRef}
        className="relative hidden min-h-[300svh] w-full bg-[#f8f8f3] lg:block"
      >
        <div
          ref={stageRef}
          className="relative flex h-[100svh] min-h-[720px] w-full overflow-hidden bg-[#f8f8f3]"
        >
          <div
            ref={backgroundRef}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_45%,rgba(176,146,92,0.1),transparent_35%),radial-gradient(circle_at_75%_55%,rgba(48,48,43,0.04),transparent_35%)]"
          />

          <div className="relative z-10 flex h-full w-full flex-col px-8 py-8 xl:px-16 2xl:px-24">
            <header className="flex w-full items-center justify-between border-b border-[#30302B]/15 pb-5">
              <div
                ref={overtureRef}
                className="flex items-center gap-4 text-[#30302B]"
              >
                <BrandDiamond />

                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em]">
                  The Rituals
                </span>
              </div>

              <div
                ref={folioRef}
                className="font-editorial-italic text-sm text-[#30302B]/50"
              >
                Sévane — Collection
              </div>
            </header>

            <div className="relative flex min-h-0 flex-1 w-full items-center">
              <div className="absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none">
                {PRODUCTS.map((product, index) => (
                  <div
                    key={`numeral-${product.id}`}
                    ref={(element) => {
                      numeralRefs.current[index] = element;
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 font-display text-[18vw] leading-none tracking-[-0.08em] text-[#30302B]/[0.035] xl:text-[16vw]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                ))}
              </div>

              <div className="relative grid h-full w-full grid-cols-12 items-center gap-8 xl:gap-12 2xl:gap-20">
                <div className="relative col-span-6 flex h-full items-center justify-center">
                  {PRODUCTS.map((product, index) => (
                    <div
                      key={`product-${product.id}`}
                      ref={(element) => {
                        productRefs.current[index] = element;
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div
                        ref={(element) => {
                          imageRefs.current[index] = element;
                        }}
                        className="relative flex h-[72vh] min-h-[520px] w-full max-w-[620px] items-center justify-center"
                      >
                        <div className="absolute inset-[8%] bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95),rgba(238,234,228,0.65)_48%,transparent_72%)]" />

                        <Image
                          src={product.placeholderSrc}
                          alt={product.name}
                          fill
                          priority={index === 0}
                          sizes="(min-width: 1536px) 620px, 520px"
                          className="relative z-10 object-contain p-8 xl:p-12 2xl:p-16"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative col-span-6 flex h-full items-center">
                  {PRODUCTS.map((product, index) => (
                    <div
                      key={`info-${product.id}`}
                      ref={(element) => {
                        infoRefs.current[index] = element;
                      }}
                      className="absolute left-0 w-full max-w-[760px] pr-4 xl:max-w-[850px] 2xl:max-w-[900px]"
                    >
                      <div className="mb-7 flex items-center gap-4">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B0925C]">
                          {product.category}
                        </span>

                        <span className="h-px w-10 bg-[#B0925C]/50" />

                        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#30302B]/40">
                          {product.volume}
                        </span>
                      </div>

                      <h2 className="max-w-[850px] font-display text-[clamp(3.5rem,6vw,7.5rem)] font-normal leading-[0.86] tracking-[-0.045em] text-[#30302B]">
                        {product.name}
                      </h2>

                      <p className="mt-7 max-w-[650px] font-editorial-italic text-[clamp(1.25rem,1.7vw,2rem)] leading-[1.25] text-[#30302B]/65">
                        {product.role}
                      </p>

                      <div className="mt-9 max-w-[760px] border-t border-[#30302B]/15 pt-7">
                        <p className="max-w-[700px] font-sans text-sm leading-7 text-[#30302B]/65 xl:text-[15px] xl:leading-8">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
                        <div>
                          <span className="mb-2 block font-sans text-[9px] uppercase tracking-[0.28em] text-[#B0925C]">
                            Ritual
                          </span>

                          <p className="max-w-[400px] font-sans text-xs leading-6 text-[#30302B]/60">
                            {product.ritualStep}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`/products/${product.id}`}
                        className="group mt-9 inline-flex items-center gap-5 border-b border-[#30302B]/40 pb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#30302B] transition-colors duration-500 hover:border-[#B0925C] hover:text-[#B0925C]"
                      >
                        Explore
                        <span className="text-base transition-transform duration-500 group-hover:translate-x-2">
                          ↗
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <footer className="relative z-20 flex w-full items-end justify-between border-t border-[#30302B]/15 pt-5">
              <div className="flex items-center gap-7">
                {PRODUCTS.map((product, index) => (
                  <button
                    key={`tab-${product.id}`}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => handleScrollToProduct(index)}
                    className="group flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.22em] text-[#30302B] transition-opacity duration-300"
                  >
                    <span className="text-[#B0925C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {product.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative h-px w-32 overflow-hidden bg-[#30302B]/15 xl:w-56 2xl:w-72">
                <div
                  ref={progressRef}
                  className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#B0925C]"
                />
              </div>
            </footer>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f8f8f3] px-5 py-20 lg:hidden">
        <div className="mb-12 flex items-center justify-between border-b border-[#30302B]/15 pb-5">
          <div className="flex items-center gap-4">
            <BrandDiamond />

            <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#30302B]">
              The Rituals
            </span>
          </div>

          <span className="font-editorial-italic text-sm text-[#30302B]/50">
            Sévane
          </span>
        </div>

        <div className="flex flex-col gap-24">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="relative w-full"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#eeeae4]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.95),transparent_68%)]" />

                <Image
                  src={product.placeholderSrc}
                  alt={product.name}
                  fill
                  sizes="100vw"
                  className="object-contain p-8"
                />

                <span className="absolute left-5 top-5 font-display text-5xl leading-none text-[#30302B]/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="pt-7">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#B0925C]">
                    {product.category}
                  </span>

                  <span className="h-px w-6 bg-[#B0925C]/50" />

                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#30302B]/40">
                    {product.volume}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-[clamp(2.8rem,12vw,5rem)] font-normal leading-[0.9] tracking-[-0.035em] text-[#30302B]">
                  {product.name}
                </h2>

                <p className="mt-5 font-editorial-italic text-xl leading-[1.25] text-[#30302B]/70">
                  {product.role}
                </p>

                <div className="mt-7 border-t border-[#30302B]/15 pt-6">
                  <p className="font-sans text-sm leading-7 text-[#30302B]/65">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6">
                  <span className="mb-3 block font-sans text-[9px] uppercase tracking-[0.25em] text-[#B0925C]">
                    Ritual
                  </span>

                  <p className="font-sans text-sm leading-7 text-[#30302B]/65">
                    {product.ritualStep}
                  </p>
                </div>

                <a
                  href={`/products/${product.id}`}
                  className="group mt-8 inline-flex items-center gap-5 border-b border-[#30302B]/40 pb-2 font-sans text-[10px] uppercase tracking-[0.28em] text-[#30302B]"
                >
                  Explore
                  <span className="text-base transition-transform duration-500 group-hover:translate-x-2">
                    ↗
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}