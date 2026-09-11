'use client'
import { useState } from 'react'
import Loader  from '@/components/Loader'
import Cursor  from '@/components/Cursor'
import Nav     from '@/components/Nav'
import Hero    from '@/components/sections/Hero'
import Ecosystem   from '@/components/sections/Ecosystem'
import Projects    from '@/components/sections/Projects'
import Capabilities from '@/components/sections/Capabilities'
import Process     from '@/components/sections/Process'
import About       from '@/components/sections/About'
import FinalCTA    from '@/components/sections/FinalCTA'
import Footer      from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Noise overlay — always on */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      {/* Cinematic loader */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Page content (rendered underneath loader, revealed on complete) */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Nav />

        <main>
          <Hero />
          <Ecosystem />
          <Projects />
          <Capabilities />
          <Process />
          <About />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  )
}
