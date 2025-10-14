"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { useTranslations } from 'next-intl'

const partners = [
  "Uzbekistan Airways",
  "Uzautomotors",
  "Almalyk Mining",
  "Uzcard",
  "Tashkent City",
  "Humo",
  "Uzum",
  "Click",
]

const testimonials = [
  {
    quote:
      "Business Brothers Partners bilan hamkorlik biznesimizni yangi bosqichga olib chiqdi. Professional yondashuv va sifatli xizmat.",
    author: "Sardor Rahimov",
    position: "Direktor, Tech Solutions",
    rating: 5,
  },
  {
    quote: "Ishonchli hamkor va professional jamoa. Loyihalarimiz o'z vaqtida va yuqori sifatda amalga oshirildi.",
    author: "Nilufar Karimova",
    position: "Asoschisi, Edu Group",
    rating: 5,
  },
  {
    quote: "Zamonaviy yondashuvlar va innovatsion yechimlar. Hamkorlikdan juda mamnunmiz.",
    author: "Javohir Tursunov",
    position: "CEO, Build Master",
    rating: 5,
  },
]

export function PartnersSection() {
  const t = useTranslations('partners')
  
  return (
    <section id="hamkorlar" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated Background Orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center justify-center bg-[#1f2937] border border-gray-700 rounded-2xl hover:border-primary/50 transition-all duration-300 h-28 cursor-pointer group will-change-transform"
            >
              <span className="text-xl font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-[#1f2937] border border-gray-700 rounded-3xl p-8 h-full">
                <Quote className="w-12 h-12 text-primary mb-4" />

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                  "{testimonial.quote}"
                </p>

                <div>
                  <div className="font-semibold mb-1">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
