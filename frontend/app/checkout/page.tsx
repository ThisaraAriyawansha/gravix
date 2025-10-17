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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
          <a href="/products" className="btn-primary">Shop Now</a>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-light mb-4">Order Confirmed!</h1>
          <p className="text-gravix-gray-600 mb-2">Thank you for your purchase</p>
          <p className="text-gravix-gray-600 mb-6">Order #: {orderNumber}</p>
          <div className="space-x-4">
            <a href="/orders" className="btn-primary">View Orders</a>
            <a href="/products" className="btn-secondary">Continue Shopping</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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