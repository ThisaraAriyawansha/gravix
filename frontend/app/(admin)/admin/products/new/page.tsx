'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '../../../../../components/forms/ProductForm'
import { createProduct, createProductVariant } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductFormData {
  name: string
  description: string
  category_id: number
  is_featured: boolean
}

interface VariantFormData {
  size: string
  color: string
  color_hex: string
  price: number
  discount_price: number
  stock_quantity: number
}

// Custom Alert Component
const CustomAlert = ({ message, onClose, isSuccess }: { message: string, onClose: () => void, isSuccess: boolean }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-full max-w-xs p-4 bg-white border border-gray-100 rounded-md shadow-md"
      >
        <div className="flex flex-col items-center">
          {/* Checkmark or Error Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`w-8 h-8 ${isSuccess ? 'bg-black' : 'bg-gray-600'} rounded-full flex items-center justify-center mb-3`}
          >
            {isSuccess ? (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.div>
          <p className="mb-4 text-sm font-light text-center text-black">{message}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-3 py-1 text-sm text-white transition-colors bg-black rounded-sm hover:bg-gray-800"
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{ show: boolean, message: string, isSuccess: boolean }>({ show: false, message: '', isSuccess: false })

  const handleSubmit = async (productData: ProductFormData, variants: VariantFormData[]) => {
    setLoading(true)
    
    try {
      // Create the main product
      const productResult = await createProduct(productData)
      const productId = productResult.id

      // Create variants for the product
      for (const variant of variants) {
        await createProductVariant({
          product_id: productId,
          ...variant
        })
      }

      setAlert({ show: true, message: 'Product created successfully!', isSuccess: true })
      setTimeout(() => {
        setAlert({ show: false, message: '', isSuccess: false })
        router.push('/admin/products')
      }, 3000)
    } catch (error: any) {
      console.error('Error creating product:', error)
      setAlert({ show: true, message: error.response?.data?.error || 'Failed to create product', isSuccess: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start justify-between mb-4 sm:flex-row sm:items-center sm:mb-6">
            <div>
              <h1 className="mb-1 text-xl font-light sm:text-2xl">Add New Product</h1>
              <p className="text-sm text-gray-600">Create a new product with multiple variants</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 mt-2 text-sm btn-secondary sm:mt-0"
            >
              Back to Products
            </button>
          </div>

          <ProductForm 
            onSubmit={handleSubmit}
            loading={loading}
          />

          <AnimatePresence>
            {alert.show && (
              <CustomAlert 
                message={alert.message}
                isSuccess={alert.isSuccess}
                onClose={() => setAlert({ show: false, message: '', isSuccess: false })}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}