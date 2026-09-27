type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WorkCaseStudyPage({ params }: WorkPageProps) {
  const { slug } = await params;

  return (
    <div className="page-shell">
      <p className="page-shell__eyebrow">Case study</p>
      <h1 className="page-shell__title">{slug}</h1>
      <p className="page-shell__lede">Shared case study template — coming soon.</p>
    </div>
  );
}
