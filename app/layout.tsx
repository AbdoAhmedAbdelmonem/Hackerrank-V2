import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Pacifico } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
export const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" })

export const metadata: Metadata = {
  title: "HackerRank FCDS | Scientific Materials",
  description:
    "The Official Materials Website for HackerRank Campus Club - FCDS branch. Helping students enhance their programming skills through comprehensive learning resources.",
  generator: "Next.js - Levi Ackerman",
  icons: {
    icon: "/Media/pop.png",
    apple: "/Media/pop.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={pacifico.variable}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
