"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Utensils, Package, Plane } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const businesses = [
  {
    icon: ShoppingCart,
    title: "Oziq-ovqat Savdosi",
    description: "Halal standartlarga muvofiq sifatli oziq-ovqat mahsulotlari",
    details:
      "Xalqaro standartlarga muvofiq halal oziq-ovqat mahsulotlarini import qilish, saqlash va tarqatish. Sifat nazorati va sertifikatlash xizmatlari.",
  },
  {
    icon: Utensils,
    title: "Restoran Biznesi",
    description: "Professional restoran xizmatlari va halal taomlar",
    details:
      "Zamonaviy restoranlar, halal taomlar, professional oshxona jihozlari va mijozlar uchun yuqori darajadagi xizmat ko'rsatish.",
  },
  {
    icon: Package,
    title: "Import Faoliyati",
    description: "Xalqaro bozordan sifatli mahsulotlarni import qilish",
    details: "Turli sohalar uchun mahsulotlarni import qilish, logistika xizmatlari, bojxona rasmiylashtirish va O'zbekiston bozoriga yetkazib berish.",
  },
  {
    icon: Plane,
    title: "Halal Turizm",
    description: "Halal standartlarga muvofiq turizm xizmatlari",
    details: "Halal turizm dasturlari, sayyohlar uchun maxsus xizmatlar, Umra va Haj safarlari, halal mehmonxonalar va restoranlar.",
  },
]

export function BusinessDirections() {
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null)

  return (
    <section id="xizmatlar" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6">
            Bizning Faoliyat Yo'nalishlari
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            O'zbekistonda dinamik rivojlanayotgan ko'p tarmoqli kompaniya sifatida 4 asosiy yo'nalishda professional xizmatlar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {businesses.map((business, index) => (
            <motion.div
              key={business.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedBusiness(selectedBusiness === index ? null : index)}
              className="cursor-pointer"
            >
              <Card className="h-full bg-card border-border hover:border-primary/50 transition-colors">
                <div className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <business.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {business.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{business.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                  >
                    {selectedBusiness === index ? "Yopish" : "Batafsil"}
                  </Button>

                  {selectedBusiness === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-border overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">{business.details}</p>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
