import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import ReactQueryProvider from '@/lib/provider/ReactQueryProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'multiblog',
  description: 'multiblog admin dashboard'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </>
      </body>
    </html>
  )
}
