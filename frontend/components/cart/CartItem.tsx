'use client'

import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'

interface CartItem {
  id: number
  product_variant_id: number
  quantity: number
  size: string
  color: string
  price: number
  discount_price: number | null
  product_name: string
  product_slug: string
  image: string
}

interface CartItemProps {
  item: CartItem
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  const displayPrice = item.discount_price || item.price
  const hasDiscount = item.discount_price !== null
  const totalPrice = displayPrice * item.quantity

  return (
    <div className="flex flex-col items-start gap-2 p-2 transition-colors duration-200 bg-white border-b border-gray-200 sm:flex-row sm:items-center hover:bg-gray-50">
      {/* Product Image */}
      <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-md">
        {item.image ? (
          <Image
            src={`http://localhost:5000${item.image}`}
            alt={item.product_name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="mb-0.5 text-sm font-semibold text-gray-900 truncate">
          {item.product_name}
        </h3>
        <p className="mb-1 text-xs text-gray-600">
          <span className="font-medium">Size:</span> {item.size} 
          <span className="mx-1">•</span>
          <span className="font-medium">Color:</span> {item.color}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-sm font-semibold text-gray-900">
            ${displayPrice}
          </p>
          {hasDiscount && (
            <p className="text-xs text-gray-500 line-through">
              ${item.price}
            </p>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between w-full gap-2 sm:w-auto sm:justify-start">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="flex items-center justify-center w-8 h-8 text-gray-700 transition-colors duration-200 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <span className="text-lg leading-none">−</span>
          </button>
          
          <span className="flex items-center justify-center w-10 h-8 text-sm font-medium text-gray-900 bg-gray-50">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="flex items-center justify-center w-8 h-8 text-gray-700 transition-colors duration-200 rounded-r-md hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right sm:min-w-[4rem]">
          <p className="text-sm font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-1 text-gray-400 transition-all duration-200 rounded-md hover:bg-red-50 hover:text-red-600"
          title="Remove item"
          aria-label="Remove item from cart"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}