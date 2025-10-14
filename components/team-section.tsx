"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Users, Linkedin, Mail, Phone, Sparkles } from "lucide-react"
import { useTranslations } from 'next-intl'

const team = [
  {
    name: "Jamshid Nazarov",
    position: "Bosh Direktor & Asoschisi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    bio: "20+ yillik tajribaga ega, halal biznes sohasining yetakchi mutaxassisi",
    experience: "20+",
    social: {
      linkedin: "#",
      email: "jamshid@businessbrothers.uz",
      phone: "+998 90 123 45 67"
    }
  },
  {
    name: "Sardor Aliyev",
    position: "Moliya Direktori",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop",
    bio: "Xalqaro moliya va investitsiya bo'yicha ekspert, global bozorlar mutaxassisi",
    experience: "15+",
    social: {
      linkedin: "#",
      email: "sardor@businessbrothers.uz",
      phone: "+998 90 123 45 68"
    }
  },
  {
    name: "Dilshod Karimov",
    position: "Operatsion Direktor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop",
    bio: "Biznes jarayonlarini optimallashtirish va raqamli transformatsiya mutaxassisi",
    experience: "18+",
    social: {
      linkedin: "#",
      email: "dilshod@businessbrothers.uz",
      phone: "+998 90 123 45 69"
    }
  },
  {
    name: "Nodira Rahimova",
    position: "Marketing Direktori",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
    bio: "Brending va raqamli marketing sohasida 15+ yillik tajriba, global kampaniyalar eksperti",
    experience: "15+",
    social: {
      linkedin: "#",
      email: "nodira@businessbrothers.uz",
      phone: "+998 90 123 45 70"
    }
  }
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const t = useTranslations('team')

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-white">{t('badge')}</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Team Grid - Simple */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: any; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        {/* Experience Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-primary/30">
          <div className="text-sm font-bold text-primary">{member.experience} years</div>
        </div>

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
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <div className="h-0.5 w-10 bg-primary rounded-full mb-2" />
        <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          {member.position}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}
