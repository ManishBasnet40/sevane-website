"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import BrandDiamond from "../brand/BrandDiamond";
import HairlineRule from "../common/HairlineRule";

export const CtaSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 28,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="invitation"
      ref={containerRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-4xl mx-auto text-center"
    >
      <div ref={contentRef} className="space-y-6 md:space-y-8">
        {/* Kicker */}
        <div className="flex items-center justify-center gap-2.5">
          <BrandDiamond size={6} color="#B0925C" />
          <span className="font-sans text-[11px] uppercase tracking-brand-wide text-stone">
            Maison Correspondence · Private Salon
          </span>
          <BrandDiamond size={6} color="#B0925C" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight font-medium">
          An invitation to stillness.
        </h2>

        {/* Intro */}
        <p className="font-editorial-italic text-base sm:text-xl text-ink/80 max-w-xl mx-auto leading-relaxed">
          Receive unhurried notes on seasonal botanical harvests, limited batch
          creations, and quiet skincare rituals.
        </p>

        <HairlineRule withDiamond={true} color="gold" className="max-w-md mx-auto my-6" />

        {/* Discrete Subscription Form */}
        {submitted ? (
          <div className="p-6 bg-champagne/30 border border-gold/40 max-w-md mx-auto">
            <p className="font-display text-xl text-ink">
              Thank you for choosing fewer, better things.
            </p>
            <p className="font-sans text-xs text-stone pt-2">
              Your correspondence address has been quietly noted.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-5 py-3.5 bg-ivory border border-stone/30 font-sans text-xs text-ink placeholder:text-stone/70 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-ink text-ivory text-xs uppercase tracking-brand-wide font-sans hover:bg-gold hover:text-ink transition-colors duration-300 shrink-0 cursor-pointer"
            >
              Request
            </button>
          </form>
        )}

        <p className="font-sans text-[10px] uppercase tracking-brand-wide text-stone pt-2">
          Calm and considered · Never urgent · No unsolicited messaging
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
