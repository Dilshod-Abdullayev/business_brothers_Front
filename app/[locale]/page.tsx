import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { BusinessDirections } from "@/components/business-directions"
import { ProjectsSection } from "@/components/projects-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <AboutSection />
      <BusinessDirections />
      <ProjectsSection />
      <PartnersSection />
      <ContactSection />
    </main>
  )
}
