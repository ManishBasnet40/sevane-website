import React from "react";
import Image from "next/image";
import { OFFICIAL_ASSETS } from "@/lib/constants/assets";

interface BrandLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  width = 180,
  height = 96,
  priority = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{
        // Maintain minimum brand screen width rule (120px)
        minWidth: "120px",
      }}
    >
      <Image
        src={OFFICIAL_ASSETS.logo}
        alt="Sévane — Maison de Créations"
        width={width}
        height={height}
        priority={priority}
        className="w-auto h-auto max-h-full object-contain"
      />
    </div>
  );
};

export default BrandLogo;
