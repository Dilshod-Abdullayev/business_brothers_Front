"use client"

import { m, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { useTranslations } from 'next-intl'

// Projects data will be created inside the component to use translations

function ProjectCard({ project, index }: any) {
  const t = useTranslations('projects')
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleCardClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="group cursor-pointer relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-2xl opacity-10 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className="relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-[#1f2937] border border-gray-700 min-h-[480px] sm:min-h-[520px] shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-500">
        {/* Image zone — full screenshot visible for IT projects */}
        <div className={`relative w-full shrink-0 overflow-hidden bg-[#0f1419] ${
          project.imageFit === 'contain' ? 'h-[240px] sm:h-[280px] lg:h-[320px]' : 'h-[220px] sm:h-[260px] lg:h-[300px]'
        }`}>
          <m.div
            className="relative h-full w-full p-2 sm:p-3"
            whileHover={{ scale: project.imageFit === 'contain' ? 1.02 : 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className={
                project.imageFit === 'contain'
                  ? 'object-contain object-center'
                  : 'object-cover object-center'
              }
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              loading={index === 0 ? "eager" : "lazy"}
              quality={90}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                if (target && project.image) {
                  target.src = '/placeholder.svg'
                }
              }}
            />
          </m.div>

          {/* Category badge */}
          <m.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
            className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10"
          >
            <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-primary/30 flex items-center gap-2 shadow-lg">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">{project.category}</span>
            </div>
          </m.div>

          {/* Shine Effect */}
          <m.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Content — below image, no overlap */}
        <div className={`relative flex flex-1 flex-col p-4 sm:p-6 border-t border-gray-700/80 bg-gradient-to-br ${project.gradient} from-[#1f2937] to-[#111827]`}>
          <m.h3
            className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-poppins)] mb-3 sm:mb-4 text-white"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 + 0.15 }}
          >
            {project.title}
          </m.h3>

          <m.div
            className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5 flex-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
          >
            {Object.entries(project.stats).map(([key, value]) => (
              <m.div
                key={key}
                className="rounded-lg sm:rounded-xl p-2 sm:p-3 border border-primary/20 bg-black/40"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-sm sm:text-base lg:text-lg font-bold text-primary leading-tight">{String(value)}</div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5 line-clamp-2">{key}</div>
              </m.div>
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 + 0.25 }}
          >
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary/50 hover:bg-primary/10 group/btn bg-black/50 text-sm sm:text-base"
            >
              {t('learnMore')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </m.div>
        </div>
      </div>
    </m.div>
  )
}

export function ProjectsSection() {
  const t = useTranslations('projects')
  
  const projects = [
    {
      title: t('joytop.title'),
      category: t('joytop.category'),
      image: "/images/joytop.jpg",
      imageFit: 'contain' as const,
      stats: {
        [t('joytop.platformLabel')]: t('joytop.platform'),
        [t('joytop.focusLabel')]: t('joytop.focus'),
        [t('joytop.statusLabel')]: t('joytop.status'),
      },
      gradient: "from-emerald-500/20 to-teal-600/20",
      description: t('joytop.description'),
      link: "https://joy.com.uz/?type=sale",
    },
    {
      title: t('mahsulottop.title'),
      category: t('mahsulottop.category'),
      image: "/images/mahsulottop.jpg",
      stats: {
        [t('mahsulottop.platformLabel')]: t('mahsulottop.platform'),
        [t('mahsulottop.focusLabel')]: t('mahsulottop.focus'),
        [t('mahsulottop.statusLabel')]: t('mahsulottop.status'),
      },
      gradient: "from-cyan-500/20 to-blue-600/20",
      description: t('mahsulottop.description'),
      link: "https://www.mahsulottop.uz/",
      imageFit: 'contain' as const,
    },
    {
      title: t('carinpocket.title'),
      category: t('carinpocket.category'),
      image: "/images/carinpocket.jpg",
      imageFit: 'contain' as const,
      stats: {
        [t('carinpocket.platformLabel')]: t('carinpocket.platform'),
        [t('carinpocket.focusLabel')]: t('carinpocket.focus'),
        [t('carinpocket.statusLabel')]: t('carinpocket.status'),
      },
      gradient: "from-slate-500/20 to-zinc-600/20",
      description: t('carinpocket.description'),
      link: "https://www.carinpocket.com/marketplace",
    },
    {
      title: t('importTerminal.title'),
      category: t('importTerminal.category'),
      image: "/images/milaf-project.jpg",
      stats: { products: t('importTerminal.products'), beverages: t('importTerminal.beverages'), status: t('importTerminal.status') },
      gradient: "from-blue-500/20 to-indigo-600/20",
      description: t('importTerminal.description'),
      link: "https://www.milafcola.com.uz/"
    },
    {
      title: t('foodCenter.title'),
      category: t('foodCenter.category'),
      image: "/international-trade-logistics-center.jpg",
      stats: { investment: "$22M", location: t('foodCenter.location'), status: t('foodCenter.status') },
      gradient: "from-emerald-500/20 to-green-600/20",
      description: t('foodCenter.description'),
      goal: t('foodCenter.goal')
    },
    {
      title: t('restaurantNetwork.title'),
      category: t('restaurantNetwork.category'),
      image: "/modern-residential-complex-architecture.jpg",
      stats: { restaurants: t('restaurantNetwork.restaurants'), cuisine: t('restaurantNetwork.cuisine'), status: t('restaurantNetwork.status') },
      gradient: "from-orange-500/20 to-red-600/20",
      description: t('restaurantNetwork.description')
    },

    {
      title: t('tourismAgency.title'),
      category: t('tourismAgency.category'),
      image: "/modern-business-training-center.jpg",
      stats: { services: t('tourismAgency.services'), tourism: t('tourismAgency.tourism'), status: t('tourismAgency.status') },
      gradient: "from-purple-500/20 to-pink-600/20",
      description: t('tourismAgency.description')
    },
  ]
  
  return (
    <section id="loyihalar" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800" />

      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float opacity-40" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">{t('badge')}</span>
          </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          >
            <m.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
{t('title')}
              </span>
            </m.h2>
            <m.p
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
{t('subtitle')}
            </m.p>
        </m.div>
      </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
