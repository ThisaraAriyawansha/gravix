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
  const totalPrice = displayPrice * item.quantity

  return (
    <div className="flex items-center space-x-4 p-4 border border-gravix-gray-200">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gravix-gray-100 flex-shrink-0">
        {item.image && (
          <Image
            src={item.image}
            alt={item.product_name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-lg mb-1 truncate">
          {item.product_name}
        </h3>
        <p className="text-gravix-gray-600 text-sm mb-2">
          {item.size} • {item.color}
        </p>
        <p className="font-medium">${displayPrice}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 border border-gravix-gray-300 flex items-center justify-center hover:border-gravix-black transition-colors"
        >
          <span className="text-lg">-</span>
        </button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 border border-gravix-gray-300 flex items-center justify-center hover:border-gravix-black transition-colors"
        >
          <span className="text-lg">+</span>
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-20">
        <p className="font-medium">${totalPrice.toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-gravix-gray-400 hover:text-red-600 transition-colors p-2"
        title="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}