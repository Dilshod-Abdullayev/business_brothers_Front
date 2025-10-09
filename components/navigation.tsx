"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setActiveSection, setScrolled, toggleMobileMenu, setMobileMenuOpen } from '@/store/slices/navigationSlice'
import { openModal } from '@/store/slices/modalSlice'

export function Navigation() {
  const dispatch = useAppDispatch()
  const navigation = useAppSelector((state) => state.navigation)
  const activeSection = navigation?.activeSection || 'bosh'
  const isScrolled = navigation?.isScrolled || false
  const isMobileMenuOpen = navigation?.isMobileMenuOpen || false
  const t = useTranslations('navigation')
  const locale = useLocale()

  const { scrollY } = useScroll()
  const navBackdropBlur = useTransform(scrollY, [0, 100], [0, 24])
  const navOpacity = useTransform(scrollY, [0, 100], [0, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrolled(window.scrollY > 50))

      // Update active section based on scroll position
      const sections = ["bosh", "haqimizda", "xizmatlar", "loyihalar", "hamkorlar", "aloqa"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            dispatch(setActiveSection(section))
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [dispatch])

  const navLinks = [
    { href: "#bosh", label: t('home'), section: 'bosh' },
    { href: "#haqimizda", label: t('about'), section: 'haqimizda' },
    { href: "#xizmatlar", label: t('services'), section: 'xizmatlar' },
    { href: "#loyihalar", label: t('projects'), section: 'loyihalar' },
    { href: "#hamkorlar", label: t('partners'), section: 'hamkorlar' },
    { href: "#aloqa", label: t('contact'), section: 'aloqa' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl shadow-primary/5" : "bg-transparent"
        }`}
      >
        {/* Animated Border Bottom */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#bosh"
              className="text-2xl font-bold font-[family-name:var(--font-poppins)] tracking-tight relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Business Brothers
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative"
                >
                  <motion.a
                    href={link.href}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors relative z-10 ${
                      activeSection === link.section
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(setActiveSection(link.section))}
                  >
                    {link.label}
                    {activeSection === link.section && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.a>
                </motion.div>
              ))}
              
              <LanguageSwitcher />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => dispatch(openModal({ type: 'contact' }))}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 group relative overflow-hidden ml-2"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">Biz bilan bog'laning</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-foreground relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
              onClick={() => dispatch(toggleMobileMenu())}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => dispatch(setMobileMenuOpen(false))}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-20 right-0 bottom-0 w-80 max-w-[85vw] bg-card border-l border-border z-50 lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    exit={{ opacity: 0, x: 50 }}
                    className={`block text-sm font-medium px-4 py-3 rounded-lg transition-all ${
                      activeSection === link.section
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                    }`}
                    onClick={() => {
                      dispatch(setActiveSection(link.section))
                      dispatch(setMobileMenuOpen(false))
                    }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="pt-4"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full shadow-lg shadow-primary/30 group relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">Biz bilan bog'laning</span>
                  </Button>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
