import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function GradientText({ children, className = "", as: Tag = "span" }: Props) {
  return (
    <Tag
      className={`bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </Tag>
  );
}
