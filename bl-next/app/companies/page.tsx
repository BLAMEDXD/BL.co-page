import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Companies — BL.co',
  description: 'Four companies, one structure. BL.Software, BL.Media, BL.Labs, and Antar Studio.',
}

const companies = [
  {
    id: 'software',
    number: '01',
    name: 'BL.SOFTWARE',
    tagline: 'Products, websites, systems and technology.',
    body: 'BL.Software is the product and engineering arm of BL.co. We build software products, web platforms, and scalable digital systems.',
    color: '#74a9fa',
  },
  {
    id: 'media',
    number: '02',
    name: 'BL.MEDIA',
    tagline: 'Stories, visual media and creative work.',
    body: 'BL.Media covers storytelling, visual content, documentaries and creative production.',
    color: '#c8ff00',
  },
  {
    id: 'antar',
    number: '03',
    name: 'ANTAR STUDIO',
    tagline: 'Creative experimentation and visual development.',
    body: 'Antar Studio is the creative and design division — experimental, visual, and forward-thinking.',
    color: '#ff9f74',
  },
  {
    id: 'labs',
    number: '04',
    name: 'BL.LABS',
    tagline: 'Experimental products, AI, research and new ideas.',
    body: 'BL.Labs is where the strangest ideas get tested. AI, emerging tech, research and fast experimentation.',
    color: '#b474fa',
  },
]

export default function Companies() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-40">
      <div className="container">
        <div className="mb-24">
          <Link href="/" className="label text-g600 hover:text-white transition-colors mb-8 inline-block">← BL.co</Link>
          <span className="label text-g500 block mb-6">COMPANIES</span>
          <h1 className="font-bold text-white" style={{ fontSize: 'clamp(3rem,8vw,8rem)', lineHeight: '0.9', letterSpacing: '-0.04em' }}>
            ONE STRUCTURE.<br /><span className="text-g500">FOUR DIRECTIONS.</span>
          </h1>
        </div>

        <div className="flex flex-col gap-px bg-g900">
          {companies.map(co => (
            <div key={co.id} id={co.id} className="bg-s1 p-10 md:p-16 group">
              <div className="grid md:grid-cols-[auto_1fr_1fr] gap-8 md:gap-16 items-start">
                <span className="label text-g600">{co.number}</span>
                <div>
                  <h2 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(1.5rem,3vw,3rem)', letterSpacing: '-0.03em' }}>
                    {co.name}
                  </h2>
                  <p className="text-g400 text-sm leading-relaxed">{co.tagline}</p>
                </div>
                <div>
                  <p className="text-g500 text-sm leading-relaxed">{co.body}</p>
                  <div className="mt-6 w-16 h-px" style={{ background: co.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
