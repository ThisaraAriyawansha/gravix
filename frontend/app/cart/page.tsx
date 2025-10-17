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
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-4">Your Cart is Empty</h1>
            <p className="text-gravix-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
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