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

  // Log the image path to the console
  console.log('Image path:', item.image)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
  }

  const displayPrice = item.discount_price || item.price
  const totalPrice = displayPrice * item.quantity

  return (
    <div className="flex flex-col items-start p-4 space-y-4 border md:flex-row md:items-center md:space-y-0 md:space-x-4 border-gravix-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gravix-gray-100">
        {item.image && (
          <Image
            src={`http://localhost:5000${item.image}`}
            alt={item.product_name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="mb-1 text-base font-medium truncate md:text-lg">
          {item.product_name}
        </h3>
        <p className="mb-2 text-xs md:text-sm text-gravix-gray-600">
          {item.size} • {item.color}
        </p>
        <p className="text-sm font-medium md:text-base">${displayPrice}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="flex items-center justify-center w-8 h-8 text-sm transition-colors border md:text-lg border-gravix-gray-300 hover:border-gravix-black"
        >
          <span>-</span>
        </button>
        
        <span className="w-8 text-sm text-center md:text-base">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="flex items-center justify-center w-8 h-8 text-sm transition-colors border md:text-lg border-gravix-gray-300 hover:border-gravix-black"
        >
          <span>+</span>
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-16 md:min-w-20">
        <p className="text-sm font-medium md:text-base">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 transition-colors text-gravix-gray-400 hover:text-red-600"
        title="Remove item"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}