'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <section className="relative h-[90vh] flex items-center justify-center bg-[#1a1a1a] text-white">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              MINIMALIST ELEGANCE
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Discover premium clothing designed for the modern minimalist. Quality pieces that define your style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-base">
                <Link href="/shop">
                  SHOP NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-white text-black border-white hover:bg-gray-100">
                <Link href="/categories">VIEW COLLECTIONS</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">FREE SHIPPING</h3>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">SECURE PAYMENT</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                  <RefreshCw className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">EASY RETURNS</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">FEATURED COLLECTION</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Carefully curated pieces that embody timeless style and exceptional quality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Link href="/shop" className="group">
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-500">
                    <span className="text-6xl font-light">T</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">PREMIUM T-SHIRTS</h3>
                <p className="text-sm text-gray-600">From $49.99</p>
              </Link>

              <Link href="/shop" className="group">
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-500">
                    <span className="text-6xl font-light">H</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">HOODIES</h3>
                <p className="text-sm text-gray-600">From $89.99</p>
              </Link>

              <Link href="/shop" className="group">
                <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-500">
                    <span className="text-6xl font-light">J</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">JACKETS</h3>
                <p className="text-sm text-gray-600">From $149.99</p>
              </Link>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/shop">VIEW ALL PRODUCTS</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">OUR PHILOSOPHY</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  At GRAVIX, we believe in the power of simplicity. Our designs strip away the unnecessary,
                  leaving only what matters: exceptional quality, timeless style, and uncompromising comfort.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Every piece is thoughtfully crafted to become a staple in your wardrobe, designed to last
                  and transcend fleeting trends.
                </p>
                <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white hover:text-black">
                  <Link href="/about">LEARN MORE</Link>
                </Button>
              </div>

              <div className="aspect-square bg-gray-800 flex items-center justify-center">
                <span className="text-9xl font-light opacity-20">G</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
