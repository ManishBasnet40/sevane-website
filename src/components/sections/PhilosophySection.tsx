"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "CONSIDERED",
    discipline: "Formulation & Intention",
    quote: "Every formula begins with intention. Nothing is added without purpose.",
    image: "/images/brand/considered.webp",
    rotation: -2.5,
    href: "#considered",
  },
  {
    number: "02",
    title: "BOTANICAL",
    discipline: "Plants & Extracts",
    quote:
      "Rooted in the intelligence of plants, selected with care and restraint.",
    image: "/images/brand/botanical.webp",
    rotation: 1.8,
    href: "#botanical",
  },
  {
    number: "03",
    title: "GENTLE",
    discipline: "Skin & Sensitivity",
    quote:
      "Created to respect the skin, its rhythm, and its natural balance.",
    image: "/images/brand/gentle.jpg",
    rotation: -1.5,
    href: "#gentle",
  },
  {
    number: "04",
    title: "CRAFTED",
    discipline: "Making & Ritual",
    quote:
      "Thoughtfully made in small details, with patience and precision.",
    image: "/images/brand/crafted.webp",
    rotation: 2.2,
    href: "#crafted",
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shelfRef = useRef<HTMLDivElement | null>(null);
  const bookRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const shelf = shelfRef.current;

    if (!section || !shelf) return;

    const ctx = gsap.context(() => {
      const books = bookRefs.current.filter(
        (book): book is HTMLDivElement => Boolean(book)
      );

      gsap.set(books, {
        opacity: 0,
        y: 70,
        z: -220,
        rotateX: 14,
        scale: 0.9,
        transformPerspective: 1500,
        transformOrigin: "center bottom",
      });

      gsap.set(shelf, {
        opacity: 0,
      });

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      introTimeline
        .to(shelf, {
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        })
        .to(
          books,
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.16,
            ease: "power4.out",
          },
          "-=0.05"
        )
        .to(
          books,
          {
            rotateZ: (index) => PHILOSOPHY_PILLARS[index].rotation,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.75"
        );

      const cleanupFunctions: (() => void)[] = [];

      books.forEach((book, index) => {
        const cover = book.querySelector<HTMLElement>("[data-book-cover]");
        const coverImage =
          book.querySelector<HTMLElement>("[data-book-image]");
        const pageStack =
          book.querySelector<HTMLElement>("[data-page-stack]");
        const pageContent =
          book.querySelector<HTMLElement>("[data-page-content]");
        const discipline =
          book.querySelector<HTMLElement>("[data-page-discipline]");
        const title = book.querySelector<HTMLElement>("[data-page-title]");
        const quote = book.querySelector<HTMLElement>("[data-page-quote]");
        const readMore =
          book.querySelector<HTMLElement>("[data-page-read-more]");
        const arrow = book.querySelector<HTMLElement>("[data-arrow]");
        const shadow =
          book.querySelector<HTMLElement>("[data-book-shadow]");
        const bookPage = book.querySelector<HTMLElement>("[data-book-page]");
        const spine =
          book.querySelector<HTMLElement>("[data-book-spine]");

        if (
          !cover ||
          !coverImage ||
          !pageStack ||
          !pageContent ||
          !discipline ||
          !title ||
          !quote ||
          !readMore ||
          !arrow ||
          !shadow ||
          !bookPage ||
          !spine
        ) {
          return;
        }

        gsap.set(pageContent, {
          opacity: 0,
        });

        gsap.set([discipline, title, quote, readMore], {
          opacity: 0,
          y: 16,
        });

        gsap.set(pageStack, {
          opacity: 0,
          x: -6,
        });

        gsap.set(bookPage, {
          x: -3,
        });

        const setNeighbors = (activeIndex: number) => {
          books.forEach((otherBook, otherIndex) => {
            if (otherBook === book) return;

            const distance = otherIndex - activeIndex;
            const direction = distance < 0 ? -1 : 1;

            gsap.to(otherBook, {
              x:
                Math.abs(distance) === 1
                  ? direction * 10
                  : direction * 4,
              duration: 0.5,
              ease: "power3.out",
            });
          });
        };

        const resetNeighbors = () => {
          books.forEach((otherBook) => {
            if (otherBook === book) return;

            gsap.to(otherBook, {
              x: 0,
              duration: 0.55,
              ease: "power3.out",
            });
          });
        };

        const openBook = () => {
          gsap.killTweensOf([
            book,
            cover,
            coverImage,
            pageStack,
            pageContent,
            discipline,
            title,
            quote,
            readMore,
            arrow,
            shadow,
            bookPage,
            spine,
          ]);

          setNeighbors(index);

          gsap.to(book, {
            y: -18,
            rotateZ: 0,
            rotateX: 1,
            scale: 1.035,
            duration: 0.45,
            ease: "power3.out",
          });

          gsap.to(cover, {
            rotateY: -112,
            duration: 1.05,
            ease: "power3.inOut",
          });

          gsap.to(coverImage, {
            scale: 1.08,
            duration: 1,
            ease: "power2.out",
          });

          gsap.to(pageStack, {
            opacity: 1,
            x: 0,
            duration: 0.65,
            delay: 0.12,
            ease: "power3.out",
          });

          gsap.to(bookPage, {
            x: 0,
            duration: 0.8,
            delay: 0.08,
            ease: "power3.out",
          });

          gsap.to(pageContent, {
            opacity: 1,
            duration: 0.2,
            delay: 0.35,
          });

          gsap.to(discipline, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: 0.38,
            ease: "power3.out",
          });

          gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: 0.46,
            ease: "power3.out",
          });

          gsap.to(quote, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: 0.56,
            ease: "power3.out",
          });

          gsap.to(readMore, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.68,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            opacity: 0,
            scale: 0.7,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(shadow, {
            opacity: 0.28,
            scaleX: 1.12,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(spine, {
            opacity: 0.75,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const closeBook = () => {
          gsap.killTweensOf([
            book,
            cover,
            coverImage,
            pageStack,
            pageContent,
            discipline,
            title,
            quote,
            readMore,
            arrow,
            shadow,
            bookPage,
            spine,
          ]);

          resetNeighbors();

          gsap.to(discipline, {
            opacity: 0,
            y: 16,
            duration: 0.2,
            ease: "power2.in",
          });

          gsap.to(title, {
            opacity: 0,
            y: 16,
            duration: 0.22,
            ease: "power2.in",
          });

          gsap.to(quote, {
            opacity: 0,
            y: 16,
            duration: 0.24,
            ease: "power2.in",
          });

          gsap.to(readMore, {
            opacity: 0,
            y: 16,
            duration: 0.25,
            ease: "power2.in",
          });

          gsap.to(pageContent, {
            opacity: 0,
            duration: 0.18,
            delay: 0.15,
          });

          gsap.to(cover, {
            rotateY: 0,
            duration: 0.82,
            ease: "power3.inOut",
          });

          gsap.to(coverImage, {
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          });

          gsap.to(pageStack, {
            opacity: 0,
            x: -6,
            duration: 0.5,
            delay: 0.18,
            ease: "power2.inOut",
          });

          gsap.to(bookPage, {
            x: -3,
            duration: 0.55,
            ease: "power2.inOut",
          });

          gsap.to(book, {
            y: 0,
            rotateZ: PHILOSOPHY_PILLARS[index].rotation,
            rotateX: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            delay: 0.3,
            ease: "power2.out",
          });

          gsap.to(shadow, {
            opacity: 0.16,
            scaleX: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(spine, {
            opacity: 0.45,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const handleMouseEnter = () => {
          openBook();
        };

        const handleMouseLeave = () => {
          closeBook();
        };

        const handleClick = () => {
          if (window.matchMedia("(hover: none)").matches) {
            const isOpen =
              book.getAttribute("data-book-open") === "true";

            if (isOpen) {
              book.setAttribute("data-book-open", "false");
              closeBook();
            } else {
              books.forEach((otherBook) => {
                if (otherBook === book) return;

                if (
                  otherBook.getAttribute("data-book-open") === "true"
                ) {
                  otherBook.setAttribute("data-book-open", "false");
                }
              });

              book.setAttribute("data-book-open", "true");
              openBook();
            }
          }
        };

        book.addEventListener("mouseenter", handleMouseEnter);
        book.addEventListener("mouseleave", handleMouseLeave);
        book.addEventListener("click", handleClick);

        cleanupFunctions.push(() => {
          book.removeEventListener("mouseenter", handleMouseEnter);
          book.removeEventListener("mouseleave", handleMouseLeave);
          book.removeEventListener("click", handleClick);
        });
      });

      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4f1ea] px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 max-w-[850px] sm:mb-14 lg:mb-16">
          <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736b] sm:mb-5 sm:text-xs">
            The Sevane Philosophy
          </span>

          <h2 className="font-serif text-[clamp(3.2rem,7vw,7rem)] font-normal leading-[0.8] tracking-[-0.055em] text-[#1b1b19]">
            A quieter
            <span className="block pl-[10%] italic">way to care.</span>
          </h2>
        </div>

        <div
          ref={shelfRef}
          className="relative"
          style={{
            perspective: "1600px",
          }}
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 lg:gap-x-16 lg:items-start">
            {PHILOSOPHY_PILLARS.map((pillar, index) => (
              <div
                key={pillar.number}
                className={[
                  "relative",
                  index === 1 ? "lg:mt-20" : "",
                  index === 2 ? "lg:mt-6" : "",
                  index === 3 ? "lg:mt-28" : "",
                ].join(" ")}
              >
                <div className="relative mx-auto h-[1px] w-[92%] bg-[#292722] opacity-20" />

                <div
                  ref={(element) => {
                    bookRefs.current[index] = element;
                  }}
                  data-book-open="false"
                  className="group relative mx-auto mt-[-1px] block w-[92%] cursor-pointer will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="relative aspect-[0.69] w-full"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      data-book-shadow
                      className="pointer-events-none absolute bottom-[-20px] left-[6%] right-[0%] z-0 h-[28px] rounded-[50%] bg-black opacity-[0.16] blur-[15px]"
                    />

                    <div
                      className="absolute bottom-[3%] left-[5%] right-[-3%] top-[3%] z-[1] rounded-r-[3px] bg-[#d8d3c8]"
                      style={{
                        boxShadow:
                          "10px 16px 28px rgba(36, 32, 24, 0.15), 2px 3px 7px rgba(36, 32, 24, 0.12)",
                      }}
                    >
                      <div className="absolute bottom-[2%] right-[-7px] top-[2%] w-[12px] rounded-r-[2px] bg-[repeating-linear-gradient(to_bottom,#d8d4ca_0px,#d8d4ca_2px,#aaa59b_3px,#eeeae1_4px)]" />
                    </div>

                    <div
                      data-page-stack
                      className="absolute bottom-[3%] left-[4%] right-[-2%] top-[3%] z-[2] overflow-hidden rounded-r-[3px] bg-[#eeeae2]"
                      style={{
                        opacity: 0,
                        transform: "translateX(-6px)",
                        boxShadow:
                          "8px 14px 25px rgba(36, 32, 24, 0.13), inset -2px 0 4px rgba(0,0,0,0.12)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        data-book-page
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg,#d2cdc1 0%,#eeeae2 8%,#f8f5ee 50%,#e1ddd2 100%)",
                        }}
                      />

                      <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_27px,rgba(70,65,55,0.12)_28px,transparent_29px)]" />

                      <div className="pointer-events-none absolute inset-y-[4%] right-0 w-[10px] bg-[repeating-linear-gradient(to_bottom,#d6d1c6_0px,#d6d1c6_2px,#aaa59a_3px,#eeeae0_4px)]" />

                      <div className="pointer-events-none absolute inset-y-0 left-0 w-[9px] bg-gradient-to-r from-black/15 to-transparent" />

                      <div
                        data-page-content
                        className="absolute inset-x-[10%] bottom-[8%] top-[10%] z-10 flex flex-col justify-between text-[#302e29]"
                      >
                        <div>
                          <div
                            data-page-discipline
                            className="mb-4 text-[8px] font-medium uppercase tracking-[0.2em] text-[#77736b] sm:text-[9px]"
                          >
                            {pillar.discipline}
                          </div>

                          <h4
                            data-page-title
                            className="mb-5 max-w-[92%] font-serif text-[clamp(1.7rem,2.5vw,2.6rem)] font-normal leading-[0.9] tracking-[-0.04em] text-[#25231f]"
                          >
                            {pillar.title}
                          </h4>

                          <p
                            data-page-quote
                            className="max-w-[94%] font-serif text-[clamp(0.95rem,1.25vw,1.2rem)] leading-[1.35] tracking-[-0.01em] text-[#45413a]"
                          >
                            “{pillar.quote}”
                          </p>
                        </div>

                        <div
                          data-page-read-more
                          className="border-t border-[#39362f]/15 pt-4"
                        >
                          <Link
                            href={pillar.href}
                            className="group/read flex w-fit items-center gap-3 text-[8px] font-medium uppercase tracking-[0.2em] text-[#302e29] sm:text-[9px]"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <span>Read more</span>

                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#39362f]/25 transition-transform duration-300 group-hover/read:translate-x-1">
                              ↗
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div
                      data-book-cover
                      className="absolute inset-0 z-[4] overflow-hidden rounded-[1px] border border-black/10 bg-[#25251f]"
                      style={{
                        transformOrigin: "left center",
                        transformStyle: "preserve-3d",
                        boxShadow:
                          "0 18px 32px rgba(31, 28, 22, 0.2), 0 4px 10px rgba(31, 28, 22, 0.14)",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          priority={index < 2}
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 20vw"
                          className="object-cover"
                          data-book-image
                        />

                        <div className="absolute inset-0 bg-black/[0.08]" />

                        <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-black/45 via-black/15 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-black/90 via-black/60 to-black/5" />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
                      </div>

                      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 pt-5 text-white sm:px-6 sm:pt-6">
                        <span className="text-[10px] font-medium tracking-[0.18em] sm:text-xs">
                          {pillar.number}
                        </span>

                        <span className="text-[9px] uppercase tracking-[0.22em] opacity-80 sm:text-[10px]">
                          Sevane
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 text-white sm:px-6 sm:pb-7">
                        <h3 className="max-w-full whitespace-nowrap pr-1 font-serif text-[clamp(1.6rem,2.45vw,2.7rem)] font-normal leading-[0.9] tracking-[-0.035em] text-white">
                          {pillar.title}
                        </h3>

                        <div className="mt-5 flex items-center justify-end border-t border-white/25 pt-4">
                          <span
                            data-arrow
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-sm"
                          >
                            ↗
                          </span>
                        </div>
                      </div>

                      <div className="pointer-events-none absolute inset-[7px] z-20 border border-white/15" />
                    </div>

                    <div
                      data-book-spine
                      className="pointer-events-none absolute bottom-[3%] left-0 top-[3%] z-[5] w-[3px] bg-black/20 opacity-45"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}