"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowUp, Heart, Sparkles } from "lucide-react"
import { useState } from "react"
import { useTranslations } from 'next-intl'

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const t = useTranslations('footer')
  const tCat = useTranslations('footer.categories')
  const tLinks = useTranslations('footer.links')

  const footerLinks = {
    [tCat('company')]: [tLinks('about'), tLinks('services'), tLinks('projects'), tLinks('partners')],
    [tCat('services')]: [tLinks('construction'), tLinks('finance'), tLinks('education'), tLinks('technology')],
    [tCat('support')]: [tLinks('helpCenter'), tLinks('faq'), tLinks('contact'), tLinks('careers')],
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
      {/* CSS Animated Background - GPU optimized */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {t('company')}
              </motion.h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                {t('description')}
              </p>
              
              {/* Newsletter */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-primary">{t('newsletter')}</p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-primary/50"
                  >
                    {t('subscribe')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <motion.li key={index}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors text-sm relative inline-block group"
                      onHoverStart={() => setHoveredLink(`${category}-${link}`)}
                      onHoverEnd={() => setHoveredLink(null)}
                      whileHover={{ x: 5 }}
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 py-8 border-t border-gray-700"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="group relative"
              aria-label={social.label}
            >
              <div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-primary/50 transition-all duration-300"
                style={{
                  boxShadow: `0 0 20px ${social.color}20`,
                }}
              >
                <social.icon 
                  className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" 
                />
                {/* CSS sparkle - no JS infinity */}
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            © 2025 {t('company')}. {t('rights')}.
            {/* CSS heart pulse */}
            <Heart className="w-4 h-4 text-primary fill-primary inline animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">
              {tLinks('privacy')}
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">
              {tLinks('terms')}
            </a>
          </motion.div>
        </div>

        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2 opacity-60">
            <Sparkles className="w-3 h-3 text-primary" />
            {t('tagline')}
            <Sparkles className="w-3 h-3 text-primary" />
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50 border border-primary/20 backdrop-blur-sm group"
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-20 animate-shimmer-slow" />
        <ArrowUp className="w-6 h-6 text-white relative z-10" />
      </motion.button>
    </footer>
  )
}
