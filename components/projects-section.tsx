"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const projects = [
  {
    title: "Halal Oziq-ovqat Markazi",
    category: "Oziq-ovqat Savdosi",
    image: "/modern-business-training-center.jpg",
    stats: { products: "500+", partners: "50+", status: "Faol" },
    gradient: "from-emerald-500/20 to-green-600/20",
  },
  {
    title: "Premium Restoranlar Tarmog'i",
    category: "Restoran Biznesi",
    image: "/modern-residential-complex-architecture.jpg",
    stats: { branches: "10+", customers: "50,000+", status: "Kengaymoqda" },
    gradient: "from-orange-500/20 to-red-600/20",
  },
  {
    title: "Xalqaro Import Terminali",
    category: "Import Faoliyati",
    image: "/international-trade-logistics-center.jpg",
    stats: { countries: "20+", products: "1000+", status: "Faol" },
    gradient: "from-blue-500/20 to-indigo-600/20",
  },
  {
    title: "Halal Turizm Agentligi",
    category: "Halal Turizm",
    image: "/smart-city-technology-dashboard.jpg",
    stats: { tours: "50+", travelers: "5,000+", status: "Rivojlanmoqda" },
    gradient: "from-purple-500/20 to-pink-600/20",
  },
]

function ProjectCard({ project, index }: any) {
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer relative"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
      
      <div className="relative overflow-hidden rounded-3xl bg-[#1f2937] border border-gray-700 h-[550px] shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-500">
        {/* Image with Zoom */}
        <div className="relative h-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            className="absolute top-6 left-6 z-10"
          >
            <div className="px-5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-primary/30 flex items-center gap-2 shadow-lg">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">{project.category}</span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <motion.h3
              className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              {project.title}
            </motion.h3>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              {Object.entries(project.stats).map(([key, value], idx) => (
                  <motion.div
                  key={key}
                  className="backdrop-blur-sm bg-black/60 rounded-xl p-3 border border-primary/20"
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold text-primary">{String(value)}</div>
                  <div className="text-xs text-muted-foreground uppercase font-medium">{key}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
            >
              <Button
                variant="outline"
                className="border-2 border-primary/50 hover:bg-primary/10 group/btn bg-black/60 backdrop-blur-sm shadow-lg"
              >
                Ko'proq bilish
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section id="loyihalar" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800" />

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          opacity: [0.5, 0.3, 0.5],
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
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Premium Loyihalar</span>
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
                Bizning Loyihalarimiz
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            Business Brothers And Partners LLC kompaniyasining muvaffaqiyatli amalga oshirilgan va davom etayotgan loyihalari
            </motion.p>
        </motion.div>
      </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
