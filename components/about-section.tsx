"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Users, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react"
import { useTranslations } from 'next-intl'
import Image from "next/image"

export function AboutSection() {
  const t = useTranslations('about')

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
    <section id="haqimizda" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Kompaniya haqida</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('title')}
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground leading-relaxed text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('description')}
            </motion.p>
          </motion.div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-[#1f2937] border border-gray-700 rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300 overflow-hidden">
                {/* Icon with Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-xl ${value.bgColor} flex items-center justify-center mb-4 relative z-10`}
                >
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </motion.div>

                <h3 className="text-lg font-semibold mb-3 relative z-10">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{value.description}</p>

                {/* Decorative Element */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Bizning yo'limiz</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('timeline.title')}
            </h3>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-12">
              {[
                { year: "2020", title: t('timeline.2020.title'), desc: t('timeline.2020.description') },
                { year: "2021", title: t('timeline.2021.title'), desc: t('timeline.2021.description') },
                { year: "2022", title: t('timeline.2022.title'), desc: t('timeline.2022.description') },
                { year: "2023", title: t('timeline.2023.title'), desc: t('timeline.2023.description') },
                { year: "2024", title: t('timeline.2024.title'), desc: t('timeline.2024.description') },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-8 group"
                >
                  {/* Year Badge */}
                  <motion.div
                    className="flex-shrink-0 w-28 text-right"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/50 transition-shadow">
                      <span className="text-3xl font-bold text-white font-[family-name:var(--font-poppins)]">
                        {item.year}
                      </span>
                    </div>
                  </motion.div>

                  {/* Timeline Dot */}
                  <motion.div
                    className="flex-shrink-0 relative z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.5 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary shadow-lg shadow-primary/50 ring-4 ring-background" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className="flex-1 relative group/card"
                    whileHover={{ x: 10 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-[#1f2937] border border-gray-700 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
