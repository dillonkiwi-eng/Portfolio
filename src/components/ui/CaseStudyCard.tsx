"use client";

import Image from "next/image";

export interface CaseStudyCardProps {
  title: string;
  description: string;
  iconUrl?: string;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
  isSelected?: boolean;
}

const DEFAULT_THUMBNAIL = "/assets/ui/case-study-thumbnail.png";

export function CaseStudyCard({
  title,
  description,
  iconUrl = DEFAULT_THUMBNAIL,
  className = "",
  onClick,
  variant = "default",
  isSelected = false,
}: CaseStudyCardProps) {
  const isCompact = variant === "compact";
  const Component = onClick ? "button" : "article";

  return (
    <Component
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={[
        "group flex w-full items-center gap-4 rounded-[16px] p-4 text-left transition-colors duration-200 ease-out",
        isCompact ? "gap-4" : "h-[118px] max-w-[520px]",
        isSelected ? "bg-ui-surface-selected" : "bg-ui-surface",
        "hover:bg-ui-surface-hover active:bg-ui-surface-active",
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "relative shrink-0 overflow-hidden",
          isCompact ? "size-16 rounded-[10px]" : "size-[78px] rounded-[12px]",
        ].join(" ")}
      >
        <Image
          src={iconUrl}
          alt=""
          fill
          className="object-cover"
          sizes={isCompact ? "64px" : "78px"}
        />
      </div>

      <div
        className={[
          "flex min-w-0 flex-1 flex-col",
          isCompact ? "gap-1 text-[14px]" : "gap-2 text-[16px]",
        ].join(" ")}
      >
        <p
          className={[
            "shrink-0 leading-[1.2] text-ui-text",
            isCompact ? "tracking-[-0.14px]" : "h-5 tracking-[-0.16px]",
          ].join(" ")}
        >
          {title}
        </p>
        <p
          className={[
            "line-clamp-2 leading-[1.4] text-ui-text-muted",
            isCompact ? "" : "tracking-[-0.32px]",
          ].join(" ")}
        >
          {description}
        </p>
      </div>
    </Component>
  );
}
