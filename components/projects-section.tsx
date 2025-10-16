"use client"

import { m, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { useTranslations } from 'next-intl'

// Projects data will be created inside the component to use translations

function ProjectCard({ project, index }: any) {
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

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
      
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#1f2937] border border-gray-700 h-[450px] sm:h-[500px] lg:h-[550px] shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-500">
        {/* Image with Zoom */}
        <div className="relative h-full overflow-hidden">
          <m.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          </m.div>

          {/* Floating Badge */}
          <m.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10"
          >
            <div className="px-3 sm:px-5 py-1 sm:py-2 rounded-full bg-black/80 backdrop-blur-md border border-primary/30 flex items-center gap-2 shadow-lg">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">{project.category}</span>
            </div>
          </m.div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 z-20">
            <m.h3
              className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)] mb-4 sm:mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              {project.title}
            </m.h3>

            {/* Stats Grid */}
            <m.div
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              {Object.entries(project.stats).map(([key, value], idx) => (
                  <m.div
                  key={key}
                  className="backdrop-blur-sm bg-black/60 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-primary/20"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{String(value)}</div>
                  <div className="text-xs text-muted-foreground uppercase font-medium">{key}</div>
                </m.div>
              ))}
            </m.div>

            {/* Button */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
            >
              <Button
                variant="outline"
                className="border-2 border-primary/50 hover:bg-primary/10 group/btn bg-black/60 backdrop-blur-sm shadow-lg text-sm sm:text-base"
              >
                Ko'proq bilish
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </m.div>
          </div>

          {/* Shine Effect */}
          <m.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </m.div>
  )
}

export function ProjectsSection() {
  const t = useTranslations('projects')
  
  const projects = [
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
      title: t('importTerminal.title'),
      category: t('importTerminal.category'),
      image: "/smart-city-technology-dashboard.jpg",
      stats: { products: t('importTerminal.products'), beverages: t('importTerminal.beverages'), status: t('importTerminal.status') },
      gradient: "from-blue-500/20 to-indigo-600/20",
      description: t('importTerminal.description')
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
                Asosiy Loyiha - FOOD BAZAR
              </span>
            </m.h2>
            <m.p
              className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            22 million dollarlik halal turizm markazi loyihasi
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
