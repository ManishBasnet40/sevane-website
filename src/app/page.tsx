"use client";

import Navbar from "@/components/layout/Navbar";
import VideoHeroSection from "@/components/sections/VideoHeroSection";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import RitualsSection from "@/components/sections/RitualsSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import SanctuarySection from "@/components/sections/SanctuarySection";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <VideoHeroSection />

        <HeroSection isLoaded={true} />

        <StorySection />

        <RitualsSection />

        <PhilosophySection />

        <SanctuarySection />

        <CtaSection />
      </main>

      <Footer />
    </>
  );
}