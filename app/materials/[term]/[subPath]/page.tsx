import { DriveExplorer } from "@/components/drive-explorer"

interface SubFolderPageProps {
  params: Promise<{
    term: string
    subPath: string[]
  }>
}

export default async function SubFolderPage({ params }: SubFolderPageProps) {
  const { term, subPath } = await params

  return <DriveExplorer termSlug={term} subPath={subPath} />
}
