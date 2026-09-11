import Link from 'next/link'

const NAV = [
  { label: 'Company',   href: '/companies' },
  { label: 'Projects',  href: '/projects' },
  { label: 'Labs',      href: '/labs' },
  { label: 'Journal',   href: '/journal' },
  { label: 'Contact',   href: '/contact' },
]

const LEGAL = [
  { label: 'Privacy',  href: '/privacy' },
  { label: 'Terms',    href: '/terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-g900 py-16 bg-black">
      <div className="container">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-12 items-start mb-16">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-baseline gap-0 mb-4">
              <span className="font-bold text-white text-xl" style={{ letterSpacing: '-0.04em' }}>BL</span>
              <span className="font-bold text-[#c8ff00] text-xl" style={{ letterSpacing: '-0.04em' }}>.</span>
              <span className="font-bold text-white text-xl" style={{ letterSpacing: '-0.04em' }}>co</span>
            </Link>
            <p className="text-g600 text-sm mb-2">India</p>
            <p className="label text-g700 mt-4">BUILD. CREATE. EVOLVE.</p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            {NAV.map(l => (
              <Link key={l.href} href={l.href} className="label text-g500 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
            <span className="label text-g700 mb-2">CONNECT</span>
            <a
              href="https://github.com/BLAMEDXD"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-g500 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/BLAMEDXD"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-g500 hover:text-white transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="mailto:laptopsystem1.1@gmail.com"
              className="label text-g500 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-g900">
          <span className="label text-g700">© 2026 BL.co — All rights reserved.</span>
          <div className="flex gap-6">
            {LEGAL.map(l => (
              <Link key={l.href} href={l.href} className="label text-g700 hover:text-g400 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
