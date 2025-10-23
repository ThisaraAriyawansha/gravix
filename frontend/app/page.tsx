"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import HeroImage from '../public/assets/images/pexels-photo-1884584.jpeg';
import FallWinter from '../public/assets/images/8069-clothing-shopping-girl-woman-street-2560x1600.jpg';
import Image from 'next/image';
import ESSENTIALS from '../public/assets/images/130BT212032F_3_compressed_1_f3255966-5812-45bb-a8fb-dbf33fc7b1aa.webp';
import OUTERWEAR from '../public/assets/images/photo-1551028719-00167b16eac5.jpeg';
import ACCESSORIES from '../public/assets/images/photo-1523398002811-999ca8dec234.jpeg';
import MEN from '../public/assets/images/photo-1621072156002-e2fccdc0b176.jpeg';
import WOMEN from '../public/assets/images/sexy-young-brunette-with-bright-party-makeup-wellbuilt-body-long-silk-dress-resting-outdoors-black-chair-against-peach-wall-background_197531-28187.jpg';

export default function GravixHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const collections = [
    { title: 'ESSENTIALS', image: ESSENTIALS, desc: 'Timeless basics' },
    { title: 'OUTERWEAR', image: OUTERWEAR, desc: 'Premium jackets' },
    { title: 'ACCESSORIES', image: ACCESSORIES, desc: 'Complete the look' }
  ];

  return (
    <div className="min-h-screen font-sans text-white bg-black">
      

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HeroImage.src}
            alt="Hero"
            className="object-cover w-full h-full opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gravix-black/60 via-gravix-black/30 to-gravix-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-widest text-white md:text-5xl lg:text-6xl animate-fade-in-up">
            <span className="tracking-[0.3em] font-Break">GRAVIX</span><br />
            <span className="font-Break text-gravix-gray-200">MINIMALIST ELEGANCE</span>
          </h2>


          
          <p className="mb-8 text-sm tracking-wide font-kugile text-gravix-gray-300 md:text-xl lg:text-xl animate-fade-in-up animation-delay-200">
            Discover premium clothing with timeless design
          </p>
          
          <Link href="/products">
            <button className="flex items-center px-6 py-3 mx-auto text-xs font-medium tracking-widest text-white transition-all duration-500 bg-transparent border border-white hover:bg-white hover:text-gravix-black hover:scale-105 group md:px-8 md:py-4 md:text-sm animate-fade-in-up animation-delay-400">
              EXPLORE COLLECTION
              <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={16} />
            </button>

          </Link>
        </div>

        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2">
          <div className="flex justify-center w-5 h-8 border rounded-full border-gravix-white animate-bounce-slow">
            <div className="w-0.5 h-2 mt-2 bg-gravix-white rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="absolute w-20 h-20 border-t border-l top-10 left-10 border-gravix-white/30 animate-border-appear"></div>
        <div className="absolute w-20 h-20 border-b border-r bottom-10 right-10 border-gravix-white/30 animate-border-appear animation-delay-500"></div>
      </section>      

      {/* Featured Section */}
      <section className="px-6 py-20 text-black bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] font-palmsprings">
                FALL WINTER
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-700 ">
                A carefully curated collection that embodies sophistication and contemporary style. 
                Each piece is designed with attention to detail and crafted from premium materials.
              </p>
            <Link href="/products">
              <button className="px-8 py-3 text-sm font-semibold tracking-widest transition-all duration-300 border-2 border-black hover:bg-black hover:text-white">
                SHOP NOW
              </button>
            </Link>
            </div>
            <div className="relative h-96 md:h-[500px]">
              <img 
                src={FallWinter.src}
                alt="Featured"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-12 text-4xl text-center font-Corigo tracking-[0.1em]">COLLECTIONS</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {collections.map((item, idx) => (
              <div key={idx} className="relative overflow-hidden cursor-pointer group">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-all duration-300 bg-black/40 group-hover:bg-black/60"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h4 className="mb-2 text-3xl tracking-wider font-kugile">{item.title}</h4>
                    <p className="text-sm tracking-wide text-gray-300">{item.desc}</p>
                    <div className="mt-4 w-12 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Image Section */}
      <section className="relative h-screen">
        <div className="grid h-full md:grid-cols-2">
          <div className="relative overflow-hidden group">
            <img 
              src={MEN.src}
              alt="Men's Collection"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <h4 className="mb-4 text-5xl font-bold font-kugile">MEN</h4>
              <Link href="/products?category=men">
                <button className="px-6 py-2 text-sm tracking-widest transition-all border-2 border-white hover:bg-white hover:text-black">
                  DISCOVER
                </button>
              </Link>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <img 
              src={WOMEN.src}
              alt="Women's Collection"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <h4 className="mb-4 text-5xl font-kugile">WOMEN</h4>
                <Link href="/products?category=women">
                <button className="px-6 py-2 text-sm tracking-widest transition-all border-2 border-white hover:bg-white hover:text-black">
                  DISCOVER
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-20 text-black bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="mb-4 text-4xl font-bold tracking-tight">STAY CONNECTED</h3>
          <p className="mb-8 text-gray-600">Subscribe to receive updates on new arrivals and exclusive offers</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border-2 border-black focus:outline-none"
            />
            <button className="px-8 py-4 font-semibold tracking-widest text-white transition-colors bg-black hover:bg-gray-800">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
}