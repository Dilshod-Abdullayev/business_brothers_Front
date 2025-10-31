import dynamic from 'next/dynamic'
import { Metadata } from 'next'

// Dynamic imports for performance - Lazy load sections
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />,
})

const AboutSection = dynamic(() => import("@/components/about-section").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-screen" />,
})

const AchievementsSection = dynamic(() => import("@/components/achievements-section").then(mod => ({ default: mod.AchievementsSection })), {
  loading: () => <div className="min-h-screen" />,
})

const TeamSection = dynamic(() => import("@/components/team-section").then(mod => ({ default: mod.TeamSection })), {
  loading: () => <div className="min-h-screen" />,
})

const BusinessDirections = dynamic(() => import("@/components/business-directions").then(mod => ({ default: mod.BusinessDirections })), {
  loading: () => <div className="min-h-screen" />,
})

const ProjectsSection = dynamic(() => import("@/components/projects-section").then(mod => ({ default: mod.ProjectsSection })), {
  loading: () => <div className="min-h-screen" />,
})

const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="min-h-screen" />,
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const pageContent = {
    uz: {
      title: "Business Brothers and Partners LLC | Fakhriddin Maksumov | Halol Biznes Toshkent",
      description: "Fakhriddin Maksumov asos solgan Business Brothers and Partners LLC - O'zbekistonda halol biznesning yetakchisi. $22 million FOOD BAZAR, Milaf Cola import, premium restoranlar. Toshkent, O'zbekiston.",
    },
    ru: {
      title: "Business Brothers and Partners LLC | Фахриддин Максумов | Халяльный Бизнес Ташкент",
      description: "Business Brothers and Partners LLC, основанная Фахриддином Максумовым - лидер халяльного бизнеса в Узбекистане. FOOD BAZAR $22 млн, импорт Milaf Cola, премиум рестораны. Ташкент, Узбекистан.",
    },
    en: {
      title: "Business Brothers and Partners LLC | Fakhriddin Maksumov | Halal Business Tashkent",
      description: "Business Brothers and Partners LLC founded by Fakhriddin Maksumov - halal business leader in Uzbekistan. $22 million FOOD BAZAR, Milaf Cola import, premium restaurants. Tashkent, Uzbekistan.",
    },
    ar: {
      title: "Business Brothers and Partners LLC | فخريدين مكسوموف | الأعمال الحلال طشقند",
      description: "Business Brothers and Partners LLC التي أسسها فخريدين مكسوموف - رائدة الأعمال الحلال في أوزبكستان. FOOD BAZAR 22 مليون دولار، استيراد Milaf Cola، مطاعم مميزة. طشقند، أوزبكستان.",
    },
  };

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.uz;

  return {
    title: content.title,
    description: content.description,
  };
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  return (
    <main className="relative overflow-hidden">
      {/* SEO: Semantic HTML with proper heading hierarchy */}
      <h1 className="sr-only">Business Brothers Partners LLC - Fakhriddin Maksumov - Halal Business Tashkent Uzbekistan</h1>
      <HeroSection />
      <section id="haqimizda" className="relative overflow-hidden"><AboutSection /></section>
      <section id="yutuqlar" className="relative overflow-hidden"><AchievementsSection /></section>
      <section id="jamoa" className="relative overflow-hidden"><TeamSection /></section>
      <section id="xizmatlar" className="relative overflow-hidden"><BusinessDirections /></section>
      <section id="loyihalar" className="relative overflow-hidden"><ProjectsSection /></section>
      <section id="aloqa" className="relative overflow-hidden"><ContactSection /></section>
    </main>
  )
}
