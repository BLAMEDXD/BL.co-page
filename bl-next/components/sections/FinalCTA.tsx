'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Overlay darkens on scroll into view
    gsap.to(overlayRef.current, {
      opacity: 0.85,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      }
    })

    // Text lifts in
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section relative py-48 border-t border-g900 flex items-center justify-center overflow-hidden"
    >
      {/* Dark overlay that deepens on scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: 0.3 }}
      />

      {/* Grid background */}
      <div className="hero-bg-grid" />

      <div ref={textRef} className="container relative z-10 text-center" style={{ opacity: 0 }}>
        <span className="label text-g500 block mb-8">READY TO BUILD</span>
        <h2
          className="font-bold text-white mb-8"
          style={{ fontSize: 'clamp(3rem,9vw,10rem)', lineHeight: '0.88', letterSpacing: '-0.04em' }}
        >
          LET&rsquo;S BUILD<br />SOMETHING.
        </h2>
        <p className="text-g400 mb-12 text-lg" style={{ maxWidth: '40ch', margin: '0 auto 3rem' }}>
          Have an idea, product or problem worth solving?
        </p>
        <Link href="/partner" className="btn-magnetic solid inline-flex">
          Start a Conversation
        </Link>

        {/* BL.co mark */}
        <div className="mt-24 flex items-baseline justify-center select-none">
          <span
            className="font-bold text-g900"
            style={{ fontSize: 'clamp(3rem,12vw,16rem)', letterSpacing: '-0.05em', lineHeight: '1' }}
          >
            BL
          </span>
          <span
            className="font-bold text-g800"
            style={{ fontSize: 'clamp(3rem,12vw,16rem)', letterSpacing: '-0.05em' }}
          >
            .
          </span>
          <span
            className="font-bold text-g900"
            style={{ fontSize: 'clamp(3rem,12vw,16rem)', letterSpacing: '-0.05em' }}
          >
            co
          </span>
        </div>
      </div>
    </section>
  )
}
