import React from "react";
import BrandDiamond from "../brand/BrandDiamond";

interface HairlineRuleProps {
  className?: string;
  withDiamond?: boolean;
  color?: "gold" | "stone" | "ink";
}

export const HairlineRule: React.FC<HairlineRuleProps> = ({
  className = "",
  withDiamond = false,
  color = "gold",
}) => {
  const borderColor =
    color === "gold"
      ? "border-[#B0925C]/35"
      : color === "stone"
      ? "border-[#8C887C]/30"
      : "border-[#30302B]/20";

  const diamondColor =
    color === "gold" ? "#B0925C" : color === "stone" ? "#8C887C" : "#30302B";

  if (!withDiamond) {
    return <hr className={`w-full border-0 border-t ${borderColor} ${className}`} />;
  }

  return (
    <div className={`flex items-center justify-center w-full my-6 ${className}`}>
      <div className={`flex-1 border-t ${borderColor}`} />
      <div className="px-4">
        <BrandDiamond size={7} color={diamondColor} />
      </div>
      <div className={`flex-1 border-t ${borderColor}`} />
    </div>
  );
};

export default HairlineRule;
