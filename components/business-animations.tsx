"use client"

import { motion } from "framer-motion"

export function FloatingBusinessIcons() {
  const icons = [
    { icon: "💼", delay: 0, x: "10%", y: "15%" },
    { icon: "📊", delay: 0.5, x: "85%", y: "20%" },
    { icon: "💰", delay: 1, x: "15%", y: "60%" },
    { icon: "🏢", delay: 1.5, x: "80%", y: "70%" },
    { icon: "📈", delay: 2, x: "50%", y: "30%" },
    { icon: "🤝", delay: 2.5, x: "70%", y: "50%" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0, 1.2, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}

export function NetworkAnimation() {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dotGradient">
          <stop offset="0%" stopColor="#5865f2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5865f2" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Connection Lines */}
      {dots.map((dot1, i) =>
        dots.slice(i + 1, i + 4).map((dot2, j) => (
          <motion.line
            key={`line-${i}-${j}`}
            x1={`${dot1.x}%`}
            y1={`${dot1.y}%`}
            x2={`${dot2.x}%`}
            y2={`${dot2.y}%`}
            stroke="#5865f2"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))
      )}
      
      {/* Animated Dots */}
      {dots.map((dot, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={`${dot.x}%`}
          cy={`${dot.y}%`}
          r="4"
          fill="url(#dotGradient)"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  )
}

export function DataFlowAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            width: "100%",
            top: `${20 + i * 15}%`,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3 + i,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function BusinessGraphAnimation() {
  return (
    <svg className="absolute right-10 top-1/4 w-64 h-64 opacity-30" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5865f2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5865f2" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Animated Graph Line */}
      <motion.path
        d="M 20,150 L 50,120 L 80,130 L 110,80 L 140,90 L 170,40"
        stroke="#5865f2"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      
      {/* Data Points */}
      {[20, 50, 80, 110, 140, 170].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={150 - i * 15 - (i % 2) * 10}
          r="5"
          fill="#5865f2"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{
            duration: 0.5,
            delay: i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
        />
      ))}
      
      {/* Grid Lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="10"
          y1={40 + i * 30}
          x2="190"
          y2={40 + i * 30}
          stroke="#5865f2"
          strokeWidth="1"
          opacity="0.2"
        />
      ))}
    </svg>
  )
}

