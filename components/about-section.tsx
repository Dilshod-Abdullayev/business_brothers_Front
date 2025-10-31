"use client"

import { m, useScroll, useTransform } from "framer-motion"
import { Target, Lightbulb, Users, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react"
import { useTranslations } from 'next-intl'
import Image from "next/image"
import { useRef } from "react"
import { DataFlowAnimation, FloatingBusinessIcons } from "./business-animations"
import FinancialHighlights from "./financial-highlights"

export function AboutSection() {
  const t = useTranslations('about')
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const values = [
    {
      icon: Target,
      title: t('directions.food.title'),
      description: t('directions.food.description'),
      color: "from-emerald-500/20 to-green-600/20",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Lightbulb,
      title: t('directions.restaurant.title'),
      description: t('directions.restaurant.description'),
      color: "from-orange-500/20 to-red-600/20",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Users,
      title: t('directions.import.title'),
      description: t('directions.import.description'),
      color: "from-blue-500/20 to-indigo-600/20",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      title: t('directions.tourism.title'),
      description: t('directions.tourism.description'),
      color: "from-purple-500/20 to-pink-600/20",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <section ref={sectionRef} id="haqimizda" className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Business Animations */}
      <DataFlowAnimation />
      <FloatingBusinessIcons />
      
      {/* CSS Animated Background Elements */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <m.div style={{ opacity }} className="max-w-4xl mx-auto text-center mb-4 sm:mb-6">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">{t('badge')}</span>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <m.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-2 sm:mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('title')}
              </span>
            </m.h2>
            <m.p
              className="text-xs sm:text-sm text-muted-foreground leading-tight text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {t('description')}
            </m.p>
          </m.div>
        </m.div>

        {/* Financial Highlights */}
        <FinancialHighlights />

        {/* Values Cards */}
        <m.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {values.map((value, index) => (
            <m.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-[#1f2937] border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full hover:border-primary/50 transition-all duration-300 overflow-hidden">
                {/* Icon with Animation */}
                <m.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${value.bgColor} flex items-center justify-center mb-3 sm:mb-4 relative z-10`}
                >
                  <value.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${value.iconColor}`} />
                </m.div>

                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 relative z-10">{value.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed relative z-10">{value.description}</p>

                {/* Decorative Element - CSS pulse */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse opacity-40" />
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Timeline - Compact for one screen */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">{t('timeline.badge')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('timeline.title')}
            </h3>
          </m.div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="absolute left-[6rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {[
                { year: "2024", title: t('timeline.2020.title'), desc: t('timeline.2020.description') },
                { year: "", title: t('timeline.2021.title'), desc: t('timeline.2021.description') },
                { year: "", title: t('timeline.2022.title'), desc: t('timeline.2022.description') },
                { year: "", title: t('timeline.2023.title'), desc: t('timeline.2023.description') },
                { year: "", title: t('timeline.2024.title'), desc: t('timeline.2024.description') },
              ].map((item, index) => (
                <m.div
                  key={`${item.year || index}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 group"
                >
                  {/* Year Badge */}
                  <m.div
                    className="flex-shrink-0 w-full md:w-24 text-left md:text-right"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.year && (
                      <div className="inline-block px-3 py-1.5 rounded-lg bg-gradient-to-br from-primary to-accent shadow-md shadow-primary/30 group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow">
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-poppins)]">
                          {item.year}
                        </span>
                      </div>
                    )}
                  </m.div>

                  {/* Timeline Dot - Hidden on mobile */}
                  <m.div
                    className="flex-shrink-0 relative z-10 hidden md:block"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.15 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-primary shadow-md shadow-primary/50 ring-2 ring-background relative">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
                    </div>
                  </m.div>

                  {/* Content Card */}
                  <m.div
                    className="flex-1 relative group/card"
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[#1f2937] border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary/50 transition-all duration-300">
                      <h4 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{item.desc}</p>
                    </div>
                  </m.div>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
