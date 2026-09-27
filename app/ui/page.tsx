"use client";

import {
  Button,
  CaseStudyCard,
  NavigationPanel,
  TextContainer,
} from "@/src/components/ui";

export default function UiPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 bg-ui-page px-6 py-16 transition-colors duration-200">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-ui-text-muted">
          Components
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-ui-text">
          Design x Dillon — UI Sheet
        </h1>
      </header>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-ui-text-muted">Navigation Panel</h2>
        <NavigationPanel />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-ui-text-muted">Button / Tabs</h2>
        <div className="flex max-w-xl flex-wrap gap-4">
          <div className="w-[266px]">
            <Button label="Work" count={6} isActive />
          </div>
          <div className="w-[266px]">
            <Button label="Work" count={6} isActive={false} />
          </div>
          <div className="w-[291px]">
            <Button label="About" count={12} />
          </div>
          <div className="w-[291px]">
            <Button label="Contact" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-ui-text-muted">Case Study Card</h2>
        <CaseStudyCard
          title="Google"
          description="Enterprise scale & sales agents. Thousands of sellers. Thousands of products. Endless sales"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium text-ui-text-muted">Text Container</h2>
        <TextContainer
          heading="Challenge"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        />
      </section>
    </div>
  );
}
