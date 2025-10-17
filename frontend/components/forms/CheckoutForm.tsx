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
    // Shipping Address
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    
    // Payment
    paymentMethod: 'card',
    
    // Card Details
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <div className="card p-6">
        <h2 className="text-xl font-light mb-6">Shipping Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="input-field"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="card p-6">
        <h2 className="text-xl font-light mb-6">Payment Method</h2>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
              className="mr-3"
            />
            <span>Credit/Debit Card</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={handleChange}
              className="mr-3"
            />
            <span>PayPal</span>
          </label>
        </div>

        {/* Card Details */}
        {formData.paymentMethod === 'card' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-2">
                Name on Card *
              </label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                required
                value={formData.nameOnCard}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="input-field"
              />
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-light mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{totalAmount > 100 ? 'FREE' : '$10.00'}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${(totalAmount * 0.08).toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gravix-gray-200 pt-3">
            <div className="flex justify-between font-medium text-lg">
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
          className="btn-primary w-full py-4 disabled:bg-gravix-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Complete Order - $${(
            totalAmount + 
            (totalAmount > 100 ? 0 : 10) + 
            (totalAmount * 0.08)
          ).toFixed(2)}`}
        </button>
        
        <p className="text-xs text-gravix-gray-500 text-center mt-4">
          By completing your purchase, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </form>
  )
}