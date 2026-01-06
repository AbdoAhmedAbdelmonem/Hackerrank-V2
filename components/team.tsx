"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const TEAM_MEMBERS = [
  {
    name: "Rania El-Sayed",
    role: "Vice OC",
    image: "/Media/Our Board/Rania Elsayed.jpg",
  },
  {
    name: "Sherry Rafiq",
    role: "Vice M&M",
    image: "/Media/Our Board/sherry rafiq.jpg",
  },
  {
    name: "Mostafa EL-Hosseny",
    role: "Vice SC",
    image: "/Media/Our Board/Mostafa EL-Hosseny.jpg",
  },
  {
    name: "Fares Mohamed",
    role: "Head Full Stack",
    image: "/Media/Our Board/fares mohamed hassan.jpg",
  },
  {
    name: "Hossam Ahmed",
    role: "CO Head M&M",
    image: "/Media/Our Board/Hossam Ahmed3.JPG",
  },
  {
    name: "Lara Mohamed",
    role: "Head PR",
    image: "/Media/Our Board/Lara Mohamed.jpg",
  },
  {
    name: "Mohamed Samir",
    role: "Head OC",
    image: "/Media/Our Board/Mohamed Samir.jpg",
  },
  {
    name: "Ahmed Elhadary",
    role: "Vice President",
    image: "/Media/Our Board/Ahmed Elhadary.jpg",
  },
  {
    name: "Al Husain Yasser",
    role: "Vice Head IoT",
    image: "/Media/Our Board/Al husain yasser.jpg",
  },
  {
    name: "Ali Fathy",
    role: "Vice Head Full Stack",
    image: "/Media/Our Board/Ali Fathy.jpg",
  },
  {
    name: "Fares Essam",
    role: "Vice HR",
    image: "/Media/Our Board/fares essam.jpg",
  },
  {
    name: "Mohamed Mahmoud",
    role: "Head IoT",
    image: "/Media/Our Board/mohamed mahmoud.jpg",
  },
  {
    name: "Mostafa Elsayed",
    role: "Head SC",
    image: "/Media/Our Board/Mostafa elsayed.jpg",
  },
  {
    name: "Omar Eldeeb",
    role: "Vice PR",
    image: "/Media/Our Board/Omar Eldeeb.png",
  },
  {
    name: "Rofida Mohamed",
    role: "co Head",
    image: "/Media/Our Board/rofida mohamed.jpg",
  },
  {
    name: "Salsabil Waleed",
    role: "Head HR",
    image: "/Media/Our Board/salsabil waleed.jpg",
  },
  {
    name: "Youssef Sherif",
    role: "Head President",
    image: "/Media/Our Board/youssef sherif.jpg",
  },
]

export function Team() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Duplicate members for infinite scroll effect
  const duplicatedMembers = [...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      TEAM_MEMBERS.forEach((_, i) => {
        setTimeout(() => setActiveIndex(i), 200 + i * 50)
      })
    }
  }, [isVisible])

  // Center the scroll to middle set on mount
  useEffect(() => {
    if (scrollRef.current && isVisible) {
      const cardWidth = 320 + 20 // card width + gap
      const middleOffset = TEAM_MEMBERS.length * cardWidth
      scrollRef.current.scrollLeft = middleOffset
    }
  }, [isVisible])

  // Handle infinite scroll - jump to middle when reaching edges
  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const cardWidth = 320 + 20
    const singleSetWidth = TEAM_MEMBERS.length * cardWidth

    // If scrolled to near the end, jump back to middle
    if (scrollLeft >= singleSetWidth * 2 - clientWidth) {
      scrollRef.current.scrollLeft = scrollLeft - singleSetWidth
    }
    // If scrolled to near the start, jump forward to middle
    if (scrollLeft <= clientWidth / 2) {
      scrollRef.current.scrollLeft = scrollLeft + singleSetWidth
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="team" ref={ref} className="py-24 border-t border-[var(--color-baltic-sea-900)] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"
            }`}
          >
            <span className="text-sm font-medium text-[var(--color-keppel-400)] uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-100)] md:text-4xl">
              OUR HIGH <span className="text-[var(--color-keppel-400)]">BOARD</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div
            className={`flex gap-3 mt-4 md:mt-0 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] flex items-center justify-center hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-keppel-950)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-[var(--color-baltic-sea-400)]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] flex items-center justify-center hover:border-[var(--color-keppel-700)] hover:bg-[var(--color-keppel-950)] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-[var(--color-baltic-sea-400)]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Team members carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pt-4 pb-8 scrollbar-hide -mx-2 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedMembers.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className={`group flex-shrink-0 w-[280px] cursor-pointer rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] overflow-hidden ${
                activeIndex >= (i % TEAM_MEMBERS.length) ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Full Image - Slightly vertical rectangle (5:4) */}
              <div className="relative aspect-[7/5] w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="280px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-baltic-sea-950)] via-transparent to-transparent opacity-80" />
                
                {/* Name overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">{member.name}</h3>
                  <p className="text-sm text-[var(--color-keppel-400)] font-medium">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
