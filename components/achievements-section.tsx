"use client"

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from "framer-motion"
import { useRef, useEffect } from "react"
import { TrendingUp, Users, Award, Building2, DollarSign, Globe } from "lucide-react"
import { BusinessGraphAnimation, ParticleField } from "./business-animations"

const achievements = [
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Muvaffaqiyatli Loyihalar",
    description: "Qurilish va biznes sohasida amalga oshirilgan",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Qoniqarli Mijozlar",
    description: "Butun O'zbekiston va xalqaro bozorda",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500"
  },
  {
    icon: DollarSign,
    value: 50,
    suffix: "M+",
    label: "Yillik Aylanma",
    description: "Barqaror o'sish va rivojlanish",
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-500"
  },
  {
    icon: Award,
    value: 25,
    suffix: "+",
    label: "Mukofotlar",
    description: "Milliy va xalqaro tan olinish",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Muvaffaqiyat Darajasi",
    description: "Yuqori sifat va ishonchlilik",
    gradient: "from-red-500/20 to-rose-500/20",
    iconColor: "text-red-500"
  },
  {
    icon: Globe,
    value: 15,
    suffix: "+",
    label: "Mamlakatlar",
    description: "Xalqaro hamkorlik va eksport",
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-500"
  }
]

export function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Apple-style parallax
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Business Animations */}
      <BusinessGraphAnimation />
      <ParticleField />
      
      {/* Animated Orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Bizning Yutuqlar</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-poppins)] mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Raqamlarda Muvaffaqiyat
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ko'p yillik tajriba va qat'iyat natijasida erishilgan yutuqlarimiz
          </p>
        </motion.div>

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

function AchievementCard({ achievement, index }: { achievement: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.5 })
  
  const count = useMotionValue(0)
  const rounded = useSpring(count, { stiffness: 50, damping: 20 })
  const displayValue = useTransform(rounded, (latest) => Math.round(latest))

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, achievement.value, {
        duration: 2.5,
        ease: "easeOut",
      })
      return controls.stop
    }
  }, [isInView, achievement.value, count])

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative bg-[#1f2937] border border-gray-700 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 h-full">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          className="relative mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.gradient} backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl`}
          >
            <achievement.icon className={`w-8 h-8 ${achievement.iconColor}`} />
          </motion.div>
          
          {/* Pulse Effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${achievement.gradient}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Counter */}
        <div className="mb-4">
          <div className="text-5xl font-bold text-white mb-2 font-[family-name:var(--font-poppins)]">
            <motion.span>{displayValue}</motion.span>
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
        <motion.div
          className="h-1 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${achievement.gradient}`}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.1 + 0.6, ease: "easeOut" }}
          />
        </motion.div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

