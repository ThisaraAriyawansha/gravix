'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import CheckoutForm from '@/components/forms/CheckoutForm'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const handleOrderComplete = (orderData: any) => {
    setOrderNumber(orderData.orderNumber)
    setOrderComplete(true)
    clearCart()
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <h1 className="mb-2 text-lg font-medium text-black">Your cart is empty</h1>
          <a href="/products" className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors">
            Shop Now
          </a>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="max-w-xs text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-black">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mb-2 text-xl font-medium text-black">Order Confirmed!</h1>
          <p className="mb-1 text-xs text-black">Thank you for your purchase</p>
          <p className="mb-3 text-xs text-black">Order #: {orderNumber}</p>
          <div className="flex justify-center gap-2">
            <a href="/orders" className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-800 transition-colors">
              View Orders
            </a>
            <a href="/products" className="inline-block px-4 py-1.5 text-sm font-medium text-black bg-white border border-black hover:bg-gray-200 transition-colors">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-3 py-4 mx-auto">
        <h1 className="mb-4 text-xl font-medium text-black">Checkout</h1>
        
        <div className="grid grid-cols-1 gap-4">
          <CheckoutForm 
            cartItems={items}
            totalAmount={getTotalPrice()}
            onOrderComplete={handleOrderComplete}
          />
        </div>
      </div>
    </div>
  )
}