import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { BusinessDirections } from "@/components/business-directions"
import { ProjectsSection } from "@/components/projects-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <BusinessDirections />
      <ProjectsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
