"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.2,
        anchors: true,
        smoothWheel: true,
        syncTouch: false,
        naiveDimensions: true,
        stopInertiaOnNavigate: true,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  )
}