'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ProductForm from '../../../../../../components/forms/ProductForm'
import { getProduct, updateProduct, createProductVariant, updateProductVariant } from '@/lib/api'

interface ProductFormData {
  name: string
  description: string
  category_id: number
  is_featured: boolean
  is_active: boolean
}

interface VariantFormData {
  id?: number
  size: string
  color: string
  color_hex: string
  price: number
  discount_price: number
  stock_quantity: number
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    try {
      const productData = await getProduct(productId)
      setProduct(productData)
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Product not found')
      router.push('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (productData: ProductFormData, variants: VariantFormData[]) => {
    setSaving(true)
    
    try {
      // Update the main product
      await updateProduct(parseInt(productId), productData)

      // Update or create variants
      for (const variant of variants) {
        if (variant.id) {
          // Update existing variant
          await updateProductVariant(variant.id, variant)
        } else {
          // Create new variant
          await createProductVariant({
            product_id: parseInt(productId),
            ...variant
          })
        }
      }

      alert('Product updated successfully!')
      router.push('/admin/products')
    } catch (error: any) {
      console.error('Error updating product:', error)
      alert(error.response?.data?.error || 'Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product not found</h1>
          <button onClick={() => router.push('/admin/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const initialData = {
    name: product.name,
    description: product.description,
    category_id: product.category_id,
    is_featured: product.is_featured,
    is_active: product.is_active
  }

  const initialVariants = product.variants.map((variant: any) => ({
    id: variant.id,
    size: variant.size,
    color: variant.color,
    color_hex: variant.color_hex,
    price: variant.price,
    discount_price: variant.discount_price || 0,
    stock_quantity: variant.stock_quantity
  }))

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light mb-2">Edit Product</h1>
              <p className="text-gray-600">Update product details and variants</p>
            </div>
            <button
              onClick={() => router.push('/admin/products')}
              className="btn-secondary"
            >
              Back to Products
            </button>
          </div>

          <ProductForm 
            initialData={initialData}
            initialVariants={initialVariants}
            onSubmit={handleSubmit}
            loading={saving}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  )
}