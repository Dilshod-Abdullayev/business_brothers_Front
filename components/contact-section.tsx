"use client"

import { m } from "framer-motion"
import { Phone, Mail, MapPin, Send } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    details: ["+998 71 123 45 67", "+998 90 123 45 67"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@businessbrothers.uz", "contact@businessbrothers.uz"]
  },
  {
    icon: MapPin,
    title: "Manzil",
    details: ["Toshkent shahri, Yunusobod tumani", "Amir Temur ko'chasi, 107A"]
  }
]

const stats = [
  { label: "Loyihalar", value: "10+", icon: Phone },
  { label: "Hamkorlar", value: "50+", icon: Mail },
  { label: "Tajriba", value: "5+", icon: MapPin }
]

export function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section id="aloqa" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
          >
            <Send className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">{t('badge')}</span>
          </m.div>

          <m.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('title')}
            </span>
          </m.h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-[#1f2937] border border-gray-700 rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16">
          {contactInfo.map((info, index) => (
            <m.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1f2937] border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{info.title}</h4>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-muted-foreground text-xs sm:text-sm">{detail}</p>
                ))}
              </div>
            </m.div>
          ))}
        </div>

        {/* Main Content - Ideal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Legal & Partnership */}
          <div className="space-y-6">
            {/* Legal & Financial Information */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white">{t('legal.title')}</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-sm text-gray-300">{t('legal.registeredLabel')}</span>
                  <span className="text-white font-medium text-sm">{t('legal.registered')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-sm text-gray-300">{t('legal.capitalLabel')}</span>
                  <span className="text-white font-medium text-sm">{t('legal.capital')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-sm text-gray-300">{t('legal.plannedLabel')}</span>
                  <span className="text-white font-medium text-sm">{t('legal.planned')}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-300">{t('legal.formLabel')}</span>
                  <span className="text-white font-medium text-sm">{t('legal.form')}</span>
                </div>
              </div>
            </m.div>

            {/* Partnership Opportunities */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white">{t('partnership.title')}</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white text-sm">{t('partnership.booths')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white text-sm">{t('partnership.franchise')}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-white text-sm">{t('partnership.agencies')}</p>
                </div>
              </div>
            </m.div>
          </div>

          {/* Right Column - NestOne Location */}
          <div className="space-y-6">
            {/* NestOne Location */}
            <m.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* NestOne Business Center Info */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">NestOne Business Center</h4>
                    <p className="text-sm text-gray-300">Premium Business Location</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-white text-sm">📍 Toshkent shahar, Chilonzor tumani</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-white text-sm">🏢 NestOne Business Center, 5-qavat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white text-sm">⏰ Dushanba - Juma: 09:00 - 18:00</span>
                  </div>
                </div>
              </div>
              
              {/* Interactive Map */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-600 group cursor-pointer">
                <img 
                  src="/tashkent-city-map.jpg" 
                  alt="NestOne Business Center Location" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Location Pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-bold text-lg mb-1">NestOne Business Center</h4>
                  <p className="text-white/90 text-sm">Toshkent, Chilonzor tumani</p>
                  <button className="mt-2 px-3 py-1 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary text-xs font-medium transition-colors">
                    Xarita ko'rish
                  </button>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}