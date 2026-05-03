import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Carbon-Loss Tracker',
  description: 'Estimasi pelepasan emisi karbon berdasarkan deforestasi di Indonesia.',
  keywords: ['deforestasi', 'karbon', 'emisi', 'Indonesia', 'environment'],
  authors: [{ name: 'Carbon Loss Tracker Team' }],
  openGraph: {
    title: 'Carbon-Loss Tracker',
    description: 'Monitoring komprehensif deforestasi dan emisi CO₂ di Indonesia',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
