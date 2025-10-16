"use client"

import { m, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useTranslations } from 'next-intl'
import Image from "next/image"
import { Building2, Utensils, Package, Plane, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: 1,
    icon: Building2,
    title: "construction.title",
    description: "construction.description",
    image: "/modern-residential-complex-architecture.jpg",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    icon: Utensils,
    title: "restaurant.title",
    description: "restaurant.description",
    image: "/modern-business-training-center.jpg",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 3,
    icon: Package,
    title: "food.title",
    description: "food.description",
    image: "/smart-city-technology-dashboard.jpg",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    icon: Plane,
    title: "import.title",
    description: "import.description",
    image: "/international-trade-logistics-center.jpg",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
]

export function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('services')

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  // Calculate horizontal movement based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <div className="absolute top-20 left-0 right-0 z-20 text-center px-4">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Bizning xizmatlar</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] text-white mb-4">
              Xizmatlarimiz
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium sifat va professional yondashuv
            </p>
          </m.div>
        </div>

        {/* Horizontal Scroll Container */}
        <m.div
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 flex gap-8 px-8 h-[500px]"
        >
          {services.map((service, index) => (
            <m.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative w-[500px] h-full flex-shrink-0 group"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              {/* Card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#12121a] border border-border hover:border-primary/50 transition-all duration-500 shadow-2xl">
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={t(service.title)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="500px"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8 z-10">
                  {/* Icon */}
                  <m.div
                    className="inline-flex w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-8 h-8 text-primary" />
                  </m.div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    {t(service.title)}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {t(service.description)}
                  </p>

                  {/* Button */}
                  <m.div whileHover={{ x: 5 }}>
                    <Button
                      variant="outline"
                      className="border-2 border-primary/50 hover:bg-primary/10 group/btn bg-black/60 backdrop-blur-sm"
                    >
                      Batafsil
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </m.div>
                </div>

                {/* Shine Effect */}
                <m.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </m.div>
          ))}
        </m.div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 right-8 z-20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll for more</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

