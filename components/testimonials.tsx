"use client"

import { useEffect, useRef, useState } from "react"

const TESTIMONIALS_ROW_1 = [
  {
    quote:
      "The materials here helped me ace my Data Structures exam. The organized notes and practice problems made studying so much easier!",
    author: "Ahmed Hassan",
    role: "Year 2 Student",
    company: "FCDS",
    avatar: "AH",
  },
  {
    quote:
      "Finally found a place with all the resources I need. The algorithm explanations and solved problems are invaluable for interview prep.",
    author: "Sara Mohamed",
    role: "Year 4 Student",
    company: "FCDS",
    avatar: "SM",
  },
  {
    quote:
      "HackerRank Campus Club sessions and these materials helped me land my first internship. Forever grateful to this community!",
    author: "Youssef Ali",
    role: "Graduate",
    company: "FCDS NU",
    avatar: "YA",
  },
  {
    quote: "The best resource for FCDS students. Past exams and solutions helped me understand what to expect.",
    author: "Nour Khaled",
    role: "Year 3 Student",
    company: "FCDS",
    avatar: "NK",
  },
  {
    quote: "From struggling with programming to loving it - the workshops and materials here changed my perspective.",
    author: "Omar Tarek",
    role: "Year 1 Student",
    company: "FCDS",
    avatar: "OT",
  },
]

const TESTIMONIALS_ROW_2 = [
  {
    quote: "The community here is amazing. Always ready to help and share knowledge. This is what college should be about!",
    author: "Mariam Adel",
    role: "Year 2 Student",
    company: "FCDS",
    avatar: "MA",
  },
  {
    quote: "Having all subjects organized by term saved me countless hours. Great initiative by the team!",
    author: "Karim Sherif",
    role: "Year 3 Student",
    company: "FCDS NU",
    avatar: "KS",
  },
  {
    quote: "The AI and ML materials for Year 2 are exceptional. Helped me start my machine learning journey.",
    author: "Rana Ahmed",
    role: "Year 2 Student",
    company: "FCDS",
    avatar: "RA",
  },
  {
    quote: "As a freshman, I was lost. This platform gave me direction and the resources to succeed.",
    author: "Mohamed Saeed",
    role: "Year 1 Student",
    company: "FCDS",
    avatar: "MS",
  },
  {
    quote: "The quality of materials here is better than many paid resources. Thank you HackerRank FCDS!",
    author: "Hana Osama",
    role: "Year 2 Student",
    company: "FCDS",
    avatar: "HO",
  },
]

function TestimonialCard({
  testimonial,
  onMouseEnter,
  onMouseLeave,
}: {
  testimonial: (typeof TESTIMONIALS_ROW_1)[0]
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex-shrink-0 w-[350px] md:w-[400px] rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] p-6 hover:border-[var(--color-keppel-800)] transition-colors duration-300"
      style={{ boxShadow: "var(--bento-shadow)" }}
    >
      <p className="text-[var(--color-baltic-sea-300)] leading-relaxed text-sm">{testimonial.quote}</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--color-keppel-600)] to-[var(--color-keppel-800)] flex items-center justify-center text-xs font-bold text-[var(--color-keppel-100)]">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-medium text-[var(--color-baltic-sea-200)] text-sm">{testimonial.author}</div>
          <div className="text-xs text-[var(--color-baltic-sea-500)]">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({
  testimonials,
  direction = "left",
  speed = 30,
}: {
  testimonials: typeof TESTIMONIALS_ROW_1
  direction?: "left" | "right"
  speed?: number
}) {
  const [isPaused, setIsPaused] = useState(false)
  const duplicated = [...testimonials, ...testimonials]

  return (
    <div className="relative flex overflow-hidden">
      {/* Gradient masks on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none" />

      <div
        className="flex gap-6 py-4"
        style={{
          animation: `scroll-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicated.map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.author}-${i}`}
            testimonial={testimonial}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
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
    <section ref={ref} className="py-24 border-t border-[var(--color-baltic-sea-900)] overflow-hidden">
      {/* Section header */}
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"}`}
        >
          <span className="text-sm font-medium text-[var(--color-keppel-400)] uppercase tracking-wider">
            Student Stories
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-100)] md:text-4xl text-balance">
            What our students say
          </h2>
        </div>
      </div>

      <div
        className={`space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "300ms" }}
      >
        <MarqueeRow testimonials={TESTIMONIALS_ROW_1} direction="left" speed={40} />
        <MarqueeRow testimonials={TESTIMONIALS_ROW_2} direction="right" speed={45} />
      </div>
    </section>
  )
}
