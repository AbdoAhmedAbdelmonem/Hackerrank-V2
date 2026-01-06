"use client"

import { useEffect, useRef, useState } from "react"
import { CaretDown } from "@phosphor-icons/react/dist/ssr"

const FAQS = [
  {
    question: "What materials are available on this platform?",
    answer:
      "We provide comprehensive learning materials for all 4 years of the Computer Science program at FCDS. This includes lecture notes, assignments, past exams, reference books, and additional resources for each course. Materials are organized by year and term for easy navigation.",
  },
  {
    question: "How do I access the course materials?",
    answer:
      "Simply navigate to the Materials section, select your year and term, then click 'Start Learning Now' to access the Google Drive folder containing all resources for that term. Materials are regularly updated by our team and community members.",
  },
  {
    question: "Can I contribute my own materials?",
    answer:
      "Yes! We encourage students to share their notes, solutions, and helpful resources. Contact our team through the social media links or reach out to any board member to contribute. All contributions are reviewed before being added to ensure quality.",
  },
  {
    question: "What is HackerRank Campus Club?",
    answer:
      "HackerRank Campus Club at FCDS is a student-led organization focused on helping computer science students develop their programming skills through workshops, competitions, study sessions, and comprehensive learning materials. We're part of the global HackerRank community.",
  },
  {
    question: "How can I join the HackerRank Campus Club?",
    answer:
      "We welcome all FCDS students! Follow our social media pages for announcements about recruitment periods and events. You can also attend our open workshops and sessions to learn more about our activities and meet current members.",
  },
  {
    question: "Are the materials free to access?",
    answer:
      "Yes, all materials on this platform are completely free for FCDS students. Our mission is to make quality learning resources accessible to everyone in our community. No registration or payment is required.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  delay,
  isVisible,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  delay: number
  isVisible: boolean
}) {
  return (
    <div
      className={`border-b border-[var(--color-baltic-sea-800)] transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${delay % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
      }`}
      style={{ transitionDelay: `${delay * 75 + 200}ms` }}
    >
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium text-[var(--color-baltic-sea-200)] group-hover:text-[var(--color-keppel-400)] transition-colors">
          {question}
        </span>
        <CaretDown
          weight="bold"
          className={`h-5 w-5 text-[var(--color-baltic-sea-500)] group-hover:text-[var(--color-keppel-400)] transition-all duration-300 ${isOpen ? "rotate-180 text-[var(--color-keppel-400)]" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[var(--color-baltic-sea-400)] leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" ref={ref} className="py-24 border-t border-[var(--color-baltic-sea-900)] overflow-hidden">
      <div className="mx-auto max-w-[800px] px-2.5 sm:px-6 lg:px-12">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"}`}
        >
          <span className="text-sm font-medium text-[var(--color-keppel-400)] uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-100)] md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
