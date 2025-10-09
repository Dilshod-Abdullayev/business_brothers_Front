"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Award, Users, TrendingUp, Target, Linkedin, Mail, Phone } from "lucide-react"

const team = [
  {
    name: "Jamshid Nazarov",
    position: "Bosh Direktor & Asoschisi",
    image: "/team/director.jpg",
    bio: "20+ yillik tajribaga ega, halal biznes sohasining yetakchi mutaxassisi",
    social: {
      linkedin: "#",
      email: "jamshid@businessbrothers.uz",
      phone: "+998 90 123 45 67"
    }
  },
  {
    name: "Sardor Aliyev",
    position: "Moliya Direktori",
    image: "/team/cfo.jpg",
    bio: "Xalqaro moliya va investitsiya bo'yicha ekspert",
    social: {
      linkedin: "#",
      email: "sardor@businessbrothers.uz",
      phone: "+998 90 123 45 68"
    }
  },
  {
    name: "Dilshod Karimov",
    position: "Operatsion Direktor",
    image: "/team/coo.jpg",
    bio: "Biznes jarayonlarini optimallashtirish mutaxassisi",
    social: {
      linkedin: "#",
      email: "dilshod@businessbrothers.uz",
      phone: "+998 90 123 45 69"
    }
  },
  {
    name: "Nodira Rahimova",
    position: "Marketing Direktori",
    image: "/team/cmo.jpg",
    bio: "Brending va raqamli marketing sohasida 15+ yillik tajriba",
    social: {
      linkedin: "#",
      email: "nodira@businessbrothers.uz",
      phone: "+998 90 123 45 70"
    }
  }
]

export function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Apple-style scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header - Apple Style */}
        <motion.div
          style={{ scale, opacity }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Bizning Jamoa</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-poppins)] mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Professional Jamoa
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Bizning jamoamiz - bu tajribali mutaxassislar, ularning har biri o'z sohasida professional
            </p>
          </motion.div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Apple-style reveal
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-[#1f2937] border border-gray-700 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 h-full">
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center">
              <Users className="w-24 h-24 text-gray-600" />
            </div>
          </motion.div>
          
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-6"
          >
            <div className="flex gap-3">
              <motion.a
                href={member.social.linkedin}
                whileHover={{ scale: 1.2, y: -5 }}
                className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </motion.a>
              <motion.a
                href={`mailto:${member.social.email}`}
                whileHover={{ scale: 1.2, y: -5 }}
                className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center"
              >
                <Mail className="w-5 h-5 text-primary" />
              </motion.a>
              <motion.a
                href={`tel:${member.social.phone}`}
                whileHover={{ scale: 1.2, y: -5 }}
                className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 text-primary" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors"
            whileHover={{ x: 5 }}
          >
            {member.name}
          </motion.h3>
          <p className="text-primary text-sm font-semibold mb-3">{member.position}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </motion.div>
  )
}

