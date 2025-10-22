'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'

export default function Header() {
  const { items } = useCartStore()
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [])

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-light text-black">
            GRAVIX
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden space-x-8 md:flex">
            <Link href="/products" className="text-gray-600 transition-colors hover:text-black">
              Products
            </Link>
            <Link href="/about" className="text-gray-600 transition-colors hover:text-black">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 transition-colors hover:text-black">
              Contact
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-gray-600 transition-colors hover:text-black">
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 transition-colors rounded hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-1 -right-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
           {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center p-2 space-x-2 transition-colors rounded hover:bg-gray-100"
              >
                <span className="text-gray-600">{user.full_name || user.email}</span>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 rounded shadow-lg">
                  {user.role === 'admin' ? (
                    // ✅ Admin menu
                    <>
                      <Link 
                        href="/admin/dashboard"
                        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 transition-colors hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    // ✅ Regular user (customer) menu
                    <>
                      <Link 
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link 
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 transition-colors hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-gray-600 transition-colors hover:text-black">
              Login
            </Link>
          )}


            {/* Mobile menu button */}
            <button 
              className="p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="py-4 border-t border-gray-200 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-600 transition-colors hover:text-black">
                Products
              </Link>
              <Link href="/about" className="text-gray-600 transition-colors hover:text-black">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 transition-colors hover:text-black">
                Contact
              </Link>
              {user?.role === 'admin' && (
                <Link href="/admin/dashboard" className="text-gray-600 transition-colors hover:text-black">
                  Admin
                </Link>
              )}
              {!user && (
                <Link href="/login" className="text-gray-600 transition-colors hover:text-black">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}