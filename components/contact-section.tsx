"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Check, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    details: ["+998 71 123 45 67", "+998 90 123 45 67"],
    delay: 0,
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@businessbrothers.uz", "contact@businessbrothers.uz"],
    delay: 0.1,
  },
  {
    icon: MapPin,
    title: "Manzil",
    details: ["Toshkent shahri, Yunusobod tumani,", "Amir Temur ko'chasi, 107A"],
    delay: 0.2,
  },
]

const stats = [
  { icon: MessageCircle, value: "1000+", label: "Mijozlar" },
  { icon: Check, value: "98%", label: "Mamnunlik" },
  { icon: Clock, value: "24/7", label: "Qo'llab-quvvatlash" },
]

export function ContactSection() {
  return (
    <section id="aloqa" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Biz bilan bog'laning</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-poppins)] mb-6">
            Bog'lanish
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Hamkorlikni boshlaylik. Biz bilan bog'laning va loyihangizni muhokama qiling
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-border rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.h3 
                className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Aloqa ma'lumotlari
              </motion.h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4 group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-2">{info.title}</div>
                      {info.details.map((detail, i) => (
                        <div key={i} className="text-muted-foreground">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 rounded-2xl overflow-hidden border border-border group">
              <img 
                src="/tashkent-city-map.jpg" 
                alt="Toshkent xaritasi" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Ismingiz</label>
                <Input 
                  id="name"
                  type="text"
                  placeholder="Ismingizni kiriting"
                  className="bg-card border-border"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefon raqam</label>
                <Input 
                  id="phone"
                  type="tel"
                  placeholder="+998 __ ___ __ __"
                  className="bg-card border-border"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="bg-card border-border"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Xabar</label>
                <Textarea
                  id="message"
                  placeholder="Xabaringizni yozing..."
                  rows={5}
                  className="bg-card border-border resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 group"
              >
                Xabar yuborish
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
