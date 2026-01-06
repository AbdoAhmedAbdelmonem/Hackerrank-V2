// Google Drive API configuration
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""

// Drive folder IDs for each term
export const TERM_FOLDERS: Record<string, { id: string; name: string; year: number; term: number }> = {
  "term-1": {
    id: process.env.NEXT_PUBLIC_TERM_1_FOLDER_ID || "",
    name: "First Term",
    year: 1,
    term: 1,
  },
  "term-2": {
    id: process.env.NEXT_PUBLIC_TERM_2_FOLDER_ID || "",
    name: "Second Term",
    year: 1,
    term: 2,
  },
  "term-3": {
    id: process.env.NEXT_PUBLIC_TERM_3_FOLDER_ID || "",
    name: "Third Term",
    year: 2,
    term: 1,
  },
  "term-4": {
    id: process.env.NEXT_PUBLIC_TERM_4_FOLDER_ID || "",
    name: "Fourth Term",
    year: 2,
    term: 2,
  },
  "term-5": {
    id: process.env.NEXT_PUBLIC_TERM_5_FOLDER_ID || "",
    name: "Fifth Term",
    year: 3,
    term: 1,
  },
  "term-6": {
    id: process.env.NEXT_PUBLIC_TERM_6_FOLDER_ID || "",
    name: "Sixth Term",
    year: 3,
    term: 2,
  },
  "term-7": {
    id: process.env.NEXT_PUBLIC_TERM_7_FOLDER_ID || "",
    name: "Seventh Term",
    year: 4,
    term: 1,
  },
  "term-8": {
    id: process.env.NEXT_PUBLIC_TERM_8_FOLDER_ID || "",
    name: "Eighth Term",
    year: 4,
    term: 2,
  },
}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  size?: string
  createdTime?: string
  owners?: Array<{ displayName: string }>
}

export interface DriveFolder {
  id: string
  name: string
}

export async function fetchDriveItems(folderId: string): Promise<DriveFile[]> {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${GOOGLE_API_KEY}&fields=files(id,name,mimeType,size,owners,createdTime)`
    console.log("Fetching Drive items from:", url)
    
    const response = await fetch(url)
    const data = await response.json()
    
    console.log("Drive API response:", data)
    
    if (data.error) {
      console.error("Drive API error:", data.error)
      throw new Error(data.error.message || "Failed to fetch files")
    }
    
    if (!data.files) return []
    
    // Sort files: folders first, then by name
    return data.files.sort((a: DriveFile, b: DriveFile) => {
      const aIsFolder = a.mimeType === "application/vnd.google-apps.folder"
      const bIsFolder = b.mimeType === "application/vnd.google-apps.folder"
      
      if (aIsFolder && !bIsFolder) return -1
      if (!aIsFolder && bIsFolder) return 1
      
      // Try numeric sort first
      const numA = parseFloat(a.name)
      const numB = parseFloat(b.name)
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }
      
      return a.name.localeCompare(b.name)
    })
  } catch (err) {
    console.error("Error fetching Drive items:", err)
    throw err
  }
}

export async function fetchFolderName(folderId: string): Promise<string> {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${folderId}?key=${GOOGLE_API_KEY}&fields=name`
  )
  const data = await response.json()
  return data.name || "Unknown Folder"
}

export function getFileIcon(mimeType: string): string {
  if (mimeType === "application/vnd.google-apps.folder") return "folder"
  if (mimeType === "application/pdf") return "pdf"
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  if (mimeType.includes("word") || mimeType.includes("document")) return "doc"
  if (mimeType.includes("sheet") || mimeType.includes("excel")) return "sheet"
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "slides"
  return "file"
}

export function getFileViewUrl(fileId: string, mimeType: string): string {
  // For Google Docs/Sheets/Slides, use the native viewer
  if (mimeType.includes("google-apps")) {
    return `https://drive.google.com/open?id=${fileId}`
  }
  // For PDFs and other files, use the preview
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export function getFileDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?id=${fileId}&export=download`
}

export function formatOwnerName(owners?: Array<{ displayName: string }>): string {
  if (!owners || owners.length === 0) return "Unknown"
  let name = owners[0].displayName
  // Replace known usernames with real names
  if (name === "tokyo9900777" || name === "xofofozahmed" || name === "poz659312") {
    name = "Abdelrahman Ahmed"
  }
  return name
}

export function formatFileSize(bytes?: string): string {
  if (!bytes) return ""
  const size = parseInt(bytes, 10)
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}
