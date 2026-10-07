
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

  useLayoutEffect(() => {
    if (!isLoaded) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const videoStage = videoStageRef.current;
    const videoInner = videoInnerRef.current;
    const introText = introTextRef.current;

    if (
      !section ||
      !video ||
      !videoStage ||
      !videoInner ||
      !introText
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
        scale: 0.985,
      });

      gsap.set(videoInner, {
        scale: 1.015,
      });

      gsap.set(introText, {
        opacity: 0,
        y: 28,
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
          duration: 1.2,
          ease: "power3.inOut",
        })
        .to(
          videoInner,
          {
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
          },
          "-=1"
        )
        .to(
          introText,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.75"
        );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2400",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline
        .to(videoStage, {
          scale: 1.015,
          duration: 0.18,
        })
        .to(
          videoInner,
          {
            scale: 1.015,
            duration: 0.18,
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.035,
          duration: 0.18,
        })
        .to(
          videoInner,
          {
            scale: 1.025,
            xPercent: -0.7,
            yPercent: -0.4,
            duration: 0.18,
          },
          "<"
        )
        .to(
          introText,
          {
            y: -65,
            scale: 1.015,
            opacity: 0.4,
            duration: 0.18,
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.055,
          duration: 0.18,
        })
        .to(
          videoInner,
          {
            scale: 1.035,
            xPercent: 1,
            yPercent: -0.8,
            duration: 0.18,
          },
          "<"
        )
        .to(
          introText,
          {
            y: -130,
            opacity: 0,
            duration: 0.16,
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.075,
          duration: 0.2,
        })
        .to(
          videoInner,
          {
            scale: 1.045,
            xPercent: -1.5,
            yPercent: 0.5,
            duration: 0.2,
          },
          "<"
        )
        .to(videoStage, {
          scale: 1.1,
          opacity: 0,
          duration: 0.22,
          ease: "power2.inOut",
        })
        .to(
          videoInner,
          {
            scale: 1.055,
            xPercent: 0,
            duration: 0.22,
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
          className="relative h-full w-full"
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

          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.28)_100%)]" />
        </div>
      </div>

      {/* Only central text remains */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
        <p
          ref={introTextRef}
          className="
            font-display
            text-center
            text-[15vw]
            font-medium
            leading-[0.8]
            tracking-[-0.045em]
            text-white
            md:text-[11vw]
            lg:text-[9vw]
          "
        >
          Ritual,
          <br />
          <span className="font-editorial-italic">
            in bloom.
          </span>
        </p>
      </div>
    </section>
  );
}

