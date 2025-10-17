'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '../../../../../components/forms/ProductForm'
import { createProduct, createProductVariant } from '@/lib/api'

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

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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

      alert('Product created successfully!')
      router.push('/admin/products')
    } catch (error: any) {
      console.error('Error creating product:', error)
      alert(error.response?.data?.error || 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light mb-2">Add New Product</h1>
              <p className="text-gray-600">Create a new product with multiple variants</p>
            </div>
            <button
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Back to Products
            </button>
          </div>

          <ProductForm 
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}