"use client"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Users, Linkedin, Mail, Phone, Sparkles } from "lucide-react"
import { useTranslations } from 'next-intl'

// Team data will be created inside the component to use translations

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const t = useTranslations('team')

  const team = [
    {
      name: "Fakhriddin Maksumov",
      position: t('founder.title'),
      image: "/images/fakhriddin.jpg",
      bio: t('founder.expertise'),
      experience: "15+",
      level: "founder",
      social: {
        linkedin: "#",
        email: "businessbrotherspartners@gmail.com",
        phone: "+998 93 398 50 50"
      }
    },
    {
      name: "Mardon Karimov",
      position: t('positions.headSpecialist'),
      image: "/images/mardon.jpg",
      bio: t('bios.mardon'),
      experience: "13+",
      level: "specialist",
      social: {
        linkedin: "#",
        email: "businessbrotherspartners@gmail.com",
        phone: "+998 93 398 50 50"
      }
    },
    {
      name: "Dilshod Abdullayev",
      position: t('positions.itSpecialist'),
      image: "/images/dilshod.jpg",
      bio: t('bios.dilshod'),
      experience: "3+",
      level: "specialist",
      social: {
        linkedin: "#",
        email: "businessbrotherspartners@gmail.com",
        phone: "+998 93 398 50 50"
      }
    }
  ]


  return (
    <section ref={ref} className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 sm:mb-6">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-white">{t('badge')}</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>

          {/* Organizational Chart Description */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tashkiliy tuzilma</span>
          </div>
        </m.div>

        {/* Organizational Chart */}
        <div className="relative max-w-6xl mx-auto">
          {/* Founder - Top Level */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <TeamCard member={team[0]} index={0} isFounder={true} />
          </div>

          {/* Connecting Lines from Founder */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-primary to-accent"></div>
          </div>

          {/* Executive Team - Second Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {team.slice(1).map((member, index) => (
              <div key={member.name} className="relative">
                {/* Connecting Line */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                
                <TeamCard member={member} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index, isFounder = false }: { member: any; index: number; isFounder?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
      className={`group relative overflow-hidden transition-all duration-300 ${
        isFounder 
          ? "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/50 rounded-3xl shadow-2xl shadow-primary/30 hover:shadow-primary/50" 
          : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20"
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isFounder ? "h-72 sm:h-96" : "h-56 sm:h-72"}`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={index === 0}
        />
        <div className={`absolute inset-0 ${isFounder ? "bg-gradient-to-t from-primary/20 via-primary/10 to-transparent" : "bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"}`} />
        
        {/* Experience Badge */}
        <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-lg backdrop-blur-sm border ${
          isFounder 
            ? "bg-primary/80 border-primary text-white" 
            : "bg-black/60 border-primary/30"
        }`}>
          <div className={`text-xs sm:text-sm font-bold ${isFounder ? "text-white" : "text-primary"}`}>
            {member.experience} years
          </div>
        </div>

        {/* Founder Badge */}
        {isFounder && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg">
            <div className="text-xs sm:text-sm font-bold text-white">ASOSCHI</div>
          </div>
        )}

        {/* Social Links - Show on Hover */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href={member.social.linkedin} className="flex-1 p-2 bg-blue-600/80 backdrop-blur-sm rounded-lg hover:bg-blue-600 transition-colors">
            <Linkedin className="w-4 h-4 text-white mx-auto" />
          </a>
          <a href={`mailto:${member.social.email}`} className="flex-1 p-2 bg-purple-600/80 backdrop-blur-sm rounded-lg hover:bg-purple-600 transition-colors">
            <Mail className="w-4 h-4 text-white mx-auto" />
          </a>
          <a href={`tel:${member.social.phone}`} className="flex-1 p-2 bg-green-600/80 backdrop-blur-sm rounded-lg hover:bg-green-600 transition-colors">
            <Phone className="w-4 h-4 text-white mx-auto" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-5 ${isFounder ? "pb-5 sm:pb-6" : ""}`}>
        <h3 className={`font-bold mb-1 group-hover:text-primary transition-colors ${
          isFounder ? "text-xl sm:text-2xl text-white" : "text-lg sm:text-xl text-white"
        }`}>
          {member.name}
        </h3>
        <div className={`h-0.5 rounded-full mb-2 ${
          isFounder ? "w-16 bg-gradient-to-r from-primary to-accent" : "w-10 bg-primary"
        }`} />
        <p className={`font-semibold uppercase tracking-wider mb-2 sm:mb-3 ${
          isFounder ? "text-primary text-xs sm:text-sm" : "text-primary text-xs"
        }`}>
          {member.position}
        </p>
        <p className={`leading-relaxed ${
          isFounder ? "text-gray-300 text-sm sm:text-base" : "text-gray-400 text-xs sm:text-sm"
        }`}>
          {member.bio}
        </p>
      </div>
    </m.div>
  )
}
