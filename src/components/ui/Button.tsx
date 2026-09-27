"use client";

import Link from "next/link";

export interface ButtonProps {
  label: string;
  count?: string | number;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  className?: string;
  size?: "default" | "nav";
  href?: string;
}

export function Button({
  label,
  count,
  isActive = true,
  onClick,
  className = "",
  size = "default",
  href,
}: ButtonProps) {
  const isNav = size === "nav";

  const classes = [
    "flex w-full cursor-pointer items-center rounded-[16px] p-5",
    isNav
      ? "text-[16px] leading-[1.2] tracking-[-0.16px]"
      : "text-[18px] leading-[1.2] tracking-[-0.18px]",
    "transition-colors duration-200 ease-out",
    isActive
      ? "bg-ui-surface text-ui-text hover:bg-ui-surface-hover active:bg-ui-surface-active"
      : "bg-ui-surface-subtle text-ui-text-secondary hover:bg-ui-surface-hover hover:text-ui-text active:bg-ui-surface-active",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="min-w-0 flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className="shrink-0 whitespace-nowrap text-center">
          ( {count} )
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
