"use client"

import { m, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "framer-motion"
import { useRef, useEffect, memo } from "react"
import { TrendingUp, Users, Award, Building2, DollarSign, Globe } from "lucide-react"
import { useTranslations } from 'next-intl'

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('achievements')
  const tItems = useTranslations('achievements.items')
  
  const achievements = [
    {
      icon: Building2,
      value: 500,
      suffix: "+",
      label: tItems('projects.label'),
      description: tItems('projects.description'),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: Users,
      value: 10000,
      suffix: "+",
      label: tItems('clients.label'),
      description: tItems('clients.description'),
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    },
    {
      icon: DollarSign,
      value: 50,
      suffix: "M+",
      label: tItems('revenue.label'),
      description: tItems('revenue.description'),
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-500"
    },
    {
      icon: Award,
      value: 25,
      suffix: "+",
      label: tItems('awards.label'),
      description: tItems('awards.description'),
      gradient: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: TrendingUp,
      value: 98,
      suffix: "%",
      label: tItems('success.label'),
      description: tItems('success.description'),
      gradient: "from-red-500/20 to-rose-500/20",
      iconColor: "text-red-500"
    },
    {
      icon: Globe,
      value: 15,
      suffix: "+",
      label: tItems('countries.label'),
      description: tItems('countries.description'),
      gradient: "from-indigo-500/20 to-violet-500/20",
      iconColor: "text-indigo-500"
    }
  ]
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Optimized parallax - smoother transitions
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-6 sm:py-8 lg:py-10 overflow-hidden">
      {/* Static gradient background - no animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* CSS animated gradient orbs - GPU optimized */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-delayed opacity-40" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <m.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">{t('badge')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-2 sm:mb-3">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {t('title')} {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl mx-auto leading-tight">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.label} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Memoized card for better performance
const AchievementCard = memo(function AchievementCard({ achievement, index }: { achievement: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.1 })
  
  const count = useMotionValue(0)
  const rounded = useSpring(count, { stiffness: 50, damping: 20 })
  const displayValue = useTransform(rounded, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, achievement.value, {
        duration: 1.5,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [isInView, achievement.value, count])

  return (
    <m.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative bg-[#1f2937] border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary/50 transition-all duration-300 h-full">
        {/* Icon */}
        <m.div
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: index * 0.05 + 0.1, type: "spring", bounce: 0.3 }}
          className="relative mb-2 sm:mb-3"
        >
          <m.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${achievement.gradient} backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden`}
          >
            <achievement.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${achievement.iconColor} relative z-10`} />
            {/* CSS pulse - no JS */}
            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} animate-ping opacity-20`} />
          </m.div>
        </m.div>

        {/* Counter */}
        <div className="mb-2 sm:mb-3">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 font-[family-name:var(--font-poppins)]">
            <m.span>{displayValue}</m.span>
            <span className="text-primary">{achievement.suffix}</span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-primary transition-colors">
            {achievement.label}
          </h3>
          <p className="text-xs text-gray-400 leading-tight">
            {achievement.description}
          </p>
        </div>

        {/* Progress Bar */}
        <m.div
          className="h-0.5 sm:h-1 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.3 }}
        >
          <m.div
            className={`h-full bg-gradient-to-r ${achievement.gradient} relative overflow-hidden`}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.05 + 0.4, ease: "easeOut" }}
          >
            {/* Shimmer effect - CSS only */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </m.div>
        </m.div>

        {/* Hover shine - no infinity loop */}
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </m.div>
  )
})
