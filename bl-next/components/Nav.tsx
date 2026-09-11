'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Company',   href: '/companies' },
  { label: 'Ecosystem', href: '/#ecosystem' },
  { label: 'Projects',  href: '/projects' },
  { label: 'Labs',      href: '/labs' },
  { label: 'Contact',   href: '/contact' },
]

export default function Nav() {
  const pathname  = usePathname()
  const navRef    = useRef<HTMLElement>(null)
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entrance animation (after loader)
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.8 })
    tl.fromTo(navRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
    )
  }, [])

  const toggleMenu = () => setOpen(v => !v)

  return (
    <>
      <nav
        ref={navRef}
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        style={{ opacity: 0 }} // starts invisible, GSAP reveals
      >
        {/* Logo */}
        <Link href="/" className="mr-auto flex items-baseline gap-0 select-none group">
          <span className="text-white font-bold text-xl tracking-tight" style={{ letterSpacing: '-0.04em' }}>
            BL
          </span>
          <span className="text-[#c8ff00] font-bold text-xl" style={{ letterSpacing: '-0.04em' }}>.</span>
          <span className="text-white font-bold text-xl" style={{ letterSpacing: '-0.04em' }}>co</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`label transition-colors duration-200 hover:text-white ${
                pathname === l.href ? 'text-white' : 'text-g400'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/partner"
          className="hidden md:inline-flex btn-magnetic text-white ml-auto"
        >
          Partner
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Burger */}
        <button
          onClick={toggleMenu}
          className="ml-auto md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block w-5 h-px bg-white transition-transform duration-300 ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-transform duration-300 ${open ? '-rotate-45 -translate-y-[9px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay ${open ? 'open' : ''} md:hidden`}>
        <div className="flex flex-col gap-8 mt-16">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white font-bold"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                letterSpacing: '-0.03em',
                transitionDelay: `${i * 60}ms`
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/partner"
            onClick={() => setOpen(false)}
            className="btn-magnetic solid mt-4 self-start"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </>
  )
}
