"use client"

import { m } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ArrowUp, Heart, Sparkles } from "lucide-react"
import { useState } from "react"
import { useTranslations } from 'next-intl'

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const t = useTranslations('footer')
  const tCat = useTranslations('footer.categories')
  const tLinks = useTranslations('footer.links')

  const footerLinks = {
    [tCat('company')]: [tLinks('about'), tLinks('services'), tLinks('projects')],
    [tCat('support')]: [tLinks('helpCenter'), tLinks('contact')],
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <m.h3 
                className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {t('company')}
              </m.h3>
              <p className="text-gray-300 leading-relaxed max-w-md mb-6">
                {t('description')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm">businessbrotherspartners@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm">+998 93 398 50 50</span>
                </div>
              </div>
            </m.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <m.div
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
                {links.map((link, index) => {
                  // Link mapping for proper navigation
                  const linkMap: { [key: string]: string } = {
                    'Haqimizda': '#haqimizda', 
                    'Xizmatlar': '#xizmatlar',
                    'Loyihalar': '#loyihalar',
                    'Aloqa': '#aloqa',
                    'About': '#haqimizda',
                    'Services': '#xizmatlar', 
                    'Projects': '#loyihalar',
                    'Contact': '#aloqa',
                    'Help Center': '#aloqa'
                  }
                  
                  const href = linkMap[link] || '#'
                  
                  return (
                    <m.li key={index}>
                      <m.a
                        href={href}
                        className="text-gray-400 hover:text-primary transition-colors text-sm relative inline-block group"
                        onHoverStart={() => setHoveredLink(`${category}-${link}`)}
                        onHoverEnd={() => setHoveredLink(null)}
                        whileHover={{ x: 5 }}
                        onClick={(e) => {
                          if (href.startsWith('#')) {
                            e.preventDefault()
                            const targetId = href.replace('#', '')
                            const element = document.getElementById(targetId)
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' })
                            }
                          }
                        }}
                      >
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                      </m.a>
                    </m.li>
                  )
                })}
              </ul>
            </m.div>
          ))}
        </div>

        {/* Bottom Bar with Social Links */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-gray-400"
          >
            © 2025 {t('company')}. {t('rights')}.
            {/* CSS heart pulse */}
            <Heart className="w-4 h-4 text-primary fill-primary inline animate-pulse" />
          </m.div>

          {/* Social Links */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((social, index) => (
              <m.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
                aria-label={social.label}
              >
                <div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-primary/50 transition-all duration-300"
                >
                  <social.icon 
                    className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" 
                  />
                </div>
              </m.a>
            ))}
          </m.div>
        </div>

        {/* Premium Badge */}
        <m.div
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
        </m.div>
      </div>

      {/* Scroll to Top Button */}
      <m.button
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
      </m.button>
    </footer>
  )
}
