'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ProductForm from '@/components/forms/ProductForm'
import { getProductById, updateProduct, createProductVariant, updateProductVariant, deleteProductVariant } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

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
  images?: any[]
}

// Custom Alert Component
const CustomAlert = ({ message, onClose, isSuccess }: { 
  message: string, 
  onClose: () => void, 
  isSuccess: boolean 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white p-3 rounded-md shadow-sm border border-gray-100 max-w-[240px] w-full sm:max-w-[280px]"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={`w-6 h-6 ${isSuccess ? 'bg-black' : 'bg-gray-600'} rounded-full flex items-center justify-center mb-2`}
          >
            {isSuccess ? (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.div>
          <p className="mb-3 text-xs font-light text-center text-black sm:text-sm">{message}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-2 py-0.5 bg-black text-white text-xs rounded-sm hover:bg-gray-800 transition-colors sm:px-3 sm:text-sm"
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState<{ show: boolean, message: string, isSuccess: boolean }>({ show: false, message: '', isSuccess: false })

  useEffect(() => {
    if (productId) {
      loadProduct()
    }
  }, [productId])

  const loadProduct = async () => {
    try {
      const productData = await getProductById(parseInt(productId))
      setProduct(productData)
    } catch (error: any) {
      console.error('Error loading product:', error)
      setAlert({ show: true, message: error.response?.data?.error || 'Product not found', isSuccess: false })
      setTimeout(() => {
        setAlert({ show: false, message: '', isSuccess: false })
        //router.push('/admin/products')
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (productData: ProductFormData, variants: VariantFormData[]) => {
    setSaving(true)
    
    try {
      // Update the main product
      await updateProduct(parseInt(productId), productData)

      // Handle variants
      for (const variant of variants) {
        if (variant.id) {
          // Update existing variant
          await updateProductVariant(variant.id, {
            size: variant.size,
            color: variant.color,
            color_hex: variant.color_hex,
            price: variant.price,
            discount_price: variant.discount_price > 0 ? variant.discount_price : null,
            stock_quantity: variant.stock_quantity
          })
        } else {
          // Create new variant
          await createProductVariant({
            product_id: parseInt(productId),
            size: variant.size,
            color: variant.color,
            color_hex: variant.color_hex,
            price: variant.price,
            discount_price: variant.discount_price > 0 ? variant.discount_price : null,
            stock_quantity: variant.stock_quantity
          })
        }
      }

      setAlert({ show: true, message: 'Product updated successfully!', isSuccess: true })
      setTimeout(() => {
        setAlert({ show: false, message: '', isSuccess: false })
        //router.push('/admin/products')
      }, 2000)
    } catch (error: any) {
      console.error('Error updating product:', error)
      setAlert({ show: true, message: error.response?.data?.error || 'Failed to update product', isSuccess: false })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="w-1/3 h-6 mb-6 bg-gray-200 rounded sm:h-7"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded sm:h-4"></div>
              <div className="w-2/3 h-3 bg-gray-200 rounded sm:h-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="text-center">
          <h1 className="mb-3 text-xl font-light sm:text-2xl sm:mb-4">Product not found</h1>
          <button onClick={() => router.push('/admin/products')} className="btn-primary text-xs py-1.5 px-3 sm:text-sm sm:py-2 sm:px-4">
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  const initialData: ProductFormData = {
    name: product.name,
    description: product.description,
    category_id: product.category_id,
    is_featured: product.is_featured,
    is_active: product.is_active
  }

  const initialVariants: VariantFormData[] = product.variants.map((variant: any) => ({
    id: variant.id,
    size: variant.size,
    color: variant.color,
    color_hex: variant.color_hex,
    price: variant.price,
    discount_price: variant.discount_price || 0,
    stock_quantity: variant.stock_quantity,
    images: variant.images || []
  }))

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="mb-1 text-xl font-light sm:text-2xl sm:mb-2">Edit Product</h1>
            <p className="text-xs text-gray-600 sm:text-sm">Update product details and variants</p>
          </div>
          <button
            onClick={() => router.push('/admin/products')}
            className="btn-secondary text-xs py-1.5 px-3 sm:text-sm sm:py-2 sm:px-4"
          >
            Back to Products
          </button>
        </div>

        <ProductForm 
          initialData={initialData}
          initialVariants={initialVariants}
          onSubmit={handleSubmit as any}
          loading={saving}
          isEdit={true}
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
  )
}