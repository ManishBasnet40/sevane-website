
"use client";

import Image from "next/image";
import Link from "next/link";

const PHILOSOPHY_PILLARS = [
  {
    number: "01",
    title: "CONSIDERED",
  },
  {
    number: "02",
    title: "BOTANICAL",
  },
  {
    number: "03",
    title: "GENTLE",
  },
  {
    number: "04",
    title: "CRAFTED",
  },
];

const PILLAR_IMAGES = [
  "/images/considered.jpg",
  "/images/botanical.jpg",
  "/images/gentle.jpg",
  "/images/crafted.jpg",
];

const PILLAR_DISCIPLINES = [
  "Formulation & Intention",
  "Plants & Extracts",
  "Skin & Sensitivity",
  "Making & Ritual",
];

const PILLAR_QUOTES = [
  "Every formula begins with intention. Nothing is added without purpose.",
  "Rooted in the intelligence of plants, selected with care and restraint.",
  "Created to respect the skin, its rhythm, and its natural balance.",
  "Thoughtfully made in small details, with patience and precision.",
];

const BOOK_ACCENTS = [
  "bg-[#E7DED2]",
  "bg-[#DCE0D4]",
  "bg-[#E5DDD4]",
  "bg-[#DCD8CE]",
];

export default function PhilosophySection() {
  return (
    <section className="relative bg-[#F3EFE9] py-20 text-[#24231F] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10 xl:px-12">
        <div className="mb-16 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[650px]">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-black/45 sm:text-xs">
              The Sevane Philosophy
            </p>

            <h2 className="font-serif text-[clamp(2.7rem,5.5vw,5.5rem)] font-normal leading-[0.92] tracking-[-0.045em]">
              A quieter way
              <br />
              to care.
            </h2>
          </div>

          <p className="max-w-[430px] text-sm leading-7 text-black/50 lg:mb-1">
            We believe beauty should feel considered, botanical, gentle and
            crafted. Every choice begins with respect for the skin, the plant,
            and the ritual itself.
          </p>
        </div>

        <div className="relative w-full">
          <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8">
            {PHILOSOPHY_PILLARS.map((pillar, index) => (
              <article
                key={pillar.number}
                className="group relative min-w-0"
              >
                <div className="relative">
                  <div
                    className={`relative aspect-[0.69] w-full overflow-hidden border border-black/10 ${BOOK_ACCENTS[index]} shadow-[0_8px_24px_rgba(0,0,0,0.055)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5`}
                  >
                    <div className="absolute inset-[5px] border border-black/10" />

                    <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
                      <div className="flex items-start justify-between">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-black/40">
                          Chapter
                        </span>

                        <span className="font-serif text-sm text-black/45">
                          {pillar.number}
                        </span>
                      </div>

                      <div>
                        <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-black/40 sm:text-[9px]">
                          {PILLAR_DISCIPLINES[index]}
                        </p>

                        <h3 className="font-serif text-[clamp(1.7rem,3vw,3rem)] leading-[0.92] tracking-[-0.035em]">
                          {pillar.title}
                        </h3>
                      </div>

                      <div className="flex items-end justify-between">
                        <span className="text-[8px] uppercase tracking-[0.2em] text-black/30">
                          Sévane
                        </span>

                        <span className="font-serif text-base text-black/30">
                          {pillar.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`pointer-events-none absolute top-1/2 z-40 hidden w-[240px] -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:block lg:w-[265px] ${
                      index < 2
                        ? "left-[calc(100%+14px)]"
                        : "right-[calc(100%+14px)]"
                    }`}
                  >
                    <div
                      className={`transition-transform duration-400 ${
                        index < 2
                          ? "translate-x-2 group-hover:translate-x-0"
                          : "-translate-x-2 group-hover:translate-x-0"
                      }`}
                    >
                      <div className="border border-black/10 bg-[#F3EFE9] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
                        <div className="relative aspect-[1.2] overflow-hidden">
                          <Image
                            src="/images/brand/botanical.webp"
                            alt={pillar.title}
                            fill
                            className="object-cover"
                            sizes="265px"
                          />
                        </div>

                        <div className="px-2 pb-2 pt-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-[8px] uppercase tracking-[0.18em] text-black/40">
                              {pillar.number}
                            </span>

                            <span className="text-right text-[8px] uppercase tracking-[0.15em] text-black/35">
                              {PILLAR_DISCIPLINES[index]}
                            </span>
                          </div>

                          <h4 className="font-serif text-xl leading-none tracking-[-0.02em]">
                            {pillar.title}
                          </h4>

                          <p className="mt-3 text-[10px] leading-5 text-black/50">
                            {PILLAR_QUOTES[index]}
                          </p>

                          <Link
                            href={`/philosophy/${pillar.number}`}
                            className="mt-4 inline-flex items-center gap-2 border-b border-black/40 pb-1 text-[8px] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-50"
                          >
                            Read More
                            <span className="text-xs">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between px-0.5">
                  <p className="max-w-[170px] text-[8px] uppercase leading-4 tracking-[0.15em] text-black/40 sm:text-[9px]">
                    {PILLAR_DISCIPLINES[index]}
                  </p>

                  <span className="font-serif text-sm text-black/30">
                    {pillar.number}
                  </span>
                </div>

                <p className="mt-3 max-w-[280px] text-[11px] leading-5 text-black/45 sm:text-xs sm:leading-6">
                  {PILLAR_QUOTES[index]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
