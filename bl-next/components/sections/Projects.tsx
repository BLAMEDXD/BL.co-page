'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'ascend',
    number: '01',
    name: 'ASCEND AI',
    category: 'BL.LABS / PRODUCT',
    status: 'IN DEVELOPMENT',
    statusColor: '#74a9fa',
    desc: 'A real-life RPG designed to turn personal growth into an interactive journey. Track habits, level up skills, and turn your life into a story worth living.',
    tags: ['AI', 'Mobile', 'Product'],
    href: '/projects#ascend',
    accent: '#74a9fa',
  },
  {
    id: 'webtastic',
    number: '02',
    name: 'WEBTASTIC GAMES',
    category: 'BL.SOFTWARE / GAMING',
    status: 'IN DEVELOPMENT',
    statusColor: '#c8ff00',
    desc: 'A gaming platform where play becomes progression and rewards become real. Browser-native games built for engagement, designed to last.',
    tags: ['Gaming', 'Web', 'Platform'],
    href: '/projects#webtastic',
    accent: '#c8ff00',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card')
    cards?.forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 80%' }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="section py-40 border-t border-g900">
      <div className="container">
        <div className="flex items-end justify-between mb-24">
          <div>
            <span className="label text-g500 block mb-6">PROJECTS</span>
            <h2
              className="font-bold text-white"
              style={{ fontSize: 'clamp(2.5rem,6vw,7rem)', lineHeight: '0.9', letterSpacing: '-0.04em' }}
            >
              WHAT WE&rsquo;RE<br />
              <span className="text-g500">BUILDING.</span>
            </h2>
          </div>
          <Link href="/projects" className="btn-magnetic text-white hidden md:inline-flex">
            All Projects →
          </Link>
        </div>

        <div className="flex flex-col gap-px bg-g900">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card bg-s1 p-10 md:p-16 group" style={{ opacity: 0 }}>
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">

                {/* Left: meta */}
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="label text-g600">{project.number}</span>
                    <div className="w-8 h-px bg-g800" />
                    <span
                      className="label"
                      style={{ color: project.statusColor, fontSize: '9px' }}
                    >
                      ● {project.status}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-white mb-3"
                    style={{ fontSize: 'clamp(2rem,4vw,4rem)', letterSpacing: '-0.04em', lineHeight: '0.9' }}
                  >
                    {project.name}
                  </h3>
                  <p className="label text-g500 mb-8">{project.category}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="label text-g500 border border-g800 px-3 py-1"
                        style={{ fontSize: '9px' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.href}
                    className="btn-magnetic text-white self-start"
                    data-cursor="VIEW"
                  >
                    View Project
                  </Link>
                </div>

                {/* Right: visual placeholder with accent */}
                <div className="relative aspect-video bg-s2 overflow-hidden border border-g900">
                  {/* Grid background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  {/* Center: BL.co mark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-bold select-none"
                      style={{
                        fontSize: 'clamp(2rem,8vw,8rem)',
                        letterSpacing: '-0.04em',
                        color: project.accent,
                        opacity: 0.06,
                      }}
                    >
                      {project.name.split(' ')[0]}
                    </span>
                  </div>
                  {/* Description overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-s1 to-transparent">
                    <p className="text-g400 text-sm leading-relaxed max-w-md">{project.desc}</p>
                  </div>
                  {/* Accent border top */}
                  <div
                    className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
                    style={{ background: project.accent }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
