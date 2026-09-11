'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    num: '01',
    word: 'IDEA',
    lines: ['Find something', 'worth building.'],
    color: '#333',
  },
  {
    num: '02',
    word: 'EXPERIMENT',
    lines: ['Test it.', 'Break it.', 'Question it.'],
    color: '#444',
  },
  {
    num: '03',
    word: 'BUILD',
    lines: ['Turn the strongest', 'idea into something real.'],
    color: '#666',
  },
  {
    num: '04',
    word: 'SHIP',
    lines: ['Put it', 'into the world.'],
    color: '#f0f0f0',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.stage-card')
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} className="section py-40 border-t border-g900">
      <div className="container">
        <div className="mb-24">
          <span className="label text-g500 block mb-6">THE APPROACH</span>
          <h2
            className="font-bold text-white"
            style={{ fontSize: 'clamp(2rem,5vw,6rem)', lineHeight: '0.9', letterSpacing: '-0.04em' }}
          >
            IDEA → EXPERIMENT<br />
            <span className="text-g500">→ BUILD → SHIP</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-g900">
          {STAGES.map((stage) => (
            <div
              key={stage.num}
              className="stage-card bg-s1 p-8 md:p-10 group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start justify-between mb-12">
                <span className="label text-g600">{stage.num}</span>
                <div className="w-2 h-2 rounded-full bg-g800 group-hover:bg-white transition-colors duration-300" />
              </div>
              <h3
                className="font-bold mb-6"
                style={{
                  fontSize: 'clamp(1.5rem,2.5vw,2.5rem)',
                  letterSpacing: '-0.03em',
                  color: stage.color,
                  lineHeight: '0.9',
                }}
              >
                {stage.word}
              </h3>
              {stage.lines.map((line, i) => (
                <p key={i} className="text-g500 leading-relaxed text-sm">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
