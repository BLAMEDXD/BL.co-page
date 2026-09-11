import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'BL.co — Build. Create. Evolve.',
  description:
    'A technology and creative company building products, experiences and ideas across software, media and the web.',
  openGraph: {
    title: 'BL.co — Build. Create. Evolve.',
    description:
      'A technology and creative company building products, experiences and ideas across software, media and the web.',
    siteName: 'BL.co',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BL.co',
    description: 'Technology & creative company. Building what\'s next.',
    creator: '@BLAMEDXD',
  },
  metadataBase: new URL('https://blco-website.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="google-site-verification" content="G-3yfikP_qsQoVjUW-kJBU51-tZ_2tBZSAdyEem3d10" />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
