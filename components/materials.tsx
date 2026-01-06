"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Books, ArrowRight, Folder } from "@phosphor-icons/react/dist/ssr"

const YEARS = [
  {
    id: "year1",
    name: "Year 1",
    terms: [
      {
        name: "Term 1",
        slug: "term-1",
        description: "Introduction to Programming, Mathematics",
        subjects: ["Programming Fundamentals", "Data Science", "Mathematics", "and more.."],
      },
      {
        name: "Term 2",
        slug: "term-2",
        description: "Advanced Programming, Data Structures Basics",
        subjects: ["Object-Oriented Programming", "Data Structures", "Statistics"],
      },
    ],
  },
  {
    id: "year2",
    name: "Year 2",
    terms: [
      {
        name: "Term 3",
        slug: "term-3",
        description: "Algorithms, Database Systems, Computer Architecture",
        subjects: ["Algorithms", "Database Systems", "Computer Architecture"],
      },
      {
        name: "Term 4",
        slug: "term-4",
        description: "Operating Systems, Software Engineering",
        subjects: ["Operating Systems", "Software Engineering", "Numerical Analysis", "Machine Learning Basics"],
      },
    ],
  },
  {
    id: "year3",
    name: "Year 3",
    terms: [
      {
        name: "Term 5",
        slug: "term-5",
        description: "AI Foundations, Networks, Compilers",
        subjects: ["Artificial Intelligence", "Computer Networks", "Compilers", "Theory of Computation"],
      },
      {
        name: "Term 6",
        slug: "term-6",
        description: "Machine Learning, Security, Distributed Systems",
        subjects: ["Machine Learning", "Information Security", "Distributed Systems", "Computer Graphics"],
      },
    ],
  },
  {
    id: "year4",
    name: "Year 4",
    terms: [
      {
        name: "Term 7",
        slug: "term-7",
        description: "Deep Learning, Cloud Computing, Big Data",
        subjects: ["Deep Learning", "Big Data Analytics", "Natural Language Processing"],
      },
      {
        name: "Term 8",
        slug: "term-8",
        description: "Graduation Project, Advanced Topics",
        subjects: ["Graduation Project", "Advanced Topics", "Research Methods", "Professional Ethics"],
      },
    ],
  },
]

export function Materials() {
  const [activeYear, setActiveYear] = useState("year1")
  const [isVisible, setIsVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setCardsVisible(true), 400)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const currentYear = YEARS.find((y) => y.id === activeYear)

  return (
    <section id="materials" ref={ref} className="py-24 border-t border-[var(--color-baltic-sea-900)] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"
          }`}
        >
          <span className="text-sm font-medium text-[var(--color-keppel-400)] uppercase tracking-wider">
            Scientific Materials
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-100)] md:text-4xl text-balance">
            <span className="text-[var(--color-keppel-400)]">Mate</span>rials
          </h2>
          <p className="mt-4 text-lg text-[var(--color-baltic-sea-400)]">
            Access comprehensive learning materials for all 4 years of your Computer Science journey.
          </p>
        </div>

        {/* Year selector tabs */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex rounded-full border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)]/80 backdrop-blur-md p-1">
            {YEARS.map((year) => (
              <button
                key={year.id}
                onClick={() => setActiveYear(year.id)}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeYear === year.id
                    ? "bg-[var(--color-keppel-500)] text-[var(--color-keppel-950)]"
                    : "text-[var(--color-baltic-sea-400)] hover:text-[var(--color-baltic-sea-100)]"
                }`}
              >
                {year.name}
              </button>
            ))}
          </div>
        </div>

        {/* Term cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {currentYear?.terms.map((term, i) => (
            <div
              key={term.name}
              className={`relative rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] p-6 lg:p-8 transition-all duration-700 hover:border-[var(--color-keppel-700)] hover:-translate-y-1 group ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
                boxShadow: "var(--bento-shadow)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-12 w-12 rounded-xl bg-[var(--color-keppel-900)] flex items-center justify-center group-hover:bg-[var(--color-keppel-800)] transition-colors">
                      <Books weight="duotone" className="h-6 w-6 text-[var(--color-keppel-400)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-baltic-sea-100)]">{term.name}</h3>
                      <p className="text-sm text-[var(--color-baltic-sea-500)]">{currentYear.name}</p>
                    </div>
                  </div>
                  <p className="text-[var(--color-baltic-sea-400)] mt-2">{term.description}</p>
                </div>
              </div>

              {/* Subjects list */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider text-[var(--color-baltic-sea-500)] mb-3">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {term.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-baltic-sea-900)] text-xs text-[var(--color-baltic-sea-300)] border border-[var(--color-baltic-sea-800)]"
                    >
                      <Folder weight="fill" className="h-3 w-3 text-[var(--color-keppel-500)]" />
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-6 border-t border-[var(--color-baltic-sea-800)]">
                <Button
                  asChild
                  className="w-full bg-[var(--color-keppel-500)] hover:bg-[var(--color-keppel-600)] text-[var(--color-keppel-950)] font-semibold rounded-full h-11 group-hover:shadow-[0_0_20px_-5px_var(--color-keppel-400)] transition-all"
                >
                  <Link href={`/materials/${term.slug}`}>
                    Start Learning Now
                    <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
