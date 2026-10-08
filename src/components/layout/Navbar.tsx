"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OFFICIAL_ASSETS } from "@/lib/constants/assets";
import { BRAND_INFO, NAV_LINKS } from "@/lib/constants/brand";

export const Navbar: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const mobileMenuOpenRef = useRef(false);

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY <= 25);

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

    setIsAtTop(window.scrollY <= 25);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

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
          fixed
          inset-x-0
          top-0
          z-50
          transition-all
          duration-500
          ${
            isNavbarVisible
              ? "translate-y-0"
              : "-translate-y-full"
          }
          ${
            isAtTop
              ? "bg-transparent"
              : "bg-white"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            w-full
            items-center
            justify-between
            px-6
            py-4
            md:px-16
            md:py-5
            lg:px-20
            xl:px-24
          "
        >
          <Link
            href="/"
            aria-label="Sévane Home"
            className="
              relative
              flex
              h-14
              w-44
              shrink-0
              items-center
              md:h-16
              md:w-52
            "
          >
            <Image
              src={OFFICIAL_ASSETS.logo}
              alt={BRAND_INFO.name}
              fill
              priority
              sizes="(max-width: 768px) 176px, 208px"
              className="
                object-contain
                object-left
              "
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  group
                  relative
                  whitespace-nowrap
                  font-sans
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  transition-colors
                  duration-500
                  ${
                    isAtTop
                      ? "text-white"
                      : "text-[#30302B]"
                  }
                `}
              >
                {item.label}

                <span
                  className="
                    absolute
                    -bottom-1.5
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

          <Link
            href="#rituals"
            className={`
              hidden
              items-center
              justify-center
              border
              px-6
              py-3
              font-sans
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              transition-all
              duration-500
              md:inline-flex
              ${
                isAtTop
                  ? "border-white/70 text-white hover:border-white hover:bg-white hover:text-[#30302B]"
                  : "border-[#30302B]/40 text-[#30302B] hover:border-[#30302B] hover:bg-[#30302B] hover:text-white"
              }
            `}
          >
            Explore Rituals
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="
              flex
              h-12
              w-12
              shrink-0
              flex-col
              items-center
              justify-center
              gap-1.5
              md:hidden
            "
          >
            <span
              className={`h-[2px] w-6 transition-all duration-300 ${
                isAtTop
                  ? "bg-white"
                  : "bg-[#30302B]"
              } ${
                mobileMenuOpen
                  ? "translate-y-[3.5px] rotate-45"
                  : ""
              }`}
            />

            <span
              className={`h-[2px] w-6 transition-all duration-300 ${
                isAtTop
                  ? "bg-white"
                  : "bg-[#30302B]"
              } ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-[2px] w-6 transition-all duration-300 ${
                isAtTop
                  ? "bg-white"
                  : "bg-[#30302B]"
              } ${
                mobileMenuOpen
                  ? "-translate-y-[3.5px] -rotate-45"
                  : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        className={`
          fixed
          inset-0
          z-40
          flex
          flex-col
          justify-between
          bg-[#F8F8F3]
          px-8
          py-28
          transition-all
          duration-500
          md:hidden
          ${
            mobileMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          }
        `}
      >
        <nav className="flex flex-col gap-6">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#8C887C]">
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
                leading-tight
                text-[#30302B]
                transition-colors
                duration-300
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

          <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#8C887C]">
            {BRAND_INFO.descriptor}
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;