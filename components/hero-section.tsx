"use client"

import { m } from "framer-motion"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from 'next-intl'
import Image from "next/image"

const backgroundImages = [
  "/images/samarkand.jpg",
  "/images/samarkand2.jpg",
  "/images/iskandar-kambaraliyev-U6UuPXyyINo-unsplash.jpg",
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

  // Preload first image for better LCP
  useEffect(() => {
    if (backgroundImages[0]) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = backgroundImages[0]
      link.fetchPriority = 'high'
      document.head.appendChild(link)
    }
  }, [])

  // Optimized scroll-based transitions - Fast and smooth
  useEffect(() => {
    if (!isMounted) return

    let targetIndex = currentImageIndex
    let isAnimating = false
    let lastWheelTime = 0
    const WHEEL_THROTTLE = 300 // Reduced throttle for faster response
    const ANIMATION_DURATION = 400 // Much faster animation

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return
      
      const now = Date.now()
      if (now - lastWheelTime < WHEEL_THROTTLE && isAnimating) {
        e.preventDefault()
        return
      }
      lastWheelTime = now
      
      const rect = sectionRef.current.getBoundingClientRect()
      const isInHeroSection = rect.top <= 0 && rect.bottom >= window.innerHeight * 0.3
      
      if (isInHeroSection && scrollLocked) {
        // Birinchi rasmda yuqoriga scroll - allow normal scroll
        if (currentImageIndex === 0 && e.deltaY < 0) {
          return
        }
        
        // Agar animatsiya davomida bo'lsa - ignore
        if (isAnimating) {
          e.preventDefault()
          return
        }
        
        e.preventDefault()
        
        if (e.deltaY > 0) {
          // Pastga scroll - tez transition
          if (targetIndex < backgroundImages.length - 1) {
            targetIndex++
            isAnimating = true
            
            requestAnimationFrame(() => {
              setCurrentImageIndex(targetIndex)
              
              // Oxirgi rasmga yetganda - tez unlock
              if (targetIndex === backgroundImages.length - 1) {
                setTimeout(() => {
                  setScrollLocked(false)
                  // Auto scroll pastga
                  setTimeout(() => {
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: 'smooth'
                    })
                  }, 200)
                }, ANIMATION_DURATION)
              }
              
              setTimeout(() => {
                isAnimating = false
              }, ANIMATION_DURATION)
            })
          } else {
            // Oxirgi rasmda - unlock immediately
            setScrollLocked(false)
            isAnimating = false
          }
        } else if (e.deltaY < 0) {
          // Yuqoriga scroll
          if (targetIndex > 0) {
            targetIndex--
            isAnimating = true
            
            requestAnimationFrame(() => {
              setCurrentImageIndex(targetIndex)
              setTimeout(() => {
                isAnimating = false
              }, ANIMATION_DURATION)
            })
          } else {
            isAnimating = false
          }
        }
      }
    }

    // Section reset - throttled
    let scrollTimeout: NodeJS.Timeout | null = null
    const handleScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        if (!sectionRef.current) {
          scrollTimeout = null
          return
        }
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top >= 0) {
          setScrollLocked(true)
          setCurrentImageIndex(0)
          targetIndex = 0
          isAnimating = false
        }
        scrollTimeout = null
      }, 50)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [currentImageIndex, scrollLocked, isMounted])
  return (
    <section 
      ref={sectionRef}
      id="bosh"
      className="hero-section relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      style={{ minHeight: '100vh', height: 'auto' }}
    >
      {/* Full screen container */}
      <div className="relative h-full w-full overflow-hidden">
        
          {/* Background Images with Ultra Smooth Crossfade */}
          <div className="absolute inset-0">
            {backgroundImages.map((image, index) => (
              <m.div
                key={index}
                initial={{ opacity: index === 0 ? 1 : 0 }}
                animate={{ 
                  opacity: currentImageIndex === index ? 1 : 0,
                  scale: currentImageIndex === index ? 1 : 1.05,
                }}
                transition={{ 
                  opacity: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                  scale: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                }}
                style={{ willChange: 'opacity, transform' }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={`Uzbekistan Heritage ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={index === 0 ? 90 : 75}
                  sizes="100vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-blue-900/20" />
              </m.div>
            ))}
          </div>

        {/* Simple static gradient overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px]" />
        </div>


        {/* Content - Static (no hydration issues) */}
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto text-center w-full">
            
            {/* Company Badge */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40 mb-6 sm:mb-8 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-base font-bold text-white">
                {t('company')}
              </span>
            </m.div>

            {/* Title - Simplified */}
            <m.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight text-white"
            >
              {t('title')}
            </m.h1>

            {/* Subtitle */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2"
            >
              {t('subtitle')}
            </m.p>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 px-2"
            >
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 group w-full sm:w-auto"
                onClick={() => {
                  const element = document.getElementById('loyihalar')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('cta1')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="relative overflow-hidden border-2 border-white/40 hover:border-primary/60 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 group w-full sm:w-auto"
                onClick={() => {
                  const element = document.getElementById('aloqa')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {t('cta2')}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </m.div>
            
            {/* Stats */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
            >
              {[
                { value: "4+", label: t('stats.sectors') },
                { value: "24/7", label: t('stats.service') },
                { value: "100%", label: t('stats.halal') },
              ].map((stat, index) => (
                <m.div
                  key={index}
                  className="p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-primary/20 group"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "rgba(88, 101, 242, 0.4)",
                  }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 font-medium leading-tight">{stat.label}</div>
                </m.div>
              ))}
            </m.div>

              {/* Slide Indicators - Bottom */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex gap-2 justify-center backdrop-blur-xl bg-black/40 px-6 py-3 rounded-full border border-primary/30 shadow-xl w-fit mx-auto"
              >
                {backgroundImages.map((_, index) => (
                  <div key={index} className="relative">
                    <m.button
                      onClick={() => setCurrentImageIndex(index)}
                      animate={{
                        width: index === currentImageIndex ? 80 : 12,
                      }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                      className={`h-3 rounded-full transition-colors duration-300 ${
                        index === currentImageIndex
                          ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50"
                          : "bg-gray-600 hover:bg-primary/60"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                    {/* Active glow effect */}
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-md" />
                    )}
                  </div>
                ))}
              </m.div>

            {/* Scroll Indicator */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-12"
            >
              <div className="w-8 h-12 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 cursor-pointer hover:border-primary transition-colors mx-auto backdrop-blur-sm">
                <div className="w-2 h-2 bg-gradient-to-b from-primary to-accent rounded-full shadow-lg shadow-primary/50 animate-bounce" />
              </div>
            </m.div>

          </div>
        </div>
      </div>
    </section>
  )
}