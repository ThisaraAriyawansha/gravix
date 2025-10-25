'use client'

import { useCartStore } from '@/store/cartStore'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Link from 'next/link'

export default function CartPage() {
  const { items, getTotalPrice, getItemCount } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-4 py-32 mx-auto">
          <div className="max-w-md mx-auto text-center animate-fade-in-up">
            <div className="mb-8">
              <svg className="w-16 h-16 mx-auto text-gravix-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="mb-4 text-2xl font-normal tracking-tight uppercase text-gravix-black">Your Cart is Empty</h1>
            <p className="mb-12 text-sm tracking-wide text-gravix-gray-500">Discover our collection</p>
            <Link 
              href="/products" 
              className="inline-block px-12 py-4 text-sm tracking-widest text-white uppercase transition-all duration-300 bg-gravix-black hover:bg-gravix-gray-800"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto ">
        <div className="mb-12 animate-fade-in">
          <h1 className="text-xl font-normal tracking-tight uppercase md:text-2xl lg:text-3xl text-gravix-black">Shopping Cart</h1>          <p className="mt-2 text-sm tracking-wide text-gravix-gray-500">{getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="animate-fade-in-up">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <CartSummary
              itemCount={getItemCount()}
              totalPrice={getTotalPrice()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}