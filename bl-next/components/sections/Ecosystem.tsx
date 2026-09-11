'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const DIVISIONS = [
  {
    id: 'software',
    label: '01',
    name: 'BL.SOFTWARE',
    desc: 'Products, websites, systems and technology.',
    href: '/companies#software',
    color: '#74a9fa',
  },
  {
    id: 'media',
    label: '02',
    name: 'BL.MEDIA',
    desc: 'Stories, visual media, documentaries and creative work.',
    href: '/companies#media',
    color: '#c8ff00',
  },
  {
    id: 'antar',
    label: '03',
    name: 'ANTAR STUDIO',
    desc: 'Creative experimentation, design and visual development.',
    href: '/companies#antar',
    color: '#ff9f74',
  },
  {
    id: 'labs',
    label: '04',
    name: 'BL.LABS',
    desc: 'Experimental products, AI, research and new ideas.',
    href: '/companies#labs',
    color: '#b474fa',
  },
]

export default function Ecosystem() {
  const sectionRef  = useRef<HTMLElement>(null)
  const activeRef   = useRef<number | null>(null)
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scroll entrance
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: i * 0.1,
        }
      )
    })

    if (prefersReduced) return

    // Mouse parallax on the section
    const section = sectionRef.current!
    const onMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      cardsRef.current.forEach((card, i) => {
        if (!card || activeRef.current === i) return
        const depth = (i % 2 === 0 ? 1 : -1) * (i + 1) * 4
        gsap.to(card, {
          x: dx * depth,
          y: dy * depth * 0.5,
          duration: 1.5,
          ease: 'expo.out',
        })
      })
    }
    section.addEventListener('mousemove', onMouse)
    return () => section.removeEventListener('mousemove', onMouse)
  }, [])

  const handleEnter = (i: number) => {
    activeRef.current = i
    cardsRef.current.forEach((card, j) => {
      if (!card) return
      gsap.to(card, {
        opacity: i === j ? 1 : 0.2,
        scale:   i === j ? 1.02 : 0.97,
        duration: 0.4,
        ease: 'expo.out',
      })
    })
  }

  const handleLeave = () => {
    activeRef.current = null
    cardsRef.current.forEach(card => {
      if (!card) return
      gsap.to(card, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.5, ease: 'expo.out' })
    })
  }

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="section py-40"
    >
      <div className="container">
        {/* Heading */}
        <div className="mb-24">
          <span className="label text-g500 block mb-6">THE ECOSYSTEM</span>
          <h2
            className="font-bold text-white"
            style={{ fontSize: 'clamp(2.5rem,6vw,7rem)', lineHeight: '0.9', letterSpacing: '-0.04em' }}
          >
            ONE COMPANY.<br />
            <span className="text-g500">MANY DIRECTIONS.</span>
          </h2>
        </div>

        {/* Division grid */}
        <div className="grid md:grid-cols-2 gap-px bg-g900">
          {DIVISIONS.map((div, i) => (
            <div
              key={div.id}
              ref={el => { cardsRef.current[i] = el }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              className="bg-s1 p-10 md:p-16 group relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: div.color }}
              />

              <div className="flex justify-between items-start mb-8">
                <span className="label text-g600">{div.label}</span>
                <Link
                  href={div.href}
                  className="label text-g600 group-hover:text-white transition-colors flex items-center gap-2"
                >
                  Explore
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              <h3
                className="font-bold text-white mb-4"
                style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: '-0.03em' }}
              >
                {div.name}
              </h3>
              <p className="text-g400 leading-relaxed max-w-xs">{div.desc}</p>

              {/* Accent dot */}
              <div
                className="absolute bottom-8 right-8 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: div.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
