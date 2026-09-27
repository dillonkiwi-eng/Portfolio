export type ProjectCategory = "work" | "play";

export interface CaseStudyImageAsset {
  src: string;
  width: number;
  height: number;
}

export type CaseStudyImageRef = string | CaseStudyImageAsset;

export type CaseStudyGalleryBlock =
  | { layout: "full"; image: CaseStudyImageRef }
  | { layout: "pair"; images: [CaseStudyImageRef, CaseStudyImageRef] }
  | { layout: "outcome" };

export interface CaseStudyImages {
  hero: CaseStudyImageRef;
  /** Ordered image blocks after Challenge/Solution (matches Figma Details Container). */
  gallery?: CaseStudyGalleryBlock[];
  mid?: CaseStudyImageRef;
  pair?: [CaseStudyImageRef, CaseStudyImageRef];
  footer?: CaseStudyImageRef;
}

export function resolveCaseStudyImage(
  value: CaseStudyImageRef | undefined,
  fallbackSrc: string,
): { src: string; width?: number; height?: number } {
  if (!value) return { src: fallbackSrc };
  if (typeof value === "string") return { src: value };
  return value;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  iconUrl?: string;
  images?: CaseStudyImages;
  challenge: string;
  solution: string;
  challengeHeading?: string;
  outcome?: string;
  testimonials?: string;
  team?: string;
}

export const projects: Project[] = [
  {
    id: "google",
    title: "Google Cloud Consulting",
    description:
      "Enterprise scale & sales agents. Thousands of sellers. Thousands of products. Streamlining sales",
    category: "work",
    iconUrl: "/assets/homepage/Google cloud.svg",
    images: {
      hero: { src: "/assets/homepage/google-hero.png", width: 2916, height: 1500 },
      gallery: [
        {
          layout: "full",
          image: { src: "/assets/homepage/google-process-01.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/google-process-02.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/google-process-03.png", width: 1434, height: 1500 },
          ],
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/google-gemini.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/google-process-05.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/google-process-06.png", width: 1434, height: 1500 },
          ],
        },
      ],
    },
    challenge:
      "Google Cloud sellers had no unified library of Cloud solutions proposals, sales decks, and the context behind these offerings were scattered across disparate sites and tools. Already time-poor, sellers were left searching and reaching out to teams, instead of selling, delaying projects before they'd even started.",
    solution:
      "We built a sales platform powered AI agents that surface the right information instantly using Gemini to turn raw data into sales collateral, build decks, and uncover new upsell opportunities with their clients. Sellers save hours, and customers get solutions shaped by the full dataset.",
    outcome:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    team: "User experience, Interface, Design systems and Product Strategy",
  },
  {
    id: "your-avatar",
    title: "Your Avatar",
    description:
      "Loneliness growing. Care stretched. Companionship reimagined. AI companionship designed for care.",
    category: "work",
    iconUrl: "/assets/homepage/Youravatar.svg",
    images: {
      hero: { src: "/assets/homepage/YA/youravatar-process-01.png", width: 2916, height: 1500 },
      gallery: [
        {
          layout: "full",
          image: { src: "/assets/homepage/YA/youravatar-process-02.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/YA/youravatar-process-03.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/YA/youravatar-process-04.png", width: 1434, height: 1500 },
          ],
        },
        { layout: "outcome" },
        {
          layout: "full",
          image: { src: "/assets/homepage/YA/youravatar-process-05.png", width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/YA/youravatar-process-06.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/YA/youravatar-process-07.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/YA/youravatar-process-08.png", width: 1434, height: 1500 },
          ],
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/YA/youravatar-process-09.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/YA/youravatar-process-10.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/YA/youravatar-process-11.png", width: 1434, height: 1500 },
          ],
        },
      ],
    },
    challenge:
      "Your Avatar started with a hard question: how can AI genuinely support people facing loneliness and early-stage dementia. The founding team already worked in end of life and memory preservation technology through a sister business focused on capturing life stories and digital legacies. That experience exposed a broader opportunity.",
    solution:
      "An AI companionship platform combining conversational AI with avatar technology to create more human, emotionally engaging interactions for people who may otherwise lack consistent companionship.\n\nOne that had to feel emotionally safe, simple, and human, for care homes, families, and elderly users all at once",
    outcome:
      "The result was a launch-ready MVP focused on landing initial care home partnerships, helping care providers introduce AI companionship with minimal operational overhead while creating real engagement for residents.\n\nAlong the way, we learned to balance conversational realism and emotional warmth with factual accuracy and safety guardrails, making the AI feel human on the personal details that mattered. Rather than treating launch as the finish line, Your Avatar was designed as the start of a longer learning cycle, with real-world usage shaping how it evolves. We are currently working on phase 2, which includes conversational design, memory loops and more valuable features for users.",
    team: "Branding, User experience, Interface and Product Strategy",
  },
  {
    id: "tesco",
    title: "Tesco",
    description:
      "Creative approvals used to take four weeks. AI-powered compliance got it down to days.",
    category: "work",
    iconUrl: "/assets/homepage/tesco.svg",
    images: {
      hero: { src: "/assets/homepage/tesco/tesco-hero.png", width: 2916, height: 1500 },
      gallery: [
        {
          layout: "full",
          image: { src: "/assets/homepage/tesco/tesco-process-01.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/tesco/tesco-process-02.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/tesco/tesco-process-03.png", width: 1434, height: 1500 },
          ],
        },
        { layout: "outcome" },
        {
          layout: "full",
          image: { src: "/assets/homepage/tesco/tesco-process-04.png", width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/tesco/tesco-process-05.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/tesco/tesco-process-06.png", width: 1434, height: 1500 },
            {
              src: "/assets/homepage/tesco/tesco-process-06-1.png",
              width: 1434,
              height: 1500,
            },
          ],
        },
      ],
    },
    challenge:
      "Retail brands were waiting up to four weeks to get ads live on Tesco Media. Every asset had to clear complex compliance checks and manual reviews with endless back-and-forth. Marketing teams were stuck before they'd even started.",
    solution:
      "We built an AI compliance tool into Tesco's existing workflow, scanning every asset against guidelines to flag and fix issues automatically. Alongside it, we built an ad builder with guardrails in place that let marketing teams create assets from the canvas and quickly generate formats for other marketing channels.",
    outcome:
      "Campaigns that once took four weeks to approve now moved through in days. removing a major blocker between brands and their campaigns, and proving the most valuable AI is the kind that removes friction from systems people already depend on. This platform has been widely sold as a service to Tesco’s partnered brands to use.",
    testimonials: undefined,
    team: "User experience, Interface, Design systems and Product Strategy",
  },
  {
    id: "bakkt",
    title: "Bakkt",
    description:
      "Enterprise scale & sales agents. Thousands of sellers. Thousands of products. Endless sales",
    category: "work",
    iconUrl: "/assets/homepage/bakkt.svg",
    images: {
      hero: { src: "/assets/homepage/bakkt/bakkt-hero.png", width: 2916, height: 1500 },
      gallery: [
        {
          layout: "full",
          image: { src: "/assets/homepage/bakkt/bakkt-process-01.png", width: 3000, height: 1500 },
        },
        { layout: "outcome" },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/bakkt/bakkt-process-02.png", width: 1548, height: 1500 },
            { src: "/assets/homepage/bakkt/bakkt-process-03.png", width: 1548, height: 1500 },
          ],
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/bakkt/bakkt-process-04.png", width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/bakkt/bakkt-process-05.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/bakkt/bakkt-process-06.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/bakkt/bakkt-process-07.png", width: 1434, height: 1500 },
          ],
        },
      ],
    },
    challenge:
      "Digital assets had multiplied faster than the tools to manage them. Trillions of dollars in value sat locked across disconnected platforms, each with its own login, its own rules, and its own friction. For most people, using what they owned meant juggling apps rather than actually spending or trading freely.",
    solution:
      "Bakkt brought it all into one place. a single platform to aggregate, trade, transfer, convert, and pay with any digital asset, however you wanted to use it.",
    outcome:
      "I led end-to-end UX/UI, working closely with product and engineering to make asset management feel effortless rather than technical then rebuilt the design system underneath it so the experience could scale consistently across every new feature. That rebuild cut design debt by 40% and gave engineering a scalable foundation to build on. A new developer API dashboard followed the same principle, reducing support requests by 45% and freeing the team to focus on the features that mattered most.",
    testimonials:
      "We really valued our working relationship with Dillon. He played a pivotal role in elevating our feature sets and building a robust design system. The Bakkt team have benefited from his work and attention to detail.\n\nKris Krava, Lead Designer at Bakkt",
    team: "User experience, Development portal and Product Strategy",
  },
  {
    id: "spinaway",
    title: "Spinaway",
    description: "Putting a spin on all things laundry.",
    category: "work",
    iconUrl: "/assets/homepage/spinaway-icon.svg",
    images: {
      hero: { src: "/assets/homepage/spinaway/spinaway-hero.png", width: 2916, height: 1500 },
      gallery: [
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/spinaway/spinaway-process-01.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/spinaway/spinaway-process-02.png", width: 1434, height: 1500 },
          ],
        },
        { layout: "outcome" },
        {
          layout: "full",
          image: { src: "/assets/homepage/spinaway/spinaway-process-03.png", width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/spinaway/spinaway-process-04.png", width: 2916, height: 1500 },
        },
        {
          layout: "pair",
          images: [
            { src: "/assets/homepage/spinaway/spinaway-process-05.png", width: 1434, height: 1500 },
            { src: "/assets/homepage/spinaway/spinaway-process-06.png", width: 1434, height: 1500 },
          ],
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/spinaway/spinaway-process-07.png", width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: "/assets/homepage/spinaway/spinaway-process-08.png", width: 2916, height: 1500 },
        },
      ],
    },
    challenge:
      "Laundry is inconvenient, time-consuming, and hard to avoid, yet most people are stuck with the same limited options: do it yourself, or find a laundromat that works around your schedule, not the other way round.",
    solution:
      "Spinaway connects people who have laundry to do with people who love to do laundry, via an easy-to-use app. Customers tick a big chore off the to-do list, while Spinners (people who do the washing) earn money from the comfort of home.",
    outcome:
      "As the Design Lead, I established DesignOps processes and guided the product from ideation to market, working closely with Paloma’s visual design team to craft a compelling brand experience. We rapidly designed, built, and launched Spinaway in central Sydney. Within just three months of launch, Spinaway onboarded 50 Spinners and attracted over 400 customers, with engagement and growth continuing to accelerate.",
    testimonials:
      "Dillon played a fundamental role in shaping Spinaway's brand and app experience. Our working relationship with him was highly valuable and appreciated.\n\nAndrew Clarke, Founder of Spinaway",
    team: "Branding, User experience, Interface and Strategy",
  },
];

const OUTBOUND_ASSET_BASE = "/assets/homepage/Outbound";
const BEAUFORT_ASSET_BASE = "/assets/homepage/Beaufort";

export const playProjects: Project[] = [
  {
    id: "play-1",
    title: "Vayla",
    category: "play",
    iconUrl: "/assets/homepage/Vayla/Vayla-thumbnail.png",
    description: "Vayla brings meditation, mood tracking, and movement into one calm space.",
    challenge:
      "Most mindfulness apps are loud, meditation becomes a metric, and different techniques end up scattered across disparate tools instead of one unified platform.",
    solution:
      "Vayla as an open, organic space, bringing meditation, movement, mood tracking into one calm experience.",
    testimonials: undefined,
    team: undefined,
    images: {
      hero: { src: "/assets/homepage/Vayla/vayla-hero.png", width: 2916, height: 1500 },
      gallery: [
        {
          layout: "full",
          image: {
            src: "/assets/homepage/Vayla/vayloa-process-01.png",
            width: 2916,
            height: 1500,
          },
        },
        {
          layout: "full",
          image: {
            src: "/assets/homepage/Vayla/vayloa-process-02.png",
            width: 2916,
            height: 1500,
          },
        },
      ],
    },
  },
  {
    id: "outbound",
    title: "Outbound",
    category: "play",
    iconUrl: `${OUTBOUND_ASSET_BASE}/Outbound-icon.svg`,
    description:
      "Outbound connects travellers with local hosts, turning trips into genuine exchange instead of a packaged itinerary",
    challengeHeading: "Problem",
    challenge:
      "Most travel platforms chase money grabs, landmarks, and cliché hotspots - what to see, not who you meet. Travellers end up with little real connection to local communities and don’t get to see if through a local lens.",
    solution:
      "Outbound connects travellers directly with local hosts and guides, designing every trip around connection. By putting locals at the centre of the experience and more of the spend directly in their hands, the platform makes sustainable, community-first travel the easiest option, not the harder one.",
    testimonials: undefined,
    team: undefined,
    images: {
      hero: { src: `${OUTBOUND_ASSET_BASE}/Outbound-hero.png`, width: 2916, height: 1500 },
      gallery: [
        {
          layout: "pair",
          images: [
            { src: `${OUTBOUND_ASSET_BASE}/outbound-process-01.png`, width: 1434, height: 1500 },
            { src: `${OUTBOUND_ASSET_BASE}/outbound-process-02.png`, width: 1434, height: 1500 },
          ],
        },
        {
          layout: "full",
          image: { src: `${OUTBOUND_ASSET_BASE}/outbound-process-03.png`, width: 2916, height: 1500 },
        },
      ],
    },
  },
  {
    id: "beaufort",
    title: "Beaufort",
    category: "play",
    iconUrl: `${BEAUFORT_ASSET_BASE}/Beaufort-thumbnail.png`,
    description: "A luxury watch brand, built on heritage and precision.",
    challengeHeading: "Problem",
    challenge:
      "Launching a luxury watch brand from scratch meant more than designing a simple brand. It meant earning trust in a category built entirely on heritage and precision. Beaufort needed an identity, a name, and a story confident enough to sit alongside established watchmakers, without the years of history those brands lean on.",
    solution:
      "Drawing on the WWII instruments, particularly the Beaufort aerotimer, I built a brand identity that borrowed historical gravitas and paired it with contemporary design, from product naming through to visual identity. The website was crafted like an elegant magazine, using editorial typography, generous white space, and a grid system that mirrors classic print layouts.",
    testimonials: undefined,
    team: undefined,
    images: {
      hero: { src: `${BEAUFORT_ASSET_BASE}/Beaufort-hero.png`, width: 2916, height: 1500 },
      gallery: [
        {
          layout: "pair",
          images: [
            { src: `${BEAUFORT_ASSET_BASE}/beaufort-process-01.png`, width: 1434, height: 1500 },
            { src: `${BEAUFORT_ASSET_BASE}/beaufort-process-02.png`, width: 1434, height: 1500 },
          ],
        },
        {
          layout: "full",
          image: { src: `${BEAUFORT_ASSET_BASE}/beaufort-process-03.png`, width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: `${BEAUFORT_ASSET_BASE}/beaufort-process-04.png`, width: 2916, height: 1500 },
        },
        {
          layout: "full",
          image: { src: `${BEAUFORT_ASSET_BASE}/beaufort-process-05.png`, width: 2916, height: 1500 },
        },
      ],
    },
  },
];

export const allProjects = [...projects, ...playProjects];

export const DEFAULT_PROJECT_ICON = "/assets/homepage/card-thumbnail.png";
export const CASE_DETAIL_IMAGE = "/assets/homepage/case-detail-hero.png";
