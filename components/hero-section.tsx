"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

const backgroundImages = [
  "/modern-residential-complex-architecture.jpg",
  "/smart-city-technology-dashboard.jpg",
  "/modern-business-training-center.jpg",
  "/international-trade-logistics-center.jpg",
]

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Simplified scroll effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Auto-change background images - slower for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="bosh" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Background Images - Premium Crossfade */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/50 to-primary/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Simple overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/30 rounded-full blur-2xl" />
      </div>

      {/* Slide indicators - Premium Style */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2 backdrop-blur-md bg-background/20 px-4 py-3 rounded-full border border-primary/20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentImageIndex
                ? "bg-primary w-16 shadow-lg shadow-primary/50"
                : "bg-muted-foreground/40 w-2 hover:bg-primary/60 hover:w-8"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div style={{ opacity }} className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-10"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-base font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Business Brothers And Partners LLC
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-poppins)] mb-8 leading-tight"
          >
            <span className="block mb-2">O'zbekistonda</span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Ko'p Tarmoqli
            </span>
            <span className="block">Kompaniya</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            <span className="font-semibold text-primary">Dinamik rivojlanayotgan</span> kompaniya.
            <br className="hidden md:block" />
            Oziq-ovqat savdosi, restoran biznesi, import va halal turizm sohalarida faoliyat yuritamiz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Loyihalarni Ko'rish
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Biz Bilan Bog'lanish
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-16"
          >
            {[
              { value: "4+", label: "Asosiy soha" },
              { value: "24/7", label: "Professional xizmat" },
              { value: "100%", label: "Halal standart" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
