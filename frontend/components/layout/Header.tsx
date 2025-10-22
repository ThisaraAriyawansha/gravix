'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import { ShoppingBag, Menu, X, ChevronDown, User } from 'lucide-react'

export default function Header() {
  const { items } = useCartStore()
  const [user, setUser] = useState<any>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsUserMenuOpen(false)
    window.location.href = '/'
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-sm' : 'border-b border-gray-200'}`}>
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Toggle */}
          <button 
            className="p-2 transition-colors rounded md:hidden hover:bg-gray-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-black" /> : <Menu size={24} className="text-black" />}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-light text-black hover:opacity-70">
            GRAVIX
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden space-x-8 md:flex">
            <Link href="/products" className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black">
              PRODUCTS
            </Link>
            <Link href="/about" className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black">
              ABOUT
            </Link>
            <Link href="/contact" className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black">
              CONTACT
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black">
                ADMIN
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 transition-colors rounded hover:bg-gray-50">
              <ShoppingBag size={22} className="text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-black rounded-full -top-1 -right-1">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {user ? (
              <div className="relative hidden md:block">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center p-2 space-x-2 transition-colors rounded hover:bg-gray-50"
                >
                  <User size={20} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.full_name || user.email}</span>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-sm shadow-lg">
                      {user.role === 'admin' ? (
                        <>
                          <Link 
                            href="/admin/dashboard"
                            className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <Link 
                            href="/profile"
                            className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <div className="border-t border-gray-200"></div>
                          <button 
                            onClick={handleLogout}
                            className="block w-full px-4 py-3 text-sm text-left text-red-600 transition-colors hover:bg-gray-50"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link 
                            href="/dashboard"
                            className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <Link 
                            href="/orders"
                            className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            My Orders
                          </Link>
                          <Link 
                            href="/profile"
                            className="block px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <div className="border-t border-gray-200"></div>
                          <button 
                            onClick={handleLogout}
                            className="block w-full px-4 py-3 text-sm text-left text-red-600 transition-colors hover:bg-gray-50"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="hidden px-6 py-2 text-sm font-semibold tracking-wide text-black transition-all border border-black rounded-sm md:block hover:bg-black hover:text-white"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-6 border-t border-gray-200 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                PRODUCTS
              </Link>
              <Link 
                href="/about" 
                className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link 
                href="/contact" 
                className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  href="/admin/dashboard" 
                  className="text-sm tracking-wide text-gray-600 transition-colors hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ADMIN
                </Link>
              )}
              
              {user ? (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400">ACCOUNT</p>
                    {user.role === 'admin' ? (
                      <>
                        <Link 
                          href="/admin/dashboard"
                          className="block py-2 text-sm text-gray-700 transition-colors hover:text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          href="/profile"
                          className="block py-2 text-sm text-gray-700 transition-colors hover:text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link 
                          href="/dashboard"
                          className="block py-2 text-sm text-gray-700 transition-colors hover:text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          href="/orders"
                          className="block py-2 text-sm text-gray-700 transition-colors hover:text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <Link 
                          href="/profile"
                          className="block py-2 text-sm text-gray-700 transition-colors hover:text-black"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full py-2 text-sm text-left text-red-600 transition-colors hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="inline-block px-6 py-2 mt-4 text-sm font-semibold tracking-wide text-center text-black transition-all border border-black rounded-sm hover:bg-black hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOGIN
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}