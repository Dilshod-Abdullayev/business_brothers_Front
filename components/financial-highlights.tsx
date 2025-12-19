import { motion as m, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { Banknote, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react"
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

export default function FinancialHighlights() {
  const t = useTranslations('contact')
  const items = [
    {
      icon: Banknote,
      label: t('legal.capitalLabel'),
      value: t('legal.capital'),
      description: '',
      color: 'emerald',
      gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
      accentGradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
    },
    {
      icon: TrendingUp,
      label: t('legal.plannedLabel'),
      value: t('legal.planned'),
      description: '',
      color: 'violet',
      gradient: 'from-violet-400 via-purple-400 to-fuchsia-400',
      accentGradient: 'from-violet-500/30 via-purple-500/20 to-fuchsia-500/30',
    }
  ]

  const FloatingParticle = ({ delay = 0, color = 'emerald' }: { delay?: number, color?: string }) => (
    <m.div
      initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.6, 0.8, 0],
        y: [0, -120],
        x: [0, Math.random() * 40 - 20],
        scale: [0, 1, 0.8, 0],
        rotate: [0, 360]
      }}
      transition={{ 
        duration: 5, 
        delay, 
        repeat: 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`absolute text-${color}-400/60 select-none pointer-events-none font-bold text-xl`}
      style={{
        // Deterministic position based on delay to avoid SSR hydration mismatch
        left: `${(10 + (delay * 23) % 80).toFixed(2)}%`,
        bottom: '10%',
      }}
    >
      <Sparkles className="w-5 h-5" />
    </m.div>
  )

  const [hovered, setHovered] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Card component that tracks its own visibility
  const FinancialCard = ({ item, idx }: { item: typeof items[0]; idx: number }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 40, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: idx * 0.2, type: "spring", stiffness: 100 }}
        className="relative"
        onMouseEnter={() => setHovered(idx)}
        onMouseLeave={() => setHovered(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          })
        }}
      >
        {/* Glow effect */}
        <m.div className={`absolute -inset-1 bg-gradient-to-br ${item.accentGradient} rounded-3xl blur-2xl opacity-30`} />

        {/* Main card */}
        <div className="relative h-full rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 overflow-hidden">
          {/* Animated gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`} />

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <FloatingParticle key={i} delay={i * 0.8} color={item.color} />
            ))}
          </div>

          <div className="relative z-10 p-8 sm:p-10 pb-12 sm:pb-14 min-h-[260px] sm:min-h-[280px] flex flex-col">
            {/* Icon container with rotation effect */}
            <div className="mb-6 relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} p-[2px]`}>
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-gray-400 mb-2 tracking-wide uppercase">
              {item.label}
            </p>

            {/* Value with animated number */}
            <m.h3
              className={`text-4xl sm:text-5xl leading-[1.2] font-black mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring', 
                stiffness: 150, 
                damping: 12,
                delay: idx * 0.2 + 0.3
              }}
            >
              <ValueText value={item.value} isInView={isInView} />
            </m.h3>

            {/* Description with arrow */}
            <div className="flex items-center gap-2 text-gray-300">
              {item.description ? (
                <span className="text-sm font-medium">{item.description}</span>
              ) : null}
              <m.div
                animate={hovered === idx ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </m.div>
            </div>

            {/* Animated vertical bars */}
            <div className="absolute bottom-8 right-8 flex gap-1 items-end h-20">
              {[...Array(4)].map((_, i) => (
                <m.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${40 + i * 10}%` }}
                  transition={{ duration: 1 }}
                  className={`w-1.5 rounded-full bg-gradient-to-t ${item.gradient}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <m.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: idx * 0.2 + 0.5 }}
          />
        </div>
      </m.div>
    )
  }

  const AnimatedNumber = ({ value, isInView }: { value: string; isInView: boolean }) => {
    // Parse numeric value: extract number and handle multipliers
    const parseNumericValue = (str: string): { numericValue: number; hasMillion: boolean; baseNumber: number } => {
      const cleaned = str.toLowerCase().trim()
      const hasMillion = cleaned.includes('million') || cleaned.includes('млн')
      
      // Extract the first number (supports decimals like 1.5)
      const numberMatch = cleaned.match(/(\d+\.?\d*)/)
      if (!numberMatch) {
        return { numericValue: 0, hasMillion: false, baseNumber: 0 }
      }
      
      const baseNumber = parseFloat(numberMatch[1])
      
      // If it has "million", multiply by 1M
      // Otherwise, if it has commas (like "900,000"), extract full number
      let numericValue = baseNumber
      if (hasMillion) {
        numericValue = baseNumber * 1000000
      } else {
        // For numbers with commas, extract the full numeric value
        // Remove all non-digit characters to get the full number
        const fullNumberStr = str.replace(/[^\d]/g, '')
        if (fullNumberStr) {
          numericValue = parseFloat(fullNumberStr)
        }
      }
      
      return { numericValue, hasMillion, baseNumber }
    }

    // Extract formatting parts from original string
    const extractFormat = (str: string) => {
      // Check if currency is before or after number
      const currencyBefore = /^[$₸€¥£]+/.test(str.trim())
      const numberIndex = str.search(/\d/)
      
      if (numberIndex === -1) {
        return { currencyPrefix: '', currencySuffix: '', suffix: str }
      }
      
      const beforeNumber = str.substring(0, numberIndex).trim()
      const numberMatch = str.match(/(\d+\.?\d*)/)
      if (!numberMatch) {
        return { currencyPrefix: '', currencySuffix: '', suffix: '' }
      }
      
      const numberEnd = str.indexOf(numberMatch[0]) + numberMatch[0].length
      const afterNumber = str.substring(numberEnd).trim()
      
      // Extract currency symbols
      const prefixMatch = beforeNumber.match(/([$₸€¥£]+)$/)
      const suffixMatch = afterNumber.match(/^([$₸€¥£]+)/)
      
      const currencyPrefix = prefixMatch ? prefixMatch[1] : ''
      const currencySuffix = suffixMatch ? suffixMatch[1] : ''
      
      // Extract text suffix (everything after number and currency)
      let suffix = afterNumber
      if (currencySuffix) {
        suffix = afterNumber.substring(currencySuffix.length).trim()
      }
      
      return { currencyPrefix, currencySuffix, suffix }
    }

    const { numericValue, hasMillion, baseNumber } = parseNumericValue(value)
    const { currencyPrefix, currencySuffix, suffix } = extractFormat(value)
    const [displayValue, setDisplayValue] = useState(0)
    
    // Clean suffix to remove "million" if we're already adding it
    const cleanedSuffix = (() => {
      if (!suffix) return ''
      
      // If we're formatting as million, remove "million" from suffix to avoid duplication
      if (hasMillion) {
        const millionPatterns = [
          /\b(million|млн|миллион|مليون)\b/gi,
          /\b(million|млн|миллион|مليون)\s*\$/gi,
          /\$\s*(million|млн|миллион|مليون)\b/gi
        ]
        
        let cleaned = suffix
        millionPatterns.forEach(pattern => {
          cleaned = cleaned.replace(pattern, '').trim()
        })
        
        // Clean up any double spaces or leading/trailing separators
        cleaned = cleaned.replace(/\s+/g, ' ').trim()
        // Remove leading dashes/spaces if "million" was removed
        cleaned = cleaned.replace(/^[—\-\s]+/, '').trim()
        
        return cleaned
      }
      
      return suffix
    })()

    useEffect(() => {
      if (!isInView) {
        setDisplayValue(0)
        return
      }
      
      const controls = animate(0, numericValue, {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setDisplayValue(v)
      })
      
      return () => controls.stop()
    }, [numericValue, isInView])

    // Format the animated number preserving original structure
    const formatDisplayValue = (): string => {
      if (!isInView) {
        return '0'
      }
      
      let result = ''
      
      // Add currency prefix (before number)
      if (currencyPrefix) {
        result += currencyPrefix
      }
      
      // Format the number
      if (hasMillion) {
        const millions = displayValue / 1000000
        if (millions % 1 === 0) {
          result += Math.floor(millions).toString()
        } else {
          result += millions.toFixed(1)
        }
        result += ' million'
      } else {
        // Format with commas for thousands
        result += Math.floor(displayValue).toLocaleString('en-US')
      }
      
      // Add currency suffix (after number)
      if (currencySuffix) {
        result += ' ' + currencySuffix
      }
      
      return result
    }

    return (
      <span>
        {formatDisplayValue()}
        {cleanedSuffix && <span> {cleanedSuffix}</span>}
      </span>
    )
  }

  const ValueText = ({ value, isInView }: { value: string; isInView: boolean }) => {
    // Check if value contains numbers that can be animated
    const hasNumbers = /\d/.test(value)
    
    if (!hasNumbers) {
      return <span>{value}</span>
    }
    
    return <AnimatedNumber value={value} isInView={isInView} />
  }

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">{t('legal.title')}</span>
          </m.div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            {t('legal.title')}
          </h2>
        </m.div>

        {/* Connection beam */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px pointer-events-none">
          <m.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* moving dot removed for stability */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {items.map((item, idx) => (
            <FinancialCard key={item.label} item={item} idx={idx} />
          ))}
        </div>

        {/* Bottom accent text */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mt-16"
        >
       
        </m.div>
      </div>
    </section>
  )
}