"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import HeroImage from '../public/assets/images/pexels-photo-1884584.jpeg';

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
    { title: 'ESSENTIALS', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80', desc: 'Timeless basics' },
    { title: 'OUTERWEAR', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', desc: 'Premium jackets' },
    { title: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80', desc: 'Complete the look' }
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
          {/* Using Gravix gray palette for gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-gravix-black/60 via-gravix-black/30 to-gravix-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl px-4 text-center">
          {/* Animated heading with Inter font */}
          <h2 className="mb-4 text-4xl font-light tracking-tight text-gravix-white md:text-6xl lg:text-7xl animate-fade-in-up">
            MINIMALIST<br /><span className="text-gravix-gray-200">ELEGANCE</span>
          </h2>
          
          {/* Subtle animated paragraph */}
          <p className="mb-8 text-lg tracking-wide text-gravix-gray-300 md:text-xl lg:text-2xl animate-fade-in-up animation-delay-200">
            Discover premium clothing with timeless design
          </p>
          
          {/* Animated button */}
          <button className="flex items-center px-6 py-3 mx-auto text-xs font-medium tracking-widest transition-all duration-500 text-gravix-black bg-gravix-white hover:bg-gravix-gray-100 hover:scale-105 group md:px-8 md:py-4 md:text-sm animate-fade-in-up animation-delay-400">
            EXPLORE COLLECTION
            <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={16} />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2">
          <div className="flex justify-center w-5 h-8 border rounded-full border-gravix-white animate-bounce-slow">
            <div className="w-0.5 h-2 mt-2 bg-gravix-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-6 py-20 text-black bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-6 text-5xl font-bold tracking-tight">FALL WINTER<br />2025</h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                A carefully curated collection that embodies sophistication and contemporary style. 
                Each piece is designed with attention to detail and crafted from premium materials.
              </p>
              <button className="px-8 py-3 text-sm font-semibold tracking-widest transition-all duration-300 border-2 border-black hover:bg-black hover:text-white">
                SHOP NOW
              </button>
            </div>
            <div className="relative h-96 md:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
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
          <h3 className="mb-12 text-4xl font-bold tracking-tight text-center">COLLECTIONS</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {collections.map((item, idx) => (
              <div key={idx} className="relative overflow-hidden cursor-pointer group">
                <div className="aspect-[3/4] relative">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-all duration-300 bg-black/40 group-hover:bg-black/60"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h4 className="mb-2 text-3xl font-bold tracking-wider">{item.title}</h4>
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
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&q=80"
              alt="Men's Collection"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <h4 className="mb-4 text-5xl font-bold">MEN</h4>
                <button className="px-6 py-2 text-sm tracking-widest transition-all border-2 border-white hover:bg-white hover:text-black">
                  DISCOVER
                </button>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1000&q=80"
              alt="Women's Collection"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center">
                <h4 className="mb-4 text-5xl font-bold">WOMEN</h4>
                <button className="px-6 py-2 text-sm tracking-widest transition-all border-2 border-white hover:bg-white hover:text-black">
                  DISCOVER
                </button>
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