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
    // A single ResizeObserver-triggered refresh is a synchronous full-page
    // reflow. Content that resizes in bursts (the wedibox iframe growing as
    // its gallery images load, `dvh` units recalculating as the mobile
    // address bar collapses mid-scroll) was firing that reflow on nearly
    // every tick of the burst — often while the user was actively
    // scrolling — which is what caused the stutter. Debouncing on a real
    // timer (not just the next animation frame) collapses a whole burst
    // into a single refresh once things settle.
    //
    // But a pure debounce can starve entirely during a *sustained* burst
    // (e.g. gallery images arriving faster than the debounce window), which
    // leaves trigger positions stale for as long as the burst runs. That's
    // most visible on the footer, whose threshold-0 trigger fires right at
    // the bottom edge of the viewport and so has zero tolerance for a stale
    // position — it pops in late instead of fading in smoothly. A max-wait
    // guarantees a refresh at least every MAX_WAIT ms even mid-burst.
    const DEBOUNCE = 200
    const MAX_WAIT = 500
    let timeout: ReturnType<typeof setTimeout>
    let lastRun = 0
    const runRefresh = () => {
      lastRun = Date.now()
      ScrollTrigger.refresh()
    }
    const refresh = () => {
      clearTimeout(timeout)
      if (Date.now() - lastRun >= MAX_WAIT) {
        runRefresh()
      } else {
        timeout = setTimeout(runRefresh, DEBOUNCE)
      }
    }

    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh)

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('load', refresh)
      resizeObserver.disconnect()
      clearTimeout(timeout)
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