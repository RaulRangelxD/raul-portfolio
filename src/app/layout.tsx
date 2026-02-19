import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Orbitron as OrbitronFont } from 'next/font/google'
import '@/app/globals.css'
import CyberpunkBackground from '@/components/CyberpunkBackground'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const orbitron = OrbitronFont({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'Raúl Rangel - Portfolio',
  description:
    'Raúl Rangel - Portfolio de un desarrollador apasionado por la tecnología y la innovación.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}  antialiased`}
      >
        <CyberpunkBackground />
        {children}
      </body>
    </html>
  )
}
