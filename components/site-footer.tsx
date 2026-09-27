import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ui-border bg-ui-elevated px-[30px] py-[60px] transition-colors duration-200">
      <div className="mx-auto flex max-w-[1456px] flex-col items-center justify-between gap-8 md:flex-row">
        <Image
          src="/assets/homepage/footer-logo.svg"
          alt="Dillon Ramesh"
          width={72}
          height={32}
          className="h-8 w-[72px] dark:invert"
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="mailto:hello@dillon.com"
            className="rounded-full px-4 py-2 text-[16px] leading-[1.5] text-ui-text transition-colors hover:bg-[var(--ui-hover-overlay)]"
          >
            hello@dillon.com
          </Link>
          <Link
            href="https://linkedin.com"
            className="rounded-full px-4 py-2 text-[16px] leading-[1.5] text-ui-text transition-colors hover:bg-[var(--ui-hover-overlay)]"
          >
            IN
          </Link>
          <Link
            href="https://linkedin.com"
            className="rounded-full px-4 py-2 text-[16px] leading-[1.5] text-ui-text transition-colors hover:bg-[var(--ui-hover-overlay)]"
          >
            LI
          </Link>
        </div>
      </div>
    </footer>
  );
}
