'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef   = useRef<HTMLDivElement>(null)
  const blRef       = useRef<HTMLSpanElement>(null)
  const dotRef      = useRef<HTMLSpanElement>(null)
  const coRef       = useRef<HTMLSpanElement>(null)
  const line1Ref    = useRef<HTMLDivElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(false)
      onComplete()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false)
        onComplete()
      }
    })

    // Initial state
    gsap.set([blRef.current, dotRef.current, coRef.current], { opacity: 0 })
    gsap.set([line1Ref.current, line2Ref.current], {
      scaleX: 0, opacity: 0, transformOrigin: 'center center'
    })

    tl
      // BL appears
      .to(blRef.current, {
        opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2
      })
      // dot appears
      .to(dotRef.current, {
        opacity: 1, duration: 0.3, ease: 'power2.out'
      }, '-=0.1')
      // co slides in
      .fromTo(coRef.current,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out' },
        '-=0.1'
      )
      // subtle lines extend
      .to([line1Ref.current, line2Ref.current], {
        scaleX: 1, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.05
      }, '-=0.1')
      // hold
      .to({}, { duration: 0.5 })
      // everything collapses and fades
      .to([blRef.current, dotRef.current, coRef.current], {
        opacity: 0, y: -6, duration: 0.4, ease: 'power2.in', stagger: 0.03
      })
      .to([line1Ref.current, line2Ref.current], {
        scaleX: 0, opacity: 0, duration: 0.3, ease: 'power2.in'
      }, '-=0.3')
      // loader panel lifts away
      .to(loaderRef.current, {
        yPercent: -100, duration: 0.8, ease: 'expo.inOut'
      }, '-=0.1')
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9000] bg-black flex flex-col items-center justify-center"
    >
      {/* Horizontal line above */}
      <div
        ref={line1Ref}
        className="absolute w-24 h-px bg-white/10"
        style={{ top: '50%', marginTop: '-28px' }}
      />

      {/* Mark */}
      <div className="flex items-baseline select-none">
        <span
          ref={blRef}
          className="text-white font-bold tracking-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}
        >
          BL
        </span>
        <span
          ref={dotRef}
          className="text-[#c8ff00]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}
        >
          .
        </span>
        <span
          ref={coRef}
          className="text-white font-bold"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em' }}
        >
          co
        </span>
      </div>

      {/* Horizontal line below */}
      <div
        ref={line2Ref}
        className="absolute w-24 h-px bg-white/10"
        style={{ top: '50%', marginTop: '22px' }}
      />
    </div>
  )
}
