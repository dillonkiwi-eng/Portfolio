"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContentImage, NavigationPanel, TextContainer } from "@/src/components/ui";
import { SiteFooter } from "@/components/site-footer";
import { aboutContent, aboutImages } from "@/lib/about-data";

const PAGE_EASE = [0.22, 1, 0.36, 1] as const;

const pageReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: PAGE_EASE },
  },
};

const contentStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: PAGE_EASE },
  },
};

export function AboutPage() {
  const reduceMotion = useReducedMotion();
  const motionState = reduceMotion ? "visible" : "hidden";

  return (
    <motion.div
      className="bg-ui-nav-gradient min-h-dvh transition-colors duration-200"
      initial={motionState}
      animate="visible"
      variants={pageReveal}
    >
      <motion.header
        className="relative z-30 flex w-full justify-center px-[30px] pb-12 pt-10 md:pt-[40px]"
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: PAGE_EASE, delay: reduceMotion ? 0 : 0.05 }}
      >
        <div className="w-full max-w-[640px]">
          <NavigationPanel overlay />
        </div>
      </motion.header>

      <motion.main
        className="mx-auto flex w-full max-w-[932px] flex-col gap-[18px] px-[30px] pb-[120px]"
        initial={motionState}
        animate="visible"
        variants={contentStagger}
      >
        <motion.div variants={sectionReveal}>
          <ContentImage
            src={aboutImages.hero.src}
            alt="Dillon Ramesh"
            priority
            width={aboutImages.hero.width}
            height={aboutImages.hero.height}
          />
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-4 md:grid-cols-2">
          <TextContainer
            heading={aboutContent.experience.heading}
            body={aboutContent.experience.body}
            className="max-w-none"
          />
          <TextContainer
            heading={aboutContent.offline.heading}
            body={aboutContent.offline.body}
            className="max-w-none"
          />
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-4 md:grid-cols-2">
          <ContentImage
            src={aboutImages.pair[0].src}
            alt=""
            sizes="(max-width: 768px) 50vw, 458px"
            width={aboutImages.pair[0].width}
            height={aboutImages.pair[0].height}
          />
          <ContentImage
            src={aboutImages.pair[1].src}
            alt=""
            sizes="(max-width: 768px) 50vw, 458px"
            width={aboutImages.pair[1].width}
            height={aboutImages.pair[1].height}
          />
        </motion.div>
      </motion.main>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: PAGE_EASE, delay: reduceMotion ? 0 : 0.35 }}
      >
        <SiteFooter />
      </motion.div>
    </motion.div>
  );
}
