"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowUp, Heart, Sparkles } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const footerLinks = {
    Kompaniya: ["Biz haqimizda", "Xizmatlar", "Loyihalar", "Hamkorlar"],
    Xizmatlar: ["Qurilish", "Moliya", "Ta'lim", "Texnologiya"],
    "Qo'llab-quvvatlash": ["Yordam markazi", "FAQ", "Aloqa", "Vakansiyalar"],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "#1877F2" },
    { icon: Instagram, href: "#", label: "Instagram", color: "#E4405F" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0A66C2" },
    { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: Youtube, href: "#", label: "YouTube", color: "#FF0000" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-[#1a1f2e] border-t border-gray-700 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h3 
                className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-4 relative inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Business Brothers Partners
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.h3>
              <motion.p 
                className="text-muted-foreground leading-relaxed mb-6 max-w-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Biznesni yangi bosqichga olib chiqamiz. Ishonchli hamkorlaringiz muvaffaqiyat sari yo'lda.
              </motion.p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.05,
                      type: "spring",
                      bounce: 0.5
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
                    aria-label={social.label}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <social.icon className="w-5 h-5 text-primary relative z-10" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + columnIndex * 0.1 }}
            >
              <motion.h4 
                className="font-semibold mb-4 relative inline-block"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {title}
                <motion.div
                  className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + columnIndex * 0.1 }}
                />
              </motion.h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + columnIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <motion.a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                      onMouseEnter={() => setHoveredLink(link)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <motion.span
                        animate={{
                          opacity: hoveredLink === link ? 1 : 0,
                          x: hoveredLink === link ? 0 : -10,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-primary"
                      >
                        →
                      </motion.span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link}
                      </span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-sm text-muted-foreground flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © 2025 Business Brothers Partners. Barcha huquqlar himoyalangan.
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-4 h-4 text-primary fill-primary inline" />
              </motion.span>
            </motion.p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              {["Maxfiylik siyosati", "Foydalanish shartlari"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-primary transition-colors relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p 
              className="text-xs text-muted-foreground flex items-center justify-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span>Muhabbat bilan ishlab chiqildi</span>
              <Sparkles className="w-3 h-3 text-primary" />
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        whileHover={{ 
          scale: 1.1,
          y: -5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center group overflow-hidden"
        aria-label="Yuqoriga chiqish"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% auto",
          }}
        />
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="relative z-10"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </footer>
  )
}
