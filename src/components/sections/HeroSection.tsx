
"use client";

import Image from "next/image";
import Button from "@/components/common/Button";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#F8F8F3] font-[var(--font-montserrat)] text-[#30302B] md:min-h-[900px] lg:min-h-screen">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_65%_48%,rgba(231,220,198,0.35),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-[760px] max-w-[1900px] items-center px-6 py-16 sm:px-10 md:min-h-[900px] md:px-14 lg:min-h-screen lg:px-16 xl:px-24">
        <div className="relative z-20 flex w-full flex-col items-start lg:w-[43%] lg:py-20">
          <span className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-[#8C887C] sm:text-sm">
            Our Bestsellers
          </span>

          <h1 className="max-w-xl font-[var(--font-cormorant)] text-5xl font-medium leading-[1.05] tracking-[-0.035em] text-[#30302B] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem]">
            Glow naturally.
            <br />
            Every day.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-[#68685E] sm:text-lg">
            Thoughtfully formulated products that hydrate, protect, and reveal
            your skin&apos;s natural radiance.
          </p>

          <div className="mt-8">
            <Button href="#products">Shop Bestsellers</Button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-[-16%] flex w-[125%] items-center justify-end sm:right-[-14%] sm:w-[120%] lg:right-[-15%] lg:w-[100%] xl:right-[-14%] xl:w-[98%]">
          <div className="absolute right-[8%] top-[12%] h-64 w-64 rounded-full bg-[#EAD7CE]/40 blur-[100px] sm:h-96 sm:w-96" />

          <div className="absolute bottom-[8%] right-[8%] h-32 w-[65%] rounded-[50%] bg-[#E7DCC6]/40 blur-[70px]" />

          <div className="relative h-[620px] w-full sm:h-[780px] md:h-[950px] lg:h-[105vh] lg:min-h-[850px] xl:h-[115vh] xl:min-h-[1000px]">
            <Image
              src="/images/brand/removebg.png"
              alt="Sévane skincare product collection"
              fill
              priority
              sizes="(max-width: 1023px) 125vw, 98vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
