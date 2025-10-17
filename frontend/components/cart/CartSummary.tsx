'use client'

import Link from 'next/link'

interface CartSummaryProps {
  itemCount: number
  totalPrice: number
}

export default function CartSummary({ itemCount, totalPrice }: CartSummaryProps) {
  const shipping = totalPrice > 100 ? 0 : 10
  const tax = totalPrice * 0.08 // 8% tax
  const finalTotal = totalPrice + shipping + tax

  return (
    <div className="card p-6 sticky top-8">
      <h2 className="text-xl font-light mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gravix-gray-200 pt-3">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {totalPrice > 0 && (
        <>
          {totalPrice < 100 && (
            <div className="bg-gravix-gray-50 p-3 text-sm text-center mb-4">
              Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
            </div>
          )}
          
          <Link href="/checkout" className="btn-primary w-full block text-center mb-3">
            Proceed to Checkout
          </Link>
        </>
      )}
      
      <Link href="/products" className="btn-secondary w-full block text-center">
        Continue Shopping
      </Link>
    </div>
  )
}