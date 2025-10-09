"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Users, TrendingUp } from "lucide-react"
import { useTranslations } from 'next-intl'

export function AboutSection() {
  const t = useTranslations('about')

  const values = [
    {
      icon: Target,
      title: t('directions.food.title'),
      description: t('directions.food.description'),
    },
    {
      icon: Lightbulb,
      title: t('directions.restaurant.title'),
      description: t('directions.restaurant.description'),
    },
    {
      icon: Users,
      title: t('directions.import.title'),
      description: t('directions.import.description'),
    },
    {
      icon: TrendingUp,
      title: t('directions.tourism.title'),
      description: t('directions.tourism.description'),
    },
  ]

  return (
    <section id="haqimizda" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              {t('description')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="relative bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
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
          className="mt-32 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] text-center mb-16">
            {t('timeline.title')}
          </h3>
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
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-8"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-4xl font-bold text-primary font-[family-name:var(--font-poppins)]">
                    {item.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
