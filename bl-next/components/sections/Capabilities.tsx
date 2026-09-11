'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['DESIGN', 'BUILD', 'CODE', 'CREATE', 'RESEARCH', 'SHIP', 'ITERATE']

const CAPABILITIES = [
  'Web Development', 'Product Design', 'UI / UX',
  'AI Integration', 'Creative Technology', 'Media',
  'Branding', 'Interactive Experiences', 'Software',
  'Digital Products',
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll-linked marquee
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const items = marqueeRef.current?.querySelectorAll('.marquee-word')
    if (!items) return

    items.forEach((item, i) => {
      const dir = i % 2 === 0 ? 1 : -1
      gsap.to(item, {
        xPercent: dir * 15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      })
    })

    // Capabilities fade in
    const caps = sectionRef.current.querySelectorAll('.cap-item')
    caps.forEach((cap, i) => {
      gsap.fromTo(cap,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'expo.out',
          scrollTrigger: { trigger: cap, start: 'top 85%' },
          delay: i * 0.04,
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="section py-40 border-t border-g900 overflow-hidden">
      {/* Kinetic words */}
      <div ref={marqueeRef} className="mb-24">
        {WORDS.map((word, i) => (
          <div
            key={word}
            className="marquee-word flex items-baseline gap-8 py-1"
          >
            <span
              className="font-bold whitespace-nowrap select-none"
              style={{
                fontSize: 'clamp(4rem,12vw,14rem)',
                letterSpacing: '-0.04em',
                lineHeight: '0.85',
                color: i % 3 === 0 ? '#f0f0f0' : i % 3 === 1 ? '#1a1a1a' : '#333',
                WebkitTextStroke: i % 3 === 1 ? '1px #333' : 'none',
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* Capabilities grid */}
      <div className="container">
        <div className="flex items-start justify-between mb-12">
          <span className="label text-g500">CAPABILITIES</span>
          <div className="w-24 h-px bg-g800 mt-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-4">
          {CAPABILITIES.map(cap => (
            <div key={cap} className="cap-item" style={{ opacity: 0 }}>
              <span className="text-g300 text-sm leading-relaxed">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
