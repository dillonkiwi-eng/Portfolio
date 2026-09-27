export interface TextContainerProps {
  heading: string;
  body: string;
  className?: string;
  size?: "default" | "large";
}

export function TextContainer({
  heading,
  body,
  className = "",
  size = "default",
}: TextContainerProps) {
  const isLarge = size === "large";

  return (
    <section
      className={[
        "flex w-full flex-col items-start rounded-[16px] bg-ui-surface p-5",
        isLarge ? "h-[301px] max-w-none" : "h-[240px] max-w-[458px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "flex w-full flex-col gap-[11px] text-ui-text",
          isLarge ? "text-[20px]" : "text-[14px]",
        ].join(" ")}
      >
        <h3
          className={[
            "shrink-0 leading-[1.2] opacity-70",
            isLarge ? "tracking-[-0.2px]" : "tracking-[-0.14px]",
          ].join(" ")}
        >
          {heading}
        </h3>
        <p
          className={[
            "leading-[1.4]",
            isLarge ? "tracking-[-0.4px]" : "tracking-[-0.28px]",
          ].join(" ")}
        >
          {body}
        </p>
      </div>
    </section>
  );
}
