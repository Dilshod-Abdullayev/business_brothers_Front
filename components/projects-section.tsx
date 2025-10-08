"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Halal Oziq-ovqat Markazi",
    category: "Oziq-ovqat Savdosi",
    image: "/modern-business-training-center.jpg",
    stats: { products: "500+", partners: "50+", status: "Faol" },
  },
  {
    title: "Premium Restoranlar Tarmog'i",
    category: "Restoran Biznesi",
    image: "/modern-residential-complex-architecture.jpg",
    stats: { branches: "10+", customers: "50,000+", status: "Kengaymoqda" },
  },
  {
    title: "Xalqaro Import Terminali",
    category: "Import Faoliyati",
    image: "/international-trade-logistics-center.jpg",
    stats: { countries: "20+", products: "1000+", status: "Faol" },
  },
  {
    title: "Halal Turizm Agentligi",
    category: "Halal Turizm",
    image: "/smart-city-technology-dashboard.jpg",
    stats: { tours: "50+", travelers: "5,000+", status: "Rivojlanmoqda" },
  },
]

export function ProjectsSection() {
  return (
    <section id="loyihalar" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6">Bizning Loyihalarimiz</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Business Brothers And Partners LLC kompaniyasining muvaffaqiyatli amalga oshirilgan va davom etayotgan loyihalari
          </p>
        </motion.div>
      </div>

      {/* Grid Layout instead of Horizontal Scroll */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer will-change-transform"
            >
              <div className="relative overflow-hidden rounded-3xl bg-card border border-border h-[500px] shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <span className="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-4">
                    {project.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-2xl font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground uppercase">{key}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="border-primary/50 hover:bg-primary/10 group/btn bg-transparent">
                    Ko'proq bilish
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
