"use client"

import { memo } from "react"

// Optimized - CSS only, no JS animations
export const FloatingBusinessIcons = memo(function FloatingBusinessIcons() {
  const icons = [
    { icon: "💼", className: "animate-float", x: "10%", y: "15%" },
    { icon: "📊", className: "animate-float-delayed", x: "85%", y: "20%" },
    { icon: "💰", className: "animate-float", x: "15%", y: "60%" },
    { icon: "🏢", className: "animate-float-delayed", x: "80%", y: "70%" },
    { icon: "📈", className: "animate-float", x: "50%", y: "30%" },
    { icon: "🤝", className: "animate-float-delayed", x: "70%", y: "50%" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {icons.map((item, index) => (
        <div
          key={index}
          className={`absolute text-3xl ${item.className}`}
          style={{ 
            left: item.x, 
            top: item.y,
            animationDelay: `${index * 0.5}s`,
            willChange: 'transform'
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  )
})

// Simplified network - static SVG for better performance
export const NetworkAnimation = memo(function NetworkAnimation() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dotGradient">
          <stop offset="0%" stopColor="#5865f2" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5865f2" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Static network pattern - no animation for performance */}
      <circle cx="10%" cy="15%" r="3" fill="url(#dotGradient)" />
      <circle cx="30%" cy="25%" r="3" fill="url(#dotGradient)" />
      <circle cx="50%" cy="35%" r="3" fill="url(#dotGradient)" />
      <circle cx="70%" cy="20%" r="3" fill="url(#dotGradient)" />
      <circle cx="85%" cy="45%" r="3" fill="url(#dotGradient)" />
      <circle cx="60%" cy="60%" r="3" fill="url(#dotGradient)" />
      <circle cx="40%" cy="70%" r="3" fill="url(#dotGradient)" />
      <circle cx="20%" cy="80%" r="3" fill="url(#dotGradient)" />
      
      <line x1="10%" y1="15%" x2="30%" y2="25%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
      <line x1="30%" y1="25%" x2="50%" y2="35%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
      <line x1="50%" y1="35%" x2="70%" y2="20%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
      <line x1="70%" y1="20%" x2="85%" y2="45%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
      <line x1="50%" y1="35%" x2="60%" y2="60%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
      <line x1="60%" y1="60%" x2="40%" y2="70%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
      <line x1="40%" y1="70%" x2="20%" y2="80%" stroke="#5865f2" strokeWidth="1" opacity="0.3" />
    </svg>
  )
})

// Simplified graph - CSS animated, lightweight
export const BusinessGraphAnimation = memo(function BusinessGraphAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5865f2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5865f2" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        <path
          d="M 0 350 L 100 300 L 200 320 L 300 250 L 400 280 L 500 180 L 600 200 L 700 100 L 800 150"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          className="animate-pulse"
        />
        
        {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={[300, 320, 250, 280, 180, 200, 100][i]}
            r="5"
            fill="#5865f2"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  )
})

// Minimal particle field - CSS only
export const ParticleField = memo(function ParticleField() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: i * 0.3,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  )
})

// Data flow animation - simplified
export const DataFlowAnimation = memo(function DataFlowAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5865f2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Data flow lines */}
        <path
          d="M 50 100 Q 250 50, 500 100 T 950 100"
          stroke="url(#dataGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
          className="animate-pulse"
        />
        <path
          d="M 50 200 Q 300 150, 500 200 T 950 200"
          stroke="url(#dataGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <path
          d="M 50 300 Q 250 350, 500 300 T 950 300"
          stroke="url(#dataGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Data points */}
        {[100, 300, 500, 700, 900].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={100 + (i * 50)}
            r="4"
            fill="#5865f2"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  )
})
