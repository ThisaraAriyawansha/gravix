import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-white bg-gravix-black">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-2xl font-light font-kugile">GRAVIX</h3>
            <p className="text-gravix-gray-400">
              Minimalist clothing for modern living. Quality crafted for everyday wear.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-lg font-medium">Shop</h4>
            <ul className="space-y-2 text-gravix-gray-400">
              <li><Link href="/products" className="transition-colors hover:text-white">All Products</Link></li>
              <li><Link href="/products?category=men" className="transition-colors hover:text-white">Men</Link></li>
              <li><Link href="/products?category=women" className="transition-colors hover:text-white">Women</Link></li>
              <li><Link href="/products?category=kids" className="transition-colors hover:text-white">Kids</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-lg font-medium">Support</h4>
            <ul className="space-y-2 text-gravix-gray-400">
              <li><Link href="/contact" className="transition-colors hover:text-white">Contact Us</Link></li>
              <li><Link href="/shipping" className="transition-colors hover:text-white">Shipping Info</Link></li>
              <li><Link href="/returns" className="transition-colors hover:text-white">Returns</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-lg font-medium">Company</h4>
            <ul className="space-y-2 text-gravix-gray-400">
              <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
              <li><Link href="/careers" className="transition-colors hover:text-white">Careers</Link></li>
              <li><Link href="/sustainability" className="transition-colors hover:text-white">Sustainability</Link></li>
              <li><Link href="/press" className="transition-colors hover:text-white">Press</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gravix-gray-800 md:flex-row">
          <p className="text-sm text-gravix-gray-400">
            © 2024 GRAVIX. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <a href="#" className="transition-colors text-gravix-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="transition-colors text-gravix-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.765 3.79 13.5 3.79 12.193c0-1.308.43-2.547 1.336-3.444.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.906.897 1.336 2.136 1.336 3.444s-.43 2.572-1.336 3.498c-.875.807-2.026 1.297-3.323 1.297z"/>
              </svg>
            </a>
            <a href="#" className="transition-colors text-gravix-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.543l-.047-.02z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}