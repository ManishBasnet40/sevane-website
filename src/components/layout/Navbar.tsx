
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OFFICIAL_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO, NAV_LINKS } from "@/lib/constants/brand";

export const Navbar: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuOpenRef = useRef(false);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 25) {
        setIsNavbarVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (mobileMenuOpenRef.current) {
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsNavbarVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    setMobileMenuOpen((previous) => {
      const next = !previous;

      if (next) {
        setIsNavbarVisible(true);
      }

      return next;
    });
  };

  return (
    <>
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          transition-transform duration-500
          ${
            isNavbarVisible
              ? "translate-y-0"
              : "-translate-y-full"
          }
        `}
      >
        {/* Wider full-screen navbar container */}
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4 md:px-16 lg:px-20 xl:px-24 md:py-5">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Sévane Home"
            className="relative h-12 w-32 md:h-14 md:w-44"
          >
            <Image
              src={OFFICIAL_ASSETS.logo}
              alt={BRAND_INFO.name}
              fill
              priority
              sizes="(max-width: 768px) 128px, 176px"
              className="object-contain object-left"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  group relative
                  font-sans
                  text-[10px]
                  uppercase
                  tracking-[0.24em]
                  text-white/90
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                {item.label}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-[#B0925C]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>
            ))}
          </nav>

          {/* Explore Rituals */}
          <Link
            href="#rituals"
            className="
              hidden
              border
              border-white/50
              px-5
              py-2.5
              font-sans
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white
              transition-all
              duration-300
              hover:border-white
              hover:bg-white
              hover:text-[#30302B]
              md:inline-flex
            "
          >
            Explore Rituals
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={mobileMenuOpen}
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                mobileMenuOpen
                  ? "translate-y-[3px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-px w-6 bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                mobileMenuOpen
                  ? "-translate-y-[3px] -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-40
          flex flex-col justify-between
          bg-[#F8F8F3]
          px-8 py-28
          transition-all duration-500
          md:hidden
          ${
            mobileMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          }
        `}
      >
        <nav className="flex flex-col gap-6">
          <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-[#8C887C]">
            Navigation
          </span>

          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="
                font-display
                text-4xl
                text-[#30302B]
                transition-colors
                hover:text-[#B0925C]
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#30302B]/15 pt-6">
          <p className="font-editorial-italic text-sm text-[#8C887C]">
            {BRAND_INFO.essence}
          </p>

          <p className="mt-3 font-sans text-[9px] uppercase tracking-[0.28em] text-[#8C887C]">
            {BRAND_INFO.descriptor}
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
