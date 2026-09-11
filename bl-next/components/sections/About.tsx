'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEAM = [
  {
    name: 'Anurag',
    handle: 'BLAMED',
    role: 'Founder & CEO',
    initials: 'A',
  },
  {
    name: 'Rudra Rathore',
    handle: 'RUDRA',
    role: 'Co-Founder',
    initials: 'R',
  },
]

const METRICS = [
  { value: '04', label: 'Companies' },
  { value: '02', label: 'Core Team' },
  { value: '03+', label: 'Active Projects' },
  { value: '∞', label: 'Experiments' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="section py-40 border-t border-g900" style={{ opacity: 0 }}>
      <div className="container">
        <div className="grid md:grid-cols-2 gap-24 items-start">

          {/* Left: copy */}
          <div>
            <span className="label text-g500 block mb-6">ABOUT</span>
            <h2
              className="font-bold text-white mb-10"
              style={{ fontSize: 'clamp(2rem,5vw,6rem)', lineHeight: '0.9', letterSpacing: '-0.04em' }}
            >
              SMALL TEAM.<br />
              <span className="text-g500">BIG AMBITION.</span>
            </h2>

            <div className="space-y-5 text-g300 leading-relaxed" style={{ maxWidth: '46ch' }}>
              <p>
                BL.co is an independent technology and creative company building products, platforms
                and experiments across software, media and emerging technology.
              </p>
              <p>We are deliberately small.</p>
              <p>We care about what we build.</p>
              <p className="text-g500">And we&apos;re just getting started.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-4 mt-16 pt-8 border-t border-g900">
              {METRICS.map(m => (
                <div key={m.label}>
                  <div
                    className="font-bold text-white mb-1"
                    style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', letterSpacing: '-0.04em' }}
                  >
                    {m.value}
                  </div>
                  <div className="label text-g600">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: team */}
          <div>
            <span className="label text-g500 block mb-8">FOUNDED BY</span>
            <div className="flex flex-col gap-6">
              {TEAM.map(member => (
                <div
                  key={member.handle}
                  className="flex items-center gap-6 p-6 bg-s2 border border-g900 group hover:border-g700 transition-colors duration-300"
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-sm bg-g900 flex items-center justify-center text-g400 font-bold flex-shrink-0"
                    style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div className="text-white font-medium">{member.name}</div>
                    <div className="label text-g500 mt-0.5">
                      <span className="text-g700 mr-2">@{member.handle}</span>
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Early days note */}
            <div className="mt-12 p-6 border border-g900 border-dashed">
              <div
                className="font-bold text-white mb-2"
                style={{ fontSize: 'clamp(1rem,2vw,1.5rem)', letterSpacing: '-0.02em' }}
              >
                EARLY DAYS.
              </div>
              <p className="text-g500 text-sm leading-relaxed">
                We don&apos;t have a decade of history, a hundred clients, or a wall of awards.
                What we have is product in development, real ideas, and the discipline to build properly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
