"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "@phosphor-icons/react/dist/ssr"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[var(--color-baltic-sea-950)]/70 backdrop-blur-xl border-b border-[var(--color-baltic-sea-800)]/50 shadow-lg shadow-black/20" 
          : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-2.5 sm:px-6 lg:px-12">
          {/* Logo - always stays at top */}
          <a href="#home" className="flex items-center">
            <Image
              src="/Media/logo.png"
              alt="HackerRank FCDS Logo"
              width={40}
              height={16}
              className="h-4 w-auto object-contain"
              priority
            />
          </a>

          {/* Navigation - only shows at top, replaced by floating CTA when scrolled */}
          <nav
            className={`
              hidden md:flex items-center gap-1 rounded-full border border-[var(--color-baltic-sea-800)] 
              bg-[var(--color-baltic-sea-900)]/80 backdrop-blur-md px-2 py-1.5
              transition-all duration-500 ease-out
              ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}
              absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
            `}
          >
            <a
              href="#home"
              className="px-4 py-1.5 text-sm text-[var(--color-baltic-sea-100)] rounded-full bg-[var(--color-baltic-sea-800)]"
            >
              Home
            </a>
            <a
              href="#materials"
              className="px-4 py-1.5 text-sm text-[var(--color-baltic-sea-400)] hover:text-[var(--color-baltic-sea-100)] transition-colors"
            >
              Materials
            </a>
            <a
              href="#team"
              className="px-4 py-1.5 text-sm text-[var(--color-baltic-sea-400)] hover:text-[var(--color-baltic-sea-100)] transition-colors"
            >
              Our Board
            </a>
            <a
              href="#faq"
              className="px-4 py-1.5 text-sm text-[var(--color-baltic-sea-400)] hover:text-[var(--color-baltic-sea-100)] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Actions - hide button when scrolled */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/hackerrank-campus-club-fcds/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                hidden text-sm text-[var(--color-baltic-sea-400)] hover:text-[var(--color-baltic-sea-100)] transition-all duration-500 md:block
                ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
            >
              Join Us
            </a>
            <Button
              asChild
              className={`
                hidden md:flex bg-[var(--color-keppel-400)] text-[var(--color-keppel-950)] hover:bg-[var(--color-keppel-300)] 
                rounded-full px-5 py-2.5 h-auto text-sm
                transition-all duration-500
                ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
            >
              <a href="#materials">
                <GraduationCap weight="fill" className="mr-1.5 h-4 w-4" />
                Start Learning
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`
          fixed z-50 bottom-6 right-6 lg:right-12
          transition-all duration-500 ease-out
          ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <Button
          asChild
          className="bg-[var(--color-keppel-400)] text-[var(--color-keppel-950)] hover:bg-[var(--color-keppel-300)] 
            rounded-full px-6 py-3 h-auto text-sm shadow-lg shadow-[var(--color-keppel-400)]/20"
        >
          <a href="#materials">
            <GraduationCap weight="fill" className="mr-1.5 h-4 w-4" />
            Materials
          </a>
        </Button>
      </div>
    </>
  )
}
