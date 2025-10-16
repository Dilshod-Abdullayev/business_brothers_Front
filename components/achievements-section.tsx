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

  // Optimized parallax with GPU acceleration
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Static gradient background - no animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* CSS animated gradient orbs - GPU optimized */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <m.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">{t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {t('title')} {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Optimized parallax - GPU accelerated
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30])

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, achievement.value, {
        duration: 2,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [isInView, achievement.value, count])

  return (
    <m.div
      ref={cardRef}
      style={{ 
        y,
        willChange: 'transform' // GPU hint
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative bg-[#1f2937] border border-gray-700 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 h-full">
        {/* Icon */}
        <m.div
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.4 }}
          className="relative mb-6"
        >
          <m.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.gradient} backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden`}
          >
            <achievement.icon className={`w-8 h-8 ${achievement.iconColor} relative z-10`} />
            {/* CSS pulse - no JS */}
            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} animate-ping opacity-20`} />
          </m.div>
        </m.div>

        {/* Counter */}
        <div className="mb-4">
          <div className="text-5xl font-bold text-white mb-2 font-[family-name:var(--font-poppins)]">
            <m.span>{displayValue}</m.span>
            <span className="text-primary">{achievement.suffix}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {achievement.label}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* Progress Bar */}
        <m.div
          className="h-1 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <m.div
            className={`h-full bg-gradient-to-r ${achievement.gradient} relative overflow-hidden`}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.5, ease: "easeOut" }}
          >
            {/* Shimmer effect - CSS only */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </m.div>
        </m.div>

        {/* Hover shine - no infinity loop */}
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </m.div>
  )
})
