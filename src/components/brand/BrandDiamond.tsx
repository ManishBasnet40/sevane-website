import React from "react";

interface BrandDiamondProps {
  className?: string;
  size?: number;
  color?: string;
}

export const BrandDiamond: React.FC<BrandDiamondProps> = ({
  className = "",
  size = 6,
  color = "#B0925C",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="currentColor"
      className={`inline-block ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <polygon points="5,0 10,5 5,10 0,5" />
    </svg>
  );
};

export default BrandDiamond;
