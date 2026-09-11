'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!
    const label = labelRef.current!

    // Only on pointer devices
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dot, { x: mouseX, y: mouseY })
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    // Hover states
    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => {
        const view = el.getAttribute('data-cursor')
        if (view) {
          label.textContent = view
          gsap.to(ring,  { scale: 2.5, opacity: 0.6, duration: 0.3, ease: 'expo.out' })
          gsap.to(label, { opacity: 1, duration: 0.2 })
        } else {
          gsap.to(ring,  { scale: 1.8, opacity: 0.5, duration: 0.3, ease: 'expo.out' })
        }
        gsap.to(dot, { scale: 0, duration: 0.2 })
      })
      el.addEventListener('mouseleave', () => {
        label.textContent = ''
        gsap.to(ring,  { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' })
        gsap.to(label, { opacity: 0, duration: 0.2 })
        gsap.to(dot, { scale: 1, duration: 0.3 })
      })
    }

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(addHover)

    // Observer for dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a:not([data-cursor-init]), button:not([data-cursor-init]), [data-cursor]:not([data-cursor-init])').forEach(el => {
        el.setAttribute('data-cursor-init', '')
        addHover(el)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="text-[8px] uppercase tracking-widest text-white opacity-0 select-none"
        />
      </div>
    </>
  )
}
