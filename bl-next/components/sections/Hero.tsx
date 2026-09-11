'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref   = useRef<HTMLDivElement>(null)
  const line2Ref   = useRef<HTMLDivElement>(null)
  const line3Ref   = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const metaRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Entrance (after loader ~2.8s)
    const tl = gsap.timeline({ delay: 3.0 })
    if (!prefersReduced) {
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, subRef.current, ctaRef.current, metaRef.current], {
        opacity: 0, y: 40
      })
      tl
        .to(line1Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.7')
        .to(line3Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.7')
        .to(subRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')
        .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')
        .to(metaRef.current,  { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.4')
    } else {
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, subRef.current, ctaRef.current, metaRef.current], { opacity: 1, y: 0 })
    }

    // Parallax on scroll
    if (!prefersReduced && sectionRef.current) {
      gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }

    // Mouse parallax
    const onMouse = (e: MouseEvent) => {
      if (prefersReduced) return
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        x: dx * 8,
        y: dy * 4,
        duration: 1.2,
        ease: 'expo.out'
      })
    }
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex flex-col justify-center"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      {/* Background grid */}
      <div className="hero-bg-grid" />

      {/* Very subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,255,0,0.03) 0%, transparent 60%)'
        }}
      />

      <div className="container relative z-10" style={{ paddingTop: '10vh', paddingBottom: '10vh' }}>

        {/* Top metadata */}
        <div ref={metaRef} className="flex items-center gap-4 mb-16">
          <span className="label text-g400">BL.CO — TECHNOLOGY &amp; CREATIVE</span>
          <span className="w-8 h-px bg-g700" />
          <span className="label text-g500">EST. 2024</span>
        </div>

        {/* Display headline */}
        <h1
          className="font-bold text-white"
          style={{ fontSize: 'clamp(3.5rem,10vw,11rem)', lineHeight: '0.88', letterSpacing: '-0.04em' }}
        >
          <div ref={line1Ref} className="overflow-hidden">
            <span className="block">WE BUILD</span>
          </div>
          <div ref={line2Ref} className="overflow-hidden mt-1">
            <span className="block text-g400">WHAT&rsquo;S</span>
          </div>
          <div ref={line3Ref} className="overflow-hidden mt-1">
            <span className="block">NEXT.</span>
          </div>
        </h1>

        {/* Sub copy + CTAs */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 items-end">
          <p
            ref={subRef}
            className="text-g300 leading-relaxed max-w-lg"
            style={{ fontSize: 'clamp(0.9rem,1.5vw,1.125rem)' }}
          >
            A technology and creative company building products, experiences and ideas
            across software, media and the web.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 md:justify-end">
            <Link href="#ecosystem" className="btn-magnetic solid">
              Explore BL.co
            </Link>
            <Link href="/projects" className="btn-magnetic text-white" data-cursor="VIEW">
              See What We&rsquo;re Building
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="label text-g600" style={{ fontSize: '9px' }}>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-g700 to-transparent" />
        </div>
      </div>
    </section>
  )
}
