import Footer from '@/components/footer'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex  h-screen overflow-hidden">
      <Sidebar />
      <main className="flex w-full flex-col">
        {children}
        <Footer />
      </main>
    </div>
  )
}
