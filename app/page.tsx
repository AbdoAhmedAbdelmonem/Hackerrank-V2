import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Materials } from "@/components/materials"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Materials />
        <Testimonials />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
