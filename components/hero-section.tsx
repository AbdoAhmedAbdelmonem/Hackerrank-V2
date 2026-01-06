"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Books, GraduationCap, Lightning } from "@phosphor-icons/react"
import { useEffect, useState, useRef } from "react"

const TYPING_SEQUENCE = {
  lines: [
    { text: "// Welcome to HackerRank FCDS", delay: 80 },
    { text: "", delay: 200 },
    { text: "const student = {", delay: 60 },
    { text: "  name: 'Future Developer',", delay: 50 },
    { text: "  skills: ['algorithms', 'data structures', 'Machine Learning'],", delay: 50 },
    { text: "  department: 'Computer Science - FCDS'", delay: 50 },
    { text: "};", delay: 100 },
    { text: "", delay: 200 },
    { text: "student.startLearning();", delay: 80 },
  ],
  outputs: [
    { text: "Loading materials...", delay: 400 },
    { text: "Year 1: Foundations ready", delay: 300 },
    { text: "Year 2: Data Structures unlocked", delay: 300 },
    { text: "Year 3: Algorithms mastered", delay: 300 },
    { text: "Year 4: Advanced topics available", delay: 400 },
    { text: "✓ Ready to become a Developer!", delay: 0 },
  ],
}

const STATS = [
  { value: "4", label: "Years" },
  { value: "8", label: "Terms" },
  { value: "50+", label: "Courses" },
  { value: "100+", label: "Resources" },
]

const GRID_ACTIVATION_MAP: Record<number, number[]> = {
  0: [5, 23, 47, 68, 92, 115, 138, 167, 189, 215],
  1: [12, 31, 56, 78, 103, 127, 152, 178, 201, 223, 8, 45, 89, 134, 176],
  2: [3, 19, 42, 65, 88, 112, 139, 163, 186, 209, 234, 17, 54, 97, 143, 188, 211, 237],
}

export function HeroSection() {
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set())
  const [codeLines, setCodeLines] = useState<string[]>([])
  const [outputs, setOutputs] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const hasAnimatedRef = useRef(false)

  const startAnimation = () => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    // Reset all states
    setActiveCells(new Set())
    setCodeLines([])
    setOutputs([])
    setShowTerminal(false)
    setIsRunning(false)
    setIsVisible(true)

    const addTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay)
      timeoutsRef.current.push(id)
      return id
    }

    // Activate cells in sequence
    const activateCells = () => {
      Object.entries(GRID_ACTIVATION_MAP).forEach(([step, cells], stepIndex) => {
        cells.forEach((cellIndex, i) => {
          addTimeout(() => {
            setActiveCells((prev) => new Set([...prev, cellIndex]))
          }, stepIndex * 500 + i * 60)
        })
      })
    }

    // Type code lines
    const typeCode = () => {
      let lineIndex = 0
      const lines = [...TYPING_SEQUENCE.lines]

      const typeLine = () => {
        if (lineIndex < lines.length) {
          const currentLine = lines[lineIndex]
          setCodeLines((prev) => [...prev, currentLine.text])
          lineIndex++
          addTimeout(typeLine, currentLine.delay)
        } else {
          addTimeout(runOutputs, 400)
        }
      }
      typeLine()
    }

    // Show outputs
    const runOutputs = () => {
      setIsRunning(true)
      let outputIndex = 0
      const outs = [...TYPING_SEQUENCE.outputs]

      const showOutput = () => {
        if (outputIndex < outs.length) {
          const currentOutput = outs[outputIndex]
          setOutputs((prev) => [...prev, currentOutput.text])
          outputIndex++
          if (outputIndex < outs.length) {
            addTimeout(showOutput, currentOutput.delay)
          } else {
            addTimeout(() => setIsRunning(false), 300)
          }
        }
      }
      showOutput()
    }

    addTimeout(() => setShowTerminal(true), 500)
    addTimeout(activateCells, 800)
    addTimeout(typeCode, 1200)
  }

  // Run animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            startAnimation()
          } else if (!entry.isIntersecting) {
            // Reset so it can animate again when returning
            hasAnimatedRef.current = false
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen pb-12 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 -top-20 -left-20 -right-20 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-3 sm:gap-4 lg:gap-5 p-4 opacity-30">
          {[...Array(240)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm transition-all duration-700 ${
                activeCells.has(i)
                  ? "bg-[var(--color-keppel-500)] shadow-[0_0_30px_var(--color-keppel-500)]"
                  : "border border-[var(--color-baltic-sea-800)] bg-transparent"
              }`}
              style={{
                opacity: activeCells.has(i) ? 0.8 : 0.4,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Left column - text content */}
          <div
            className={`lg:max-w-xl lg:min-h-screen flex flex-col justify-center pt-24 lg:pt-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-keppel-700)] bg-[var(--color-keppel-950)] px-3 py-1 text-xs text-[var(--color-keppel-300)] mb-8 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-keppel-400)] animate-pulse" />
              Campus Club, FCDS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-baltic-sea-50)] leading-[1.1]">
              Start Chaining With
              <br />
              <span className="text-[var(--color-keppel-400)] font-pacifico">Hacker Rank</span>
            </h1>

            <p className="mt-6 text-lg text-[var(--color-baltic-sea-400)] max-w-md leading-relaxed">
              HackerRank is a premier coding platform that helps developers and students enhance their programming
              skills through challenges, competitions, and comprehensive learning materials.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--color-keppel-400)]">{stat.value}</div>
                  <div className="text-xs text-[var(--color-baltic-sea-500)]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[var(--color-keppel-500)] hover:bg-[var(--color-keppel-600)] text-[var(--color-keppel-950)] font-semibold px-6"
              >
                <a href="#materials">
                  <Books className="mr-2 h-4 w-4" weight="bold" />
                  Browse Materials
                  <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-[var(--color-baltic-sea-300)] hover:text-[var(--color-baltic-sea-100)] hover:bg-[var(--color-baltic-sea-900)]"
              >
                <a href="#team">
                  <GraduationCap className="mr-2 h-4 w-4" weight="bold" />
                  Meet Our Team
                </a>
              </Button>
            </div>
          </div>

          {/* Right column - terminal animation */}
          <div className="lg:flex-1 lg:max-w-2xl lg:min-h-screen flex flex-col items-center justify-center lg:pt-20">
            {showTerminal && (
              <div
                className="w-full rounded-xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] overflow-hidden animate-in fade-in zoom-in-95 duration-500"
                style={{
                  boxShadow: "0 0 60px -10px var(--color-keppel-900)",
                }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-baltic-sea-800)]">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-[var(--color-keppel-500)]" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-[var(--color-baltic-sea-500)] font-mono flex items-center justify-center gap-2">
                      <Code weight="bold" className="h-3 w-3" />
                      student.js
                    </span>
                  </div>
                </div>

                <div className="p-5 font-mono text-sm">
                  <div className="space-y-0.5">
                    {codeLines.map((line, i) => (
                      <div key={i} className="animate-in fade-in slide-in-from-left-1 duration-150">
                        {line === "" ? (
                          <div className="h-5" />
                        ) : line.startsWith("//") ? (
                          <span className="text-[var(--color-baltic-sea-600)]">{line}</span>
                        ) : line.startsWith("const") ? (
                          <span>
                            <span className="text-[var(--color-baltic-sea-500)]">const</span>
                            <span className="text-[var(--color-baltic-sea-300)]"> student = {"{"}</span>
                          </span>
                        ) : line.startsWith("student.") ? (
                          <span>
                            <span className="text-[var(--color-baltic-sea-300)]">student.</span>
                            <span className="text-[var(--color-keppel-400)]">startLearning</span>
                            <span className="text-[var(--color-baltic-sea-300)]">();</span>
                          </span>
                        ) : line.startsWith("};") ? (
                          <span className="text-[var(--color-baltic-sea-300)]">{line}</span>
                        ) : line.includes(":") ? (
                          <span className="text-[var(--color-baltic-sea-400)]">
                            {"  "}
                            {line.split(":")[0].trim()}
                            <span className="text-[var(--color-baltic-sea-500)]">:</span>
                            <span className="text-[var(--color-keppel-400)]">{line.split(":").slice(1).join(":")}</span>
                          </span>
                        ) : (
                          <span className="text-[var(--color-baltic-sea-300)]">{line}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {outputs.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-baltic-sea-800)]">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-baltic-sea-500)] mb-3">
                        <Lightning weight="bold" className="h-3 w-3" />
                        <span>output</span>
                        {isRunning && (
                          <span className="flex gap-0.5 ml-2">
                            <span
                              className="h-1 w-1 rounded-full bg-[var(--color-keppel-500)] animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <span
                              className="h-1 w-1 rounded-full bg-[var(--color-keppel-500)] animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="h-1 w-1 rounded-full bg-[var(--color-keppel-500)] animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        {outputs.map((output, i) => (
                          <div
                            key={i}
                            className={`text-xs animate-in fade-in slide-in-from-left-1 duration-200 ${
                              output.startsWith("✓")
                                ? "text-[var(--color-keppel-400)]"
                                : "text-[var(--color-baltic-sea-400)]"
                            }`}
                          >
                            <span className="text-[var(--color-keppel-600)] mr-2">→</span>
                            {output}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
