'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* FLOATING SCROLL TO TOP BUTTON */}
      {isVisible && (
<button
  onClick={scrollToTop}
  className="fixed z-50 p-3 text-white bg-black rounded-full bottom-6 right-6 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white animate-fadeIn"
  aria-label="Scroll to top"
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 15l7-7 7 7"
    />
  </svg>
</button>
      )}

      <footer className="text-white bg-gravix-black">
        <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
          {/* ==== MAIN GRID ==== */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
            {/* ---- Brand ---- */}
            <div className="flex flex-col text-center sm:flex-row sm:items-start sm:space-x-6 sm:text-left">
              <div className="flex-1">
                <h3 className="mb-4 text-2xl font-light font-kugile">GRAVIX</h3>
                <p className="text-sm leading-relaxed text-gravix-gray-400">
                  Minimalist clothing for modern living. Quality crafted for everyday wear.
                </p>
              </div>
            </div>

            {/* ---- Shop ---- */}
            <nav aria-label="Shop links">
              <h4 className="mb-4 text-lg font-medium text-center sm:text-left">Shop</h4>
              <ul className="space-y-2 text-center text-gravix-gray-400 sm:text-left">
                <li>
                  <Link href="/products" className="transition-colors hover:text-white">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=men" className="transition-colors hover:text-white">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=women" className="transition-colors hover:text-white">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=kids" className="transition-colors hover:text-white">
                    Kids
                  </Link>
                </li>
              </ul>
            </nav>

            {/* ---- Support ---- */}
            <nav aria-label="Support links">
              <h4 className="mb-4 text-lg font-medium text-center sm:text-left">Support</h4>
              <ul className="space-y-2 text-center text-gravix-gray-400 sm:text-left">
                <li>
                  <Link href="/contact" className="transition-colors hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-colors hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-colors hover:text-white">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            {/* ---- Company ---- */}
            <nav aria-label="Company links">
              <h4 className="mb-4 text-lg font-medium text-center sm:text-left">Company</h4>
              <ul className="space-y-2 text-center text-gravix-gray-400 sm:text-left">
                <li>
                  <Link href="/about" className="transition-colors hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="transition-colors hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="transition-colors hover:text-white">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="transition-colors hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* ==== BOTTOM BAR ==== */}
          <div className="flex flex-col items-center gap-4 pt-8 mt-8 border-t border-gravix-gray-800 md:flex-row md:justify-between">
            <p className="text-xs sm:text-sm text-gravix-gray-400">
              © 2024 GRAVIX. All rights reserved.
            </p>

            <div className="flex space-x-6">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="transition-colors text-gravix-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors text-gravix-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="#"
                aria-label="Twitter"
                className="transition-colors text-gravix-gray-400 hover:text-white"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}