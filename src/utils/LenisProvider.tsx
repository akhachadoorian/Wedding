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
      ScrollTrigger.update()
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => gsap.ticker.remove(update)
  }, [])

  // ScrollTrigger caches each trigger's position at creation time. Content
  // below the fold (images, fonts, the fit-to-width headlines) keeps
  // resizing after that, which silently stales those positions and can
  // leave elements — most visibly the footer, since it sits after
  // everything else on the page — stuck at their pre-animation opacity.
  // Re-measuring whenever layout actually changes keeps triggers accurate.
  useEffect(() => {
    let raf = 0
    const refresh = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh)

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('load', refresh)
      resizeObserver.disconnect()
      cancelAnimationFrame(raf)
    }
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