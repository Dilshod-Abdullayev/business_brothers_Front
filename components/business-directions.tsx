"use client"

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { ShoppingCart, Utensils, Package, Plane, ArrowUpRight, Sparkles } from "lucide-react"
import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'
import Image from "next/image"
import { NetworkAnimation } from "./business-animations"

const businesses = [
  {
    icon: ShoppingCart,
    title: "food.title",
    description: "food.description",
    details: "food.details",
    image: "/placeholder.jpg",
    gradient: "from-emerald-500/20 to-green-600/20",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Utensils,
    title: "restaurant.title",
    description: "restaurant.description",
    details: "restaurant.details",
    image: "/modern-business-training-center.jpg",
    gradient: "from-orange-500/20 to-red-600/20",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Package,
    title: "import.title",
    description: "import.description",
    details: "import.details",
    image: "/international-trade-logistics-center.jpg",
    gradient: "from-blue-500/20 to-indigo-600/20",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Plane,
    title: "tourism.title",
    description: "tourism.description",
    details: "tourism.details",
    image: "/tashkent-city-map.jpg",
    gradient: "from-purple-500/20 to-pink-600/20",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

function BusinessCard({ business, index, isSelected, onToggle }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const t = useTranslations('services')
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

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
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <Card className="h-full bg-[#1f2937] border-gray-700 hover:border-primary/50 transition-all duration-500 overflow-hidden">
        {/* Image Background */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={business.image}
              alt={t(business.title)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${business.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          </motion.div>
          
          {/* Floating Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            className="absolute top-6 left-6 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`w-16 h-16 rounded-2xl ${business.bgColor} backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl`}
            >
              <business.icon className={`w-8 h-8 ${business.iconColor}`} />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="absolute top-6 right-6 z-10"
          >
            <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-primary/20 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">Premium</span>
            </div>
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-[5]"
          />
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <motion.h3
            className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors"
            whileHover={{ x: 5 }}
          >
            {t(business.title)}
          </motion.h3>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {t(business.description)}
          </p>

          {/* Expandable Details */}
          <motion.div
            initial={false}
            animate={{ height: isSelected ? "auto" : 0, opacity: isSelected ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border mb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(business.details)}
              </p>
            </div>
          </motion.div>

          {/* Action Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="group/btn text-primary hover:text-primary/80 p-0 h-auto font-medium flex items-center gap-2"
          >
            <span>{isSelected ? t('close') : t('learnMore')}</span>
            <motion.div
              animate={{ rotate: isSelected ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </motion.div>
          </Button>
        </div>

        {/* Hover Effect Border */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(var(--primary-rgb), 0.3), transparent)",
            transform: "translateY(-100%)",
          }}
          animate={{
            transform: isHovered ? "translateY(100%)" : "translateY(-100%)",
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </Card>
    </motion.div>
  )
}

export function BusinessDirections() {
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null)
  const t = useTranslations('services')
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} id="xizmatlar" className="relative py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Business Network Animation */}
      <NetworkAnimation />
      
      {/* CSS Animated Background Orbs - GPU optimized */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-40" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed opacity-40" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">{t('badge')}</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('title')}
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {businesses.map((business, index) => (
            <BusinessCard
              key={business.title}
              business={business}
              index={index}
              isSelected={selectedBusiness === index}
              onToggle={() => setSelectedBusiness(selectedBusiness === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
