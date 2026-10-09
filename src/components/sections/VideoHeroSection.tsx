
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface VideoHeroSectionProps {
  isLoaded?: boolean;
}

export default function VideoHeroSection({
  isLoaded = true,
}: VideoHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoaded) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const videoStage = videoStageRef.current;
    const videoInner = videoInnerRef.current;
    const introText = introTextRef.current;
    const scrollCue = scrollCueRef.current;

    if (
      !section ||
      !video ||
      !videoStage ||
      !videoInner ||
      !introText ||
      !scrollCue
    ) {
      return;
    }

    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const ctx = gsap.context(() => {
      gsap.set(videoStage, {
        opacity: 0,
        scale: 1.01,
      });

      gsap.set(videoInner, {
        scale: 1.025,
      });

      gsap.set(introText, {
        opacity: 0,
        y: 35,
      });

      gsap.set(scrollCue, {
        opacity: 0,
        y: 10,
      });

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener("loadeddata", playVideo, {
          once: true,
        });
      }

      const intro = gsap.timeline();

      intro
        .to(videoStage, {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        })
        .to(
          videoInner,
          {
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
          },
          "-=1.25"
        )
        .to(
          introText,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .to(
          scrollCue,
          {
            opacity: 0.7,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=900",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline
        .to(videoStage, {
          scale: 1.018,
          duration: 0.2,
          ease: "none",
        })
        .to(
          videoInner,
          {
            scale: 1.012,
            xPercent: -0.25,
            yPercent: -0.15,
            duration: 0.2,
            ease: "none",
          },
          "<"
        )
        .to(
          introText,
          {
            y: -28,
            duration: 0.2,
            ease: "none",
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.032,
          duration: 0.22,
          ease: "none",
        })
        .to(
          videoInner,
          {
            scale: 1.022,
            xPercent: 0.35,
            yPercent: -0.25,
            duration: 0.22,
            ease: "none",
          },
          "<"
        )
        .to(
          introText,
          {
            y: -62,
            opacity: 0.72,
            duration: 0.22,
            ease: "none",
          },
          "<"
        )
        .to(
          scrollCue,
          {
            opacity: 0,
            y: -12,
            duration: 0.18,
            ease: "none",
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.052,
          duration: 0.24,
          ease: "none",
        })
        .to(
          videoInner,
          {
            scale: 1.032,
            xPercent: -0.45,
            yPercent: 0.2,
            duration: 0.24,
            ease: "none",
          },
          "<"
        )
        .to(
          introText,
          {
            y: -105,
            opacity: 0,
            duration: 0.2,
            ease: "none",
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.075,
          duration: 0.25,
          ease: "none",
        })
        .to(
          videoInner,
          {
            scale: 1.045,
            xPercent: 0.3,
            yPercent: 0,
            duration: 0.25,
            ease: "none",
          },
          "<"
        );
    }, sectionRef);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      ctx.revert();
    };
  }, [isLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <div
        ref={videoStageRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <div
          ref={videoInnerRef}
          className="relative h-full w-full will-change-transform"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/video/sevane-hero-full.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />

          <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.2)_100%)]" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 pb-12 md:px-16 md:pb-16 lg:px-20 lg:pb-20 xl:px-24">
        <p
          ref={introTextRef}
          className="max-w-[760px] font-display text-[17vw] font-medium leading-[0.76] tracking-[-0.055em] text-white sm:text-[14vw] md:text-[11vw] lg:text-[8.5vw]"
        >
          Ritual,
          <br />
          in bloom.
        </p>
      </div>

      <div
        ref={scrollCueRef}
        className="pointer-events-none absolute bottom-8 right-6 z-20 flex items-center gap-3 sm:right-8 md:right-16 lg:right-20 xl:right-24"
      >
        <span className="font-sans text-[7px] font-medium uppercase tracking-[0.28em] text-white/70 sm:text-[8px]">
          Scroll to explore
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-xs text-white/80">
          ↓
        </span>
      </div>
    </section>
  );
}
