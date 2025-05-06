
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2 mb-8",
        centered && "text-center",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-herbal-text-secondary text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
