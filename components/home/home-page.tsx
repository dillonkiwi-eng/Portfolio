"use client";

import { useMemo, useState } from "react";
import { HeroEye } from "@/components/home/hero-eye";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  CaseStudyCard,
  ContentImage,
  NavigationPanel,
  TextContainer,
} from "@/src/components/ui";
import { SiteFooter } from "@/components/site-footer";
import {
  allProjects,
  CASE_DETAIL_IMAGE,
  DEFAULT_PROJECT_ICON,
  projects,
  resolveCaseStudyImage,
  type CaseStudyGalleryBlock,
  type Project,
  type ProjectCategory,
} from "@/lib/homepage-data";

function CaseStudyGalleryImage({
  imageRef,
  alt,
  sizes,
  priority,
}: {
  imageRef: Parameters<typeof resolveCaseStudyImage>[0];
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const image = resolveCaseStudyImage(imageRef, CASE_DETAIL_IMAGE);
  return (
    <ContentImage
      src={image.src}
      alt={alt}
      priority={priority}
      sizes={sizes}
      width={image.width}
      height={image.height}
    />
  );
}

function renderGalleryBlock(block: CaseStudyGalleryBlock, key: string, project: Project) {
  if (block.layout === "outcome") {
    return (
      <TextContainer
        key={key}
        heading="Outcome"
        body={project.outcome ?? project.solution}
        className="max-w-none"
      />
    );
  }

  if (block.layout === "full") {
    return <CaseStudyGalleryImage key={key} imageRef={block.image} alt="" />;
  }

  return (
    <div key={key} className="grid gap-4 md:grid-cols-2">
      <CaseStudyGalleryImage
        imageRef={block.images[0]}
        alt=""
        sizes="(max-width: 768px) 50vw, 480px"
      />
      <CaseStudyGalleryImage
        imageRef={block.images[1]}
        alt=""
        sizes="(max-width: 768px) 50vw, 480px"
      />
    </div>
  );
}

function CaseDetailPanel({ project }: { project: Project }) {
  const hero = resolveCaseStudyImage(project.images?.hero, CASE_DETAIL_IMAGE);
  const gallery = project.images?.gallery;
  const usesLegacyGallery =
    !gallery?.length &&
    (project.images?.mid || project.images?.pair || project.images?.footer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-[18px]"
    >
      <ContentImage
        src={hero.src}
        alt={`${project.title} case study preview`}
        priority
        width={hero.width}
        height={hero.height}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextContainer
          heading={project.challengeHeading ?? "Challenge"}
          body={project.challenge}
          className="max-w-none"
        />
        <TextContainer heading="Solution" body={project.solution} className="max-w-none" />
      </div>

      {gallery?.map((block, index) => renderGalleryBlock(block, `gallery-${index}`, project))}

      {usesLegacyGallery ? (
        <>
          {project.images?.mid ? (
            <CaseStudyGalleryImage imageRef={project.images.mid} alt="" />
          ) : null}
          {project.images?.pair ? (
            <div className="grid gap-4 md:grid-cols-2">
              <CaseStudyGalleryImage
                imageRef={project.images.pair[0]}
                alt=""
                sizes="(max-width: 768px) 50vw, 480px"
              />
              <CaseStudyGalleryImage
                imageRef={project.images.pair[1]}
                alt=""
                sizes="(max-width: 768px) 50vw, 480px"
              />
            </div>
          ) : null}
          <TextContainer
            heading="Outcome"
            body={project.outcome ?? project.solution}
            className="max-w-none"
          />
          {project.images?.footer ? (
            <CaseStudyGalleryImage imageRef={project.images.footer} alt="" />
          ) : null}
        </>
      ) : null}

      {project.testimonials || project.team ? (
        project.testimonials ? (
          <div className="grid gap-4 md:grid-cols-2">
            <TextContainer heading="A few kind words" body={project.testimonials} className="max-w-none" />
            <TextContainer
              heading="Focus areas"
              body={project.team ?? project.solution}
              className="max-w-none"
            />
          </div>
        ) : (
          <TextContainer
            heading="Focus areas"
            body={project.team ?? project.solution}
            className="max-w-none"
          />
        )
      ) : null}
    </motion.div>
  );
}

export function HomePage() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("work");
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "google");

  const filteredProjects = useMemo(
    () => allProjects.filter((project) => project.category === activeTab),
    [activeTab],
  );

  const workCount = allProjects.filter((p) => p.category === "work").length;
  const playCount = allProjects.filter((p) => p.category === "play").length;

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedId) ??
    filteredProjects[0] ??
    allProjects[0];

  const handleTabChange = (tab: ProjectCategory) => {
    setActiveTab(tab);
    const nextProjects = allProjects.filter((project) => project.category === tab);
    setSelectedId(nextProjects[0]?.id ?? "");
  };

  return (
    <div className="bg-ui-page transition-colors duration-200">
      <div className="flex justify-center px-[30px] pt-10 md:pt-[40px]">
        <div className="w-full max-w-[640px]">
          <NavigationPanel overlay />
        </div>
      </div>

      <section className="relative min-h-[min(900px,85svh)] overflow-visible px-[30px] pb-16">
        <div className="flex min-h-[inherit] items-center justify-center">
          <div
            className="relative z-0 aspect-[1125/500] w-[min(1125px,90vw)] max-w-none"
            role="img"
            aria-label="Dillon Ramesh"
          >
            <HeroEye className="absolute inset-0" />
          </div>
        </div>
      </section>

      <section className="bg-ui-elevated px-[30px] pb-20 pt-[68px] transition-colors duration-200">
        <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-4">
          <aside className="flex flex-col gap-3 pt-6 lg:sticky lg:top-8 lg:self-start">
            <div className="flex gap-2">
              <div className="min-w-0 flex-1">
                <Button
                  label="Work"
                  count={workCount}
                  isActive={activeTab === "work"}
                  onClick={() => handleTabChange("work")}
                />
              </div>
              <div className="min-w-0 flex-1">
                <Button
                  label="Play"
                  count={playCount}
                  isActive={activeTab === "play"}
                  onClick={() => handleTabChange("play")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredProjects.map((project) => (
                <CaseStudyCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  iconUrl={project.iconUrl ?? DEFAULT_PROJECT_ICON}
                  variant="compact"
                  isSelected={selectedProject?.id === project.id}
                  onClick={() => setSelectedId(project.id)}
                />
              ))}
            </div>
          </aside>

          <div className="min-w-0 pt-6 lg:pt-0">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <CaseDetailPanel key={selectedProject.id} project={selectedProject} />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
