"use client";

import Image from "next/image";
import Button from "@/components/common/Button";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#F8F8F3] font-[var(--font-montserrat)] text-[#30302B] md:min-h-[850px] lg:min-h-screen">
      <div className="relative mx-auto flex min-h-[760px] max-w-[1900px] items-center px-6 py-20 sm:px-10 md:min-h-[850px] md:px-14 lg:min-h-screen lg:px-16 xl:px-24">
        <div className="relative z-20 flex w-full flex-col items-start lg:w-[43%] lg:py-20">
          <p className="mb-7 text-[9px] font-medium uppercase tracking-[0.28em] text-[#8C887C] sm:text-[10px]">
            The Sévane Collection
          </p>

          <h1 className="max-w-xl font-[var(--font-cormorant)] text-6xl font-medium leading-[0.92] tracking-[-0.045em] text-[#30302B] sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem]">
            A quieter
            <br />
            kind of
            <br />
            <span className="italic text-[#8C887C]">luxury.</span>
          </h1>

          <p className="mt-8 max-w-[370px] text-[13px] leading-[1.95] text-[#68685E] sm:text-sm sm:leading-8">
            Skincare that is gentle, honest and beautifully made. Thoughtful
            formulas, considered textures and a moment to return to yourself.
          </p>

          <div className="mt-9">
            <Button href="#products">Discover the collection</Button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-[-22%] flex w-[125%] items-center justify-end sm:right-[-18%] sm:w-[120%] lg:right-[-13%] lg:w-[94%] xl:right-[-10%] xl:w-[90%]">
          <div className="relative h-[600px] w-full sm:h-[740px] md:h-[880px] lg:h-[100vh] lg:min-h-[800px] xl:h-[110vh] xl:min-h-[950px]">
            <Image
              src="/images/brand/he.png"
              alt="Sévane skincare collection"
              fill
              priority
              sizes="(max-width: 1023px) 125vw, 90vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}