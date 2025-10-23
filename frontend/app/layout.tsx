import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'
import Logo from '../public/assets/logo/g logo.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GRAVIX - Premium Clothing Store',
  description: 'Discover premium clothing with minimalist design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon (title icon) */}
        <link rel="icon" href="/assets/logo/g logo.png" type="image/jpeg" />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
