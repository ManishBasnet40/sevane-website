import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-[#586345] text-[#F8F8F3] hover:bg-[#414B32] hover:shadow-lg",
  secondary:
    "bg-[#E4E7D5] text-[#292B24] hover:bg-[#D6DAC5]",
  outline:
    "border border-[#586345] text-[#586345] hover:bg-[#586345] hover:text-[#F8F8F3]",
};

const sizes = {
  sm: "min-h-10 px-6 text-xs",
  md: "min-h-12 px-8 text-sm",
  lg: "min-h-14 px-10 text-sm",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "lg",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const styles = `inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-[0.12em] transition duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} onClick={onClick} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}