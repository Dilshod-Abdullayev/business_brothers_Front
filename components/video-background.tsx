"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface VideoBackgroundProps {
  videoSrc?: string
  fallbackImage?: string
  overlay?: boolean
  className?: string
}

export function VideoBackground({ 
  videoSrc = "https://cdn.coverr.co/videos/coverr-modern-office-workspace-4389/1080p.mp4",
  fallbackImage,
  overlay = true,
  className = ""
}: VideoBackgroundProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        poster={fallbackImage}
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback to image if video doesn't load */}
        {fallbackImage && (
          <img 
            src={fallbackImage} 
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </video>
      
      {/* Premium Dark Overlay */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </>
      )}
      
      {/* Static Grid Pattern - no animation for performance */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235865f2' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

