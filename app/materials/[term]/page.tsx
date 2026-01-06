import { DriveExplorer } from "@/components/drive-explorer"

interface MaterialsPageProps {
  params: Promise<{
    term: string
  }>
}

export default async function MaterialsPage({ params }: MaterialsPageProps) {
  const { term } = await params

  return <DriveExplorer termSlug={term} />
}

export function generateStaticParams() {
  return [
    { term: "term-1" },
    { term: "term-2" },
    { term: "term-3" },
    { term: "term-4" },
    { term: "term-5" },
    { term: "term-6" },
    { term: "term-7" },
    { term: "term-8" },
  ]
}
