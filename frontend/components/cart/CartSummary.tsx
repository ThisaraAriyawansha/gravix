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
    <div className="sticky top-8 animate-fade-in-up">
      <div className="p-8 border border-gravix-gray-200">
        <h2 className="mb-8 text-lg font-normal tracking-tight uppercase text-gravix-black">
          Summary
        </h2>
        
        <div className="mb-8 space-y-4">
          <div className="flex justify-between text-sm text-gravix-gray-600">
            <span className="text-xs tracking-wider uppercase">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            <span className="text-gravix-black">${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gravix-gray-600">
            <span className="text-xs tracking-wider uppercase">Shipping</span>
            <span className="text-gravix-black">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gravix-gray-600">
            <span className="text-xs tracking-wider uppercase">Tax</span>
            <span className="text-gravix-black">${tax.toFixed(2)}</span>
          </div>
          
          <div className="pt-4 mt-6 border-t border-gravix-gray-200">
            <div className="flex justify-between">
              <span className="text-sm tracking-wider uppercase text-gravix-black">Total</span>
              <span className="text-lg font-normal text-gravix-black">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {totalPrice > 0 && (
          <>
            {totalPrice < 100 && (
              <div className="px-4 py-3 mb-6 text-xs tracking-wide text-center border bg-gravix-gray-50 text-gravix-gray-600 border-gravix-gray-200">
                Add ${(100 - totalPrice).toFixed(2)} for free shipping
              </div>
            )}
            
            <Link 
              href="/checkout" 
              className="block w-full py-4 mb-4 text-sm tracking-widest text-center text-white uppercase transition-all duration-300 bg-gravix-black hover:bg-gravix-gray-800"
            >
              Checkout
            </Link>
          </>
        )}
        
        <Link 
          href="/products" 
          className="block w-full py-4 text-sm tracking-widest text-center uppercase transition-all duration-300 border border-gravix-black text-gravix-black hover:bg-gravix-black hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}