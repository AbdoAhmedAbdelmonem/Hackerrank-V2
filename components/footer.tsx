"use client"

import { useState } from "react"
import { LinkedinLogo, FacebookLogo, InstagramLogo, YoutubeLogo, CaretDown } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

function MaterialsDropdown({ 
  title, 
  terms, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  terms: { name: string; href: string }[]; 
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
      >
        {title}
        <CaretDown 
          weight="bold" 
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      <div 
        className="grid transition-all duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <ul className="overflow-hidden ml-3">
          <div className="pt-2 space-y-2">
            {terms.map((term) => (
              <li key={term.href}>
                <a
                  href={term.href}
                  className="text-sm text-[var(--color-baltic-sea-600)] hover:text-[var(--color-keppel-400)] transition-colors"
                >
                  {term.name}
                </a>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

export function Footer() {
  const [openYear, setOpenYear] = useState<string | null>(null)
  
  const handleToggle = (year: string) => {
    setOpenYear(openYear === year ? null : year)
  }
  return (
    <footer className="border-t border-[var(--color-baltic-sea-900)] py-16">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand column */}
          <div className="lg:max-w-xs">
            <div className="flex items-center gap-3">
              <Image
                src="/Media/hackerrank.png"
                alt="HackerRank Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-semibold text-[var(--color-baltic-sea-300)]">HackerRank</span>
            </div>
            <p className="mt-4 text-sm text-[var(--color-baltic-sea-500)]">
              The Official Materials Website for HackerRank Campus Club - FCDS branch. Helping students enhance their
              programming skills through comprehensive learning resources.
            </p>
            <a 
              href="https://chameleon-nu.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-xs text-[var(--color-baltic-sea-500)]">In cooperation with</span>
              <Image
                src="/Media/chameleon.png"
                alt="Chameleon"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
            </a>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/hackerrank-campus-club-fcds/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-800)] hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-keppel-950)] transition-colors"
              >
                <LinkedinLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
              <a
                href="https://www.facebook.com/HackerRankCampusClubFCDS/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-800)] hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-keppel-950)] transition-colors"
              >
                <FacebookLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
              <a
                href="https://www.instagram.com/hackerrank/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-800)] hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-keppel-950)] transition-colors"
              >
                <InstagramLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCPdduoZKZCKx9hiz6EU41jg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-baltic-sea-800)] hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-keppel-950)] transition-colors"
              >
                <YoutubeLogo weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-16">
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-200)]">Materials</h4>
              <div className="mt-4 space-y-3">
                <MaterialsDropdown 
                  title="Year 1" 
                  terms={[
                    { name: "Term 1", href: "/materials/term-1" },
                    { name: "Term 2", href: "/materials/term-2" },
                  ]}
                  isOpen={openYear === "year1"}
                  onToggle={() => handleToggle("year1")}
                />
                <MaterialsDropdown 
                  title="Year 2" 
                  terms={[
                    { name: "Term 3", href: "/materials/term-3" },
                    { name: "Term 4", href: "/materials/term-4" },
                  ]}
                  isOpen={openYear === "year2"}
                  onToggle={() => handleToggle("year2")}
                />
                <MaterialsDropdown 
                  title="Year 3" 
                  terms={[
                    { name: "Term 5", href: "/materials/term-5" },
                    { name: "Term 6", href: "/materials/term-6" },
                  ]}
                  isOpen={openYear === "year3"}
                  onToggle={() => handleToggle("year3")}
                />
                <MaterialsDropdown 
                  title="Year 4" 
                  terms={[
                    { name: "Term 7", href: "/materials/term-7" },
                    { name: "Term 8", href: "/materials/term-8" },
                  ]}
                  isOpen={openYear === "year4"}
                  onToggle={() => handleToggle("year4")}
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-200)]">Links</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#hero"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--color-baltic-sea-200)]">Community</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/company/hackerrank-campus-club-fcds/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/HackerRankCampusClubFCDS/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCPdduoZKZCKx9hiz6EU41jg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-baltic-sea-500)] hover:text-[var(--color-keppel-400)] transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-baltic-sea-900)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[var(--color-baltic-sea-600)]">
            © 2026 HackerRank FCDS. Made with 💚 by Abdelrahman Ahmed
          </span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-keppel-400)] animate-pulse" />
            <span className="text-xs text-[var(--color-baltic-sea-500)]">Start Chaining With HackerRank 🌟</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
