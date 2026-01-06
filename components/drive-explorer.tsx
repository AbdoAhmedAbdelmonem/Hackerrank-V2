"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Folder, 
  File, 
  FilePdf, 
  FileDoc, 
  FileXls, 
  Image, 
  Video,
  CaretLeft,
  House,
  Download,
  User,
  Clock,
  SpinnerGap
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import {
  DriveFile,
  fetchDriveItems,
  fetchFolderName,
  getFileViewUrl,
  getFileDownloadUrl,
  formatOwnerName,
  formatFileSize,
  TERM_FOLDERS,
} from "@/lib/drive-config"

interface DriveExplorerProps {
  termSlug: string
  subPath?: string[]
}

export function DriveExplorer({ termSlug, subPath = [] }: DriveExplorerProps) {
  const [files, setFiles] = useState<DriveFile[]>([])
  const [folderName, setFolderName] = useState<string>("Loading...")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ name: string; path: string }>>([])

  const termInfo = TERM_FOLDERS[termSlug]

  // Get current folder ID from subPath
  const currentFolderId = subPath.length > 0 ? subPath[subPath.length - 1] : termInfo?.id
  
  // Memoize subPath as a string to prevent infinite loops
  const subPathKey = subPath.join("/")

  useEffect(() => {
    if (!termInfo) {
      setError("Invalid term")
      setLoading(false)
      return
    }

    async function loadData() {
      setLoading(true)
      setError(null)
      
      try {
        console.log("Loading data for folder:", currentFolderId)
        const [items, name] = await Promise.all([
          fetchDriveItems(currentFolderId),
          fetchFolderName(currentFolderId),
        ])
        
        console.log("Loaded items:", items)
        setFiles(items)
        setFolderName(name)
        
        // Build breadcrumbs
        const crumbs = [{ name: termInfo.name, path: `/materials/${termSlug}` }]
        
        // For subfolders, we need to fetch each folder name
        if (subPath.length > 0) {
          for (let i = 0; i < subPath.length; i++) {
            const folderPath = subPath.slice(0, i + 1).join("/")
            const folderNameResult = await fetchFolderName(subPath[i])
            crumbs.push({ 
              name: folderNameResult, 
              path: `/materials/${termSlug}/${folderPath}` 
            })
          }
        }
        
        setBreadcrumbs(crumbs)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load files. Please try again."
        setError(errorMessage)
        console.error("Error loading data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [termSlug, currentFolderId, subPathKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const getIcon = (mimeType: string) => {
    const iconClass = "h-8 w-8"
    
    if (mimeType === "application/vnd.google-apps.folder") {
      return <Folder weight="duotone" className={`${iconClass} text-yellow-500`} />
    }
    if (mimeType === "application/pdf") {
      return <FilePdf weight="duotone" className={`${iconClass} text-red-500`} />
    }
    if (mimeType.startsWith("image/")) {
      return <Image weight="duotone" className={`${iconClass} text-purple-500`} />
    }
    if (mimeType.startsWith("video/")) {
      return <Video weight="duotone" className={`${iconClass} text-blue-500`} />
    }
    if (mimeType.includes("word") || mimeType.includes("document")) {
      return <FileDoc weight="duotone" className={`${iconClass} text-blue-600`} />
    }
    if (mimeType.includes("sheet") || mimeType.includes("excel")) {
      return <FileXls weight="duotone" className={`${iconClass} text-green-600`} />
    }
    return <File weight="duotone" className={`${iconClass} text-[var(--color-keppel-400)]`} />
  }

  if (!termInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-baltic-sea-100)] mb-4">Term Not Found</h1>
          <Link href="/#materials">
            <Button>Go Back to Materials</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-[var(--color-baltic-sea-400)]">
                  <House weight="bold" className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              
              {subPath.length > 0 && (
                <Link href={breadcrumbs[breadcrumbs.length - 2]?.path || `/materials/${termSlug}`}>
                  <Button variant="ghost" size="sm" className="text-[var(--color-baltic-sea-400)]">
                    <CaretLeft weight="bold" className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="text-sm text-[var(--color-baltic-sea-500)]">
              Year {termInfo.year} • Term {termInfo.term}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-sm">
            <li>
              <Link 
                href="/#materials" 
                className="text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
              >
                Materials
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                <span className="text-[var(--color-baltic-sea-700)]">/</span>
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-[var(--color-keppel-400)]">{crumb.name}</span>
                ) : (
                  <Link 
                    href={crumb.path}
                    className="text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Folder Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-baltic-sea-100)]">
            {loading ? "Loading..." : folderName}
          </h1>
          <p className="mt-2 text-[var(--color-baltic-sea-500)]">
            {!loading && `${files.length} items`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <SpinnerGap className="h-12 w-12 text-[var(--color-keppel-400)] animate-spin" />
            <p className="mt-4 text-[var(--color-baltic-sea-400)]">Loading files...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <p className="text-red-400 mb-4 text-lg font-medium">Unable to Load Files</p>
              <p className="text-[var(--color-baltic-sea-400)] mb-2 text-sm">{error}</p>
              <p className="text-[var(--color-baltic-sea-600)] text-xs mb-6">
                This may be due to API restrictions. Make sure the Google API key allows requests from this domain.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => window.location.reload()}>Try Again</Button>
                <Button 
                  variant="outline" 
                  className="border-[var(--color-baltic-sea-700)]"
                  asChild
                >
                  <a 
                    href={`https://drive.google.com/drive/folders/${currentFolderId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open in Drive
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Folder weight="duotone" className="h-20 w-20 text-[var(--color-baltic-sea-700)] mb-4" />
            <p className="text-[var(--color-baltic-sea-400)] text-lg">This folder is empty</p>
            <p className="text-[var(--color-baltic-sea-600)] text-sm mt-2">
              Contact the technical support if you think something is wrong
            </p>
          </div>
        )}

        {/* File Grid */}
        {!loading && !error && files.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => {
              const isFolder = file.mimeType === "application/vnd.google-apps.folder"
              
              if (isFolder) {
                // Navigate to subfolder within the app
                const newPath = subPath.length > 0 
                  ? `/materials/${termSlug}/${subPath.join("/")}/${file.id}`
                  : `/materials/${termSlug}/${file.id}`
                
                return (
                  <Link key={file.id} href={newPath}>
                    <div className="group rounded-xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] p-4 hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-baltic-sea-900)] transition-all duration-300 cursor-pointer h-full">
                      <div className="flex items-start gap-3">
                        {getIcon(file.mimeType)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[var(--color-baltic-sea-200)] group-hover:text-[var(--color-keppel-400)] transition-colors truncate">
                            {file.name}
                          </h3>
                          <p className="text-xs text-[var(--color-baltic-sea-600)] mt-1">Folder</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              }
              
              // For files, open in Google Drive preview
              const viewUrl = getFileViewUrl(file.id, file.mimeType)
              const downloadUrl = getFileDownloadUrl(file.id)
              
              return (
                <div 
                  key={file.id} 
                  className="rounded-xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] p-4 hover:border-[var(--color-keppel-700)] transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-3">
                    {getIcon(file.mimeType)}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--color-baltic-sea-200)] truncate" title={file.name}>
                        {file.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-baltic-sea-600)]">
                        {file.size && (
                          <span>{formatFileSize(file.size)}</span>
                        )}
                      </div>
                      
                      {file.owners && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-[var(--color-baltic-sea-500)]">
                          <User weight="fill" className="h-3 w-3" />
                          <span>{formatOwnerName(file.owners)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <a 
                      href={viewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        size="sm" 
                        className="w-full bg-[var(--color-keppel-500)] hover:bg-[var(--color-keppel-600)] text-[var(--color-keppel-950)]"
                      >
                        View
                      </Button>
                    </a>
                    <a 
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-[var(--color-baltic-sea-700)] text-[var(--color-baltic-sea-300)] hover:bg-[var(--color-baltic-sea-800)]"
                      >
                        <Download weight="bold" style={{color: "green"}} className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-baltic-sea-900)] py-8 mt-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
          <p className="text-center text-sm text-[var(--color-baltic-sea-600)]">
            The Hacker Can't Be Rank 🟢 • HackerRank FCDS Materials
          </p>
        </div>
      </footer>
    </div>
  )
}
