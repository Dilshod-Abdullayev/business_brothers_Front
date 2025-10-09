"use client"

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Award, Users, TrendingUp, Target, Linkedin, Mail, Phone, Star, Sparkles, Briefcase, Trophy } from "lucide-react"

const team = [
  {
    name: "Jamshid Nazarov",
    position: "Bosh Direktor & Asoschisi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    bio: "20+ yillik tajribaga ega, halal biznes sohasining yetakchi mutaxassisi va strategik yetakchi",
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    stats: {
      experience: "20+",
      projects: "150+",
      awards: "25+"
    },
    skills: [
      { name: "Leadership", level: 98 },
      { name: "Strategy", level: 95 },
      { name: "Business Dev", level: 92 }
    ],
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
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    stats: {
      experience: "15+",
      projects: "120+",
      awards: "18+"
    },
    skills: [
      { name: "Finance", level: 97 },
      { name: "Analytics", level: 94 },
      { name: "Investment", level: 91 }
    ],
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
    bio: "Biznes jarayonlarini optimallashtirish va raqamli transformatsiya bo'yicha mutaxassis",
    gradient: "from-orange-500 via-red-500 to-orange-600",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    stats: {
      experience: "18+",
      projects: "200+",
      awards: "22+"
    },
    skills: [
      { name: "Operations", level: 96 },
      { name: "Process Opt", level: 93 },
      { name: "Tech Transform", level: 89 }
    ],
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
    gradient: "from-green-500 via-emerald-500 to-green-600",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    stats: {
      experience: "15+",
      projects: "180+",
      awards: "20+"
    },
    skills: [
      { name: "Branding", level: 95 },
      { name: "Digital Mktg", level: 96 },
      { name: "Campaign", level: 93 }
    ],
    social: {
      linkedin: "#",
      email: "nodira@businessbrothers.uz",
      phone: "+998 90 123 45 70"
    }
  }
]

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseInt(value.replace(/\D/g, ''))
    const suffix = value.replace(/[0-9]/g, '')

    const controls = animate(0, numericValue, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayValue(Math.floor(latest) + suffix)
      }
    })

    return () => controls.stop()
  }, [isInView, value, duration])

  return <div ref={ref}>{displayValue}</div>
}

export function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -60, 0],
            y: [0, -80, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header - Apple iPhone Style */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-24 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 mb-8 backdrop-blur-md shadow-2xl shadow-primary/10"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Users className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Professional Jamoa
              </span>
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-poppins)] mb-8 leading-tight"
            >
              <span className="block mb-3">Bizning</span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Dream Team
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            >
              Bizning jamoamiz - bu tajribali mutaxassislar, ularning har biri o'z sohasida 
              <span className="text-primary font-semibold"> professional va innovatsion</span> yechimlar yaratadi
            </motion.p>

            {/* Global Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12"
            >
              {[
                { icon: Briefcase, value: "650+", label: "Total Projects" },
                { icon: Trophy, value: "85+", label: "Awards Won" },
                { icon: Star, value: "100%", label: "Success Rate" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-[#1f2937] to-[#151d2e] border border-gray-700 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
                    <div className="text-4xl font-bold text-primary mb-2">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Team Grid - Apple-style Staggered Reveal */}
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

  // Apple-style parallax effects
  const y = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -120]), {
    stiffness: 100,
    damping: 30
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])

  // Different entry directions for each card - Apple style
  const directions = [
    { x: -100, rotate: -10 },  // from left
    { x: 100, rotate: 10 },    // from right
    { x: -100, rotate: -10 },  // from left
    { x: 100, rotate: 10 }     // from right
  ]

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        y, 
        opacity, 
        scale,
        transformStyle: "preserve-3d",
        rotateX
      }}
      initial={{ 
        opacity: 0, 
        x: directions[index].x, 
        rotate: directions[index].rotate,
        scale: 0.8
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        rotate: 0,
        scale: 1
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.15,
        type: "spring",
        bounce: 0.4
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        rotateY: 5,
        transition: { duration: 0.4 }
      }}
      className="group relative"
    >
      {/* Multi-layer Glow Effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-3xl blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700`} />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-3xl blur-2xl opacity-0"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: index * 0.5
        }}
      />
      
      <div className="relative bg-gradient-to-br from-[#1f2937] via-[#1a2332] to-[#151d2e] border-2 border-gray-700 rounded-3xl overflow-hidden hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 h-full backdrop-blur-xl">
        {/* Image Section with Premium Effects */}
        <div className="relative h-72 overflow-hidden group/image">
          {/* Main Image */}
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index === 0}
            />
            {/* Gradient Overlays */}
            <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-30`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-700" />
          </motion.div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
            {/* Leader Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.3, type: "spring", bounce: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${member.gradient} backdrop-blur-md border border-white/30 shadow-2xl flex items-center gap-2`}>
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="text-xs font-bold text-white">Top Leader</span>
              </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.4, type: "spring", bounce: 0.6 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-black/80 backdrop-blur-md border-2 border-primary/40 flex flex-col items-center justify-center shadow-2xl">
                <div className="text-lg font-bold text-primary">{member.stats.experience.replace('+', '')}</div>
                <div className="text-[8px] text-gray-400 uppercase font-bold">Years</div>
              </div>
            </motion.div>
          </div>

          {/* Animated Pulse Border */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent group-hover/image:border-primary/50 transition-all duration-500 pointer-events-none rounded-t-3xl"
            animate={{
              boxShadow: [
                "inset 0 0 0px rgba(88, 101, 242, 0)",
                "inset 0 0 30px rgba(88, 101, 242, 0.4)",
                "inset 0 0 0px rgba(88, 101, 242, 0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: index * 0.3
            }}
          />

          {/* Hover Social Links - Apple style slide up */}
          <motion.div
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40 flex items-end justify-center p-6 z-20"
          >
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: member.social.linkedin, color: "from-blue-600 to-blue-500" },
                { Icon: Mail, href: `mailto:${member.social.email}`, color: "from-purple-600 to-purple-500" },
                { Icon: Phone, href: `tel:${member.social.phone}`, color: "from-green-600 to-green-500" }
              ].map(({ Icon, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -8,
                    rotate: [0, -10, 10, 0]
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl hover:shadow-primary/50`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-5">
          {/* Name & Position */}
          <div>
            <motion.h3
              className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors font-[family-name:var(--font-poppins)]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.5 }}
              whileHover={{ x: 5 }}
            >
              {member.name}
            </motion.h3>
            
            <motion.div 
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
            >
              <div className={`h-1 w-12 bg-gradient-to-r ${member.gradient} rounded-full`} />
              <p className="text-primary text-xs font-bold uppercase tracking-wider">{member.position}</p>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.7 }}
            >
              {member.bio}
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-3 gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.8 }}
          >
            {Object.entries(member.stats).map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.85 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className={`text-center p-3 rounded-xl bg-gradient-to-br ${member.iconBg} border border-primary/20 hover:border-primary/40 transition-all duration-300`}
              >
                <div className={`text-xl font-bold ${member.iconColor}`}>
                  <AnimatedCounter value={value as string} duration={2} />
                </div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">{key}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Progress Bars */}
          <motion.div
            className="space-y-3 pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.9 }}
          >
            {member.skills.map((skill: any, i: number) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-300">{skill.name}</span>
                  <span className={`text-xs font-bold ${member.iconColor}`}>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${member.gradient} rounded-full relative overflow-hidden`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.5, 
                      delay: index * 0.15 + 1 + i * 0.1, 
                      ease: "easeOut" 
                    }}
                  >
                    {/* Shine effect on progress bar */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: i * 0.3
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Card Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 1 }}
        />

        {/* 3D Border Glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 blur-sm" style={{ padding: "1px" }} />
        </div>
      </div>
    </motion.div>
  )
}
