import Image from "next/image";

export interface ContentImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
  quality?: number;
  width?: number;
  height?: number;
}

/** Case-study PNGs/JPEGs from /public — already exported at high resolution from Figma. */
function shouldServeOriginal(src: string) {
  return (
    src.startsWith("/assets/") && /\.(png|jpe?g)$/i.test(src.split("?")[0] ?? "")
  );
}

export function ContentImage({
  src,
  alt,
  className = "h-[500px]",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, min(960px, 65vw)",
  imageClassName = "object-cover",
  quality = 95,
  width,
  height,
}: ContentImageProps) {
  const serveOriginal = shouldServeOriginal(src);
  const useIntrinsicLayout = width != null && height != null;

  if (useIntrinsicLayout) {
    return (
      <div className="overflow-hidden rounded-[16px]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={["h-auto w-full", imageClassName].filter(Boolean).join(" ")}
          sizes={sizes}
          priority={priority}
          quality={quality}
          unoptimized={serveOriginal}
        />
      </div>
    );
  }

  return (
    <div
      className={["relative overflow-hidden rounded-[16px]", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes={sizes}
        priority={priority}
        quality={quality}
        unoptimized={serveOriginal}
      />
    </div>
  );
}
