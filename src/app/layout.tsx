import type { Metadata } from 'next'
import Script from 'next/script'

import '@/styles/main.scss'
import LenisProvider from './utils/LenisProvider'
import Footer from './layout/Footer/Footer'
import Navigation from './layout/Navigation/Navigation'

export const metadata: Metadata = {
  title: 'Nilex Industrial | Safety & Industrial Supplies — Mobile, AL',
  description: 'Nilex Industrial is a woman-owned, family-run safety and industrial supply company based in Mobile, AL. PPE, gloves, lighting, and more. Call (251) 458-9718.',
  robots: 'index, follow',
  verification: {
    google: 'YPMVenJkUa6BlbvxZn_rEaa1t4DCh2Ss5-9B3ZIO-Vw',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://alexmaxwedding.com/" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />

      </head>
      <body>
        <LenisProvider>
          <Navigation />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}