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
import Logo from '../public/assets/logo/g logo.png';

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



    {/* Logo & About Section with Backgrounds */}
    <section className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:grid md:grid-cols-2 md:h-screen">
        
        {/* Left Side - Logo - Mobile First */}
        <div className="relative flex items-center justify-center h-64 p-4 bg-white md:h-full sm:p-6 md:p-8">
          <div className="w-full max-w-xs text-center sm:max-w-sm">
            {/* Logo with responsive sizing */}
            <div className="relative w-32 h-32 mx-auto mb-4 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 md:mb-6">
              <img 
                src={Logo.src}
                alt="GRAVIX Logo"
                className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
            <p className="text-xs font-light tracking-widest text-gray-600 sm:text-sm md:text-base">
              SINCE 2024
            </p>
          </div>
        </div>

        {/* Right Side - Content - Mobile First */}
        <div className="flex items-center justify-center p-6 text-white bg-gradient-to-br from-black to-gray-900 sm:p-10 md:p-16">
          <div className="max-w-md space-y-4 text-center md:text-left sm:space-y-6">
            <h2 className="text-3xl font-bold tracking-tight font-kugile sm:text-4xl md:text-5xl lg:text-6xl">
              GRAVIX
            </h2>
            <p className="text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
              Premium Clothing Store
            </p>
            <div className="w-16 h-px mx-auto bg-white/50 md:mx-0 sm:w-20" />
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
              At GRAVIX, we believe style is a statement. Crafted with precision and passion, 
              our collections blend timeless elegance with modern edge. From tailored essentials 
              to bold statements — elevate your wardrobe with clothing designed to inspire confidence.
            </p>
            
            <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:gap-4 md:justify-start md:mt-8">
              <Link href="/products">
                <button className="w-full px-6 py-2.5 text-xs font-medium tracking-widest transition-all duration-300 border-2 border-white hover:bg-white hover:text-black sm:w-auto sm:px-8 sm:py-3 sm:text-sm">
                  SHOP COLLECTION
                </button>
              </Link>
              <Link href="/about">
                <button className="w-full px-6 py-2.5 text-xs font-medium tracking-widest transition-all duration-300 border-2 border-white/50 hover:border-white hover:bg-white/10 sm:w-auto sm:px-8 sm:py-3 sm:text-sm">
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>


    {/* Brand Values Section */}
    <section className="py-12 bg-white sm:py-16 md:py-20">
      <div className="container px-4 mx-auto sm:px-6">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-3 text-2xl text-gray-900 font-kugile sm:text-3xl md:text-3xl ">
            WHY CHOOSE GRAVIX
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-600 sm:text-base md:text-lg">
            Our commitment to excellence in every detail
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 md:grid-cols-3">
          {/* Value 1 */}
          <div className="text-center group">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white transition-all duration-300 bg-black rounded-full group-hover:bg-gray-100 group-hover:text-black sm:w-18 sm:h-18 sm:mb-5 md:w-20 md:h-20 md:mb-6">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl md:mb-4">Premium Quality</h3>
            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
              Crafted from the finest materials with exceptional attention to detail and durability.
            </p>
          </div>

          {/* Value 2 */}
          <div className="text-center group">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white transition-all duration-300 bg-black rounded-full group-hover:bg-gray-100 group-hover:text-black sm:w-18 sm:h-18 sm:mb-5 md:w-20 md:h-20 md:mb-6">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl md:mb-4">Sustainable Fashion</h3>
            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
              Ethically sourced materials and responsible manufacturing processes for a better future.
            </p>
          </div>

          {/* Value 3 */}
          <div className="text-center group">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white transition-all duration-300 bg-black rounded-full group-hover:bg-gray-100 group-hover:text-black sm:w-18 sm:h-18 sm:mb-5 md:w-20 md:h-20 md:mb-6">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl md:mb-4">Modern Design</h3>
            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
              Contemporary styles that blend timeless elegance with current fashion trends.
            </p>
          </div>
        </div>
      </div>
    </section>


    {/* Testimonials Section */}
    <section className="py-12 bg-gray-100 sm:py-16 md:py-20">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 font-kugile sm:text-3xl md:text-4xl">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-600 sm:text-base md:text-lg">
            Join thousands of satisfied customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-sm sm:p-8 hover:shadow-md">
            <div className="flex items-center mb-3 sm:mb-4">
              <img
                src="https://ui-avatars.com/api/?name=Sarah+M&background=1f2937&color=fff&size=48&rounded=true&bold=true"
                alt="Sarah M. - Customer from New York"
                className="object-cover w-10 h-10 mr-3 rounded-full sm:w-12 sm:h-12 sm:mr-4"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">Sarah M.</h4>
                <p className="text-xs text-gray-600 sm:text-sm">New York</p>
              </div>
            </div>
            <p className="text-xs italic leading-relaxed text-gray-700 sm:text-sm">
              "The quality of GRAVIX clothing is exceptional. I've never felt more confident in my outfits."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-sm sm:p-8 hover:shadow-md">
            <div className="flex items-center mb-3 sm:mb-4">
              <img
                src="https://ui-avatars.com/api/?name=James+L&background=1f2937&color=fff&size=48&rounded=true&bold=true"
                alt="James L. - Customer from London"
                className="object-cover w-10 h-10 mr-3 rounded-full sm:w-12 sm:h-12 sm:mr-4"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">James L.</h4>
                <p className="text-xs text-gray-600 sm:text-sm">London</p>
              </div>
            </div>
            <p className="text-xs italic leading-relaxed text-gray-700 sm:text-sm">
              "Attention to detail is remarkable. Every piece feels like it was made just for me."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-sm sm:p-8 hover:shadow-md lg:col-span-1">
            <div className="flex items-center mb-3 sm:mb-4">
              <img
                src="https://ui-avatars.com/api/?name=Emma+K&background=1f2937&color=fff&size=48&rounded=true&bold=true"
                alt="Emma K. - Customer from Tokyo"
                className="object-cover w-10 h-10 mr-3 rounded-full sm:w-12 sm:h-12 sm:mr-4"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900 sm:text-base">Emma K.</h4>
                <p className="text-xs text-gray-600 sm:text-sm">Tokyo</p>
              </div>
            </div>
            <p className="text-xs italic leading-relaxed text-gray-700 sm:text-sm">
              "Sustainable fashion that doesn't compromise on style. GRAVIX is my go-to brand."
            </p>
          </div>
        </div>
      </div>
    </section>
      
    {/* Newsletter */}
    <section className="px-4 py-16 text-black bg-white sm:px-6 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h3 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl font-Break">
          STAY CONNECTED
        </h3>
        
        {/* Description */}
        <p className="max-w-xl px-4 mx-auto mb-8 text-xs text-gray-600 sm:mb-10 lg:mb-12 sm:text-sm lg:text-base">
          Subscribe to receive updates on new arrivals and exclusive offers
        </p>
        
        {/* Form */}
        <div className="flex flex-col max-w-md gap-3 px-4 mx-auto sm:flex-row sm:gap-4 sm:max-w-xl sm:px-0">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-sm transition-all duration-200 border-2 border-black sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-base"
          />
          <button className="px-6 py-3 text-sm font-semibold tracking-widest text-white transition-colors duration-200 bg-black sm:px-8 sm:py-4 hover:bg-gray-800 active:bg-gray-900 sm:text-base whitespace-nowrap">
            SUBSCRIBE
          </button>
        </div>
        
        {/* Additional Info */}
        <p className="max-w-md mx-auto mt-4 text-xs text-gray-500">
          By subscribing, you agree to our Privacy Policy
        </p>
      </div>
    </section>
      
    </div>
  );
}