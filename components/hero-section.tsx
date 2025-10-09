"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Play, TrendingUp, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from 'next-intl'
import Image from "next/image"

const backgroundImages = [
  "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_640.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSltM5IaC7GLv6eInS2XZs7jRh7B_NtaOstKzwGLKgVTCuUCsJ11OEo9gGUVGtCJZD1cTM&usqp=CAU",
  "https://thumbs.dreamstime.com/b/typical-bavarian-foothills-alps-291223936.jpg",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
]

const floatingIcons = [
  { Icon: TrendingUp, delay: 0, x: "10%", y: "20%" },
  { Icon: Award, delay: 0.2, x: "85%", y: "30%" },
  { Icon: Globe, delay: 0.4, x: "15%", y: "70%" },
  { Icon: Sparkles, delay: 0.6, x: "90%", y: "75%" },
]

export function HeroSection() {
  const t = useTranslations('hero')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollLocked, setScrollLocked] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Fix hydration error
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Premium Apple-style scroll: smooth and controlled
  useEffect(() => {
    if (!isMounted) return

    let isTransitioning = false
    let lastScrollTime = 0
    let transitionTimeout: NodeJS.Timeout
    const SCROLL_THRESHOLD = 30 // Minimal scroll amount
    const TRANSITION_DURATION = 900 // Transition cooldown
    const DEBOUNCE_TIME = 150 // Min time between scrolls

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const isInHeroSection = rect.top <= 100 && rect.bottom > window.innerHeight * 0.3
      
      if (!isInHeroSection) return
      
      const now = Date.now()
      
      // Birinchi rasmda yuqoriga scroll - normal scroll
      if (currentImageIndex === 0 && e.deltaY < 0) {
        return
      }
      
      // Oxirgi rasmda pastga scroll - unlock
      if (currentImageIndex === backgroundImages.length - 1 && e.deltaY > 0) {
        if (!scrollLocked) return
        setScrollLocked(false)
        return
      }
      
      // MUHIM: Scroll'ni to'liq block qilamiz
      e.preventDefault()
      e.stopPropagation()
      
      // Agar transition davomida yoki juda tez scroll bo'lsa - ignore
      if (isTransitioning || now - lastScrollTime < DEBOUNCE_TIME) {
        return
      }
      
      // Threshold check
      if (Math.abs(e.deltaY) >= SCROLL_THRESHOLD) {
        lastScrollTime = now
        isTransitioning = true
        
        if (e.deltaY > 0 && currentImageIndex < backgroundImages.length - 1) {
          // Pastga - keyingi rasm
          setCurrentImageIndex(prev => prev + 1)
        } else if (e.deltaY < 0 && currentImageIndex > 0) {
          // Yuqoriga - oldingi rasm
          setCurrentImageIndex(prev => prev - 1)
        } else {
          isTransitioning = false
          return
        }
        
        // Transition cooldown - animatsiya tugaguncha
        clearTimeout(transitionTimeout)
        transitionTimeout = setTimeout(() => {
          isTransitioning = false
        }, TRANSITION_DURATION)
      }
    }

    // Section reset
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      
      if (rect.top >= -50 && rect.top <= 50) {
        setScrollLocked(true)
        setCurrentImageIndex(0)
        isTransitioning = false
        lastScrollTime = 0
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(transitionTimeout)
    }
  }, [currentImageIndex, scrollLocked, isMounted])
  return (
    <section 
      ref={sectionRef}
      id="bosh"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Full screen container */}
      <div className="relative h-screen w-full overflow-hidden">
        
        {/* Background Images with Premium Animated Crossfade */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1.05 : 1,
                filter: currentImageIndex === index ? "blur(0px)" : "blur(8px)"
              }}
              transition={{ 
                opacity: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
                scale: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
                filter: { duration: 0.5, ease: "easeOut" }
              }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={`Business slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              {/* Animated overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                transition={{ duration: 1 }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Animated gradient orbs - Reactive to Image Change */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
              backgroundColor: currentImageIndex % 2 === 0 
                ? "rgba(88, 101, 242, 0.1)" 
                : "rgba(251, 191, 36, 0.1)"
            }}
            transition={{
              x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: { duration: 1.2, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
            animate={{
              x: [0, -40, 0],
              y: [0, -30, 0],
              scale: [1.1, 1, 1.1],
              backgroundColor: currentImageIndex % 2 === 1 
                ? "rgba(88, 101, 242, 0.1)" 
                : "rgba(251, 191, 36, 0.1)"
            }}
            transition={{
              x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: { duration: 1.2, ease: "easeInOut" }
            }}
          />
        </div>

        {/* Floating Icons - Client-side only */}
        {isMounted && floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute z-10 hidden lg:block"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1],
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div 
              animate={{
                boxShadow: currentImageIndex % 2 === index % 2 
                  ? "0 25px 50px -12px rgba(88, 101, 242, 0.5)"
                  : "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
              }}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 rounded-3xl bg-primary/10 backdrop-blur-md border border-primary/30 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: currentImageIndex * 90 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <Icon className="w-10 h-10 text-primary" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}

          {/* Image Progress Indicators - Side - Animated */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
            {backgroundImages.map((_, index) => (
              <div key={index} className="relative">
                <motion.button
                  onClick={() => setCurrentImageIndex(index)}
                  animate={{
                    width: index === currentImageIndex ? 12 : 8,
                    height: 48,
                    backgroundColor: index === currentImageIndex ? "#5865f2" : "#6b7280"
                  }}
                  transition={{ 
                    width: { duration: 0.4, ease: "easeInOut" },
                    backgroundColor: { duration: 0.3 }
                  }}
                  className={`rounded-full transition-all duration-500 ${
                    index === currentImageIndex
                      ? "shadow-lg shadow-primary/50"
                      : "hover:bg-primary/60"
                  }`}
                  whileHover={{ scale: 1.2, width: 12 }}
                  whileTap={{ scale: 0.9 }}
                />
                {/* Active indicator glow */}
                {index === currentImageIndex && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/40 rounded-full blur-lg"
                  />
                )}
              </div>
            ))}
            
          </div>

        {/* Content - Static (no hydration issues) */}
        <div className="relative h-full flex items-center justify-center px-4 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Company Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40 mb-8 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-base font-bold text-white">
                {t('company')}
              </span>
            </motion.div>

            {/* Title - Simplified */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white"
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-primary/30 group"
                >
                  <span className="flex items-center gap-2">
                    {t('cta1')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-6 text-lg font-semibold rounded-xl backdrop-blur-sm group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t('cta2')}
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-10"
            >
              {[
                { value: "4+", label: t('stats.sectors') },
                { value: "24/7", label: t('stats.service') },
                { value: "100%", label: t('stats.halal') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-primary/20 group"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(88, 101, 242, 0.4)",
                  }}
                >
                  <div className="text-4xl font-black text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

              {/* Slide Indicators - Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex gap-2 justify-center backdrop-blur-xl bg-black/40 px-6 py-3 rounded-full border border-primary/30 shadow-xl w-fit mx-auto"
              >
                {backgroundImages.map((_, index) => (
                  <div key={index} className="relative">
                    <motion.button
                      onClick={() => setCurrentImageIndex(index)}
                      animate={{
                        width: index === currentImageIndex ? 80 : 12,
                        backgroundColor: index === currentImageIndex 
                          ? "linear-gradient(to right, #5865f2, #fbbf24)"
                          : "#4b5563"
                      }}
                      transition={{ 
                        width: { duration: 0.5, ease: "easeInOut" },
                        backgroundColor: { duration: 0.3 }
                      }}
                      className={`h-3 rounded-full ${
                        index === currentImageIndex
                          ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50"
                          : "bg-gray-600 hover:bg-primary/60"
                      }`}
                      whileHover={{ scale: 1.3, width: index === currentImageIndex ? 80 : 48 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                    {/* Active glow effect */}
                    {index === currentImageIndex && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/30 rounded-full blur-md"
                      />
                    )}
                  </div>
                ))}
              </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-12 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 cursor-pointer hover:border-primary transition-colors mx-auto backdrop-blur-sm"
              >
                <motion.div
                  animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-gradient-to-b from-primary to-accent rounded-full shadow-lg shadow-primary/50"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}