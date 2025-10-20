'use client'

import { useState } from 'react'
import { createOrder } from '@/lib/api'

interface CartItem {
  id: number
  product_variant_id: number
  quantity: number
  size: string
  color: string
  price: number
  discount_price: number | null
  product_name: string
}

interface CheckoutFormProps {
  cartItems: CartItem[]
  totalAmount: number
  onOrderComplete: (orderData: any) => void
}

export default function CheckoutForm({ cartItems, totalAmount, onOrderComplete }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      }

      const orderData = {
        shipping_address: shippingAddress,
        payment_method: formData.paymentMethod,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_phone: formData.phone,
        customer_email: formData.email
      }

      const result = await createOrder(orderData)
      onOrderComplete(result)
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.response?.data?.error || 'Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
      {/* Shipping Information */}
      <div className="p-4 bg-white border border-gray-300">
        <h2 className="mb-3 text-base font-medium text-black">Shipping Information</h2>
        
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block mb-1 text-xs font-medium text-black">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block mb-1 text-xs font-medium text-black">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1 text-xs font-medium text-black">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block mb-1 text-xs font-medium text-black">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block mb-1 text-xs font-medium text-black">
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block mb-1 text-xs font-medium text-black">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block mb-1 text-xs font-medium text-black">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block mb-1 text-xs font-medium text-black">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block mb-1 text-xs font-medium text-black">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your country"
            />
          </div>

        </div>
      </div>

      {/* Payment Method */}
      <div className="p-4 bg-white border border-gray-300">
        <h2 className="mb-3 text-base font-medium text-black">Payment Method</h2>
        
        <div className="space-y-2">
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>PayPal</span>
          </label>
        </div>

        {/* Card Details */}
        {formData.paymentMethod === 'card' && (
          <div className="grid grid-cols-1 gap-3 mt-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="nameOnCard" className="block mb-1 text-xs font-medium text-black">
                Name on Card *
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                required
                value={formData.nameOnCard}
                onChange={handleChange}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="cardNumber" className="block mb-1 text-xs font-medium text-black">
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div>
              <label htmlFor="expiryDate" className="block mb-1 text-xs font-medium text-black">
                Expiry Date *
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                required
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            <div>
              <label htmlFor="cvv" className="block mb-1 text-xs font-medium text-black">
                CVV *
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                required
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="p-4 bg-white border border-gray-300 lg:col-span-2">
        <h2 className="mb-2 text-base font-medium text-black">Order Summary</h2>
        
        <div className="mb-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-xs">
            <span>Shipping</span>
            <span>{totalAmount > 100 ? 'FREE' : '$10.00'}</span>
          </div>
          
          <div className="flex justify-between text-xs">
            <span>Tax</span>
            <span>${(totalAmount * 0.08).toFixed(2)}</span>
          </div>
          
          <div className="pt-2 border-t border-gray-300">
            <div className="flex justify-between text-sm font-medium">
              <span>Total</span>
              <span>
                ${(totalAmount + (totalAmount > 100 ? 0 : 10) + (totalAmount * 0.08)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-3 py-2 text-sm font-medium text-white transition-colors bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Complete Order - $${(
            totalAmount + 
            (totalAmount > 100 ? 0 : 10) + 
            (totalAmount * 0.08)
          ).toFixed(2)}`}
        </button>
        
        <p className="mt-2 text-xs text-center text-black">
          By completing your purchase, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </form>
  )
}