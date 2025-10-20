'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllProducts, deleteProduct, toggleProductFeatured, toggleProductActive } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  category_id: number
  category_name: string
  is_active: boolean
  is_featured: boolean
  created_at: string
  variants: Array<{
    id: number
    size: string
    color: string
    color_hex?: string
    price: number
    discount_price: number | null
    stock_quantity: number
    images?: any[]
  }>
}

// Custom Alert Component
const CustomAlert = ({ message, onClose, isSuccess, showConfirm = false, onConfirm }: { 
  message: string, 
  onClose: () => void, 
  isSuccess: boolean, 
  showConfirm?: boolean, 
  onConfirm?: () => void 
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
          <div className="flex space-x-2">
            {showConfirm && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-2 py-0.5 bg-gray-200 text-black text-xs rounded-sm hover:bg-gray-300 transition-colors sm:px-3 sm:text-sm"
              >
                Cancel
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showConfirm ? onConfirm : onClose}
              className="px-2 py-0.5 bg-black text-white text-xs rounded-sm hover:bg-gray-800 transition-colors sm:px-3 sm:text-sm"
            >
              {showConfirm ? 'Confirm' : 'OK'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingProduct, setUpdatingProduct] = useState<number | null>(null)
  const [alert, setAlert] = useState<{ show: boolean, message: string, isSuccess: boolean, showConfirm?: boolean, onConfirm?: () => void }>({ show: false, message: '', isSuccess: false })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
      setAlert({ show: true, message: 'Failed to load products', isSuccess: false })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    setAlert({
      show: true,
      message: 'Are you sure you want to delete this product? This will also delete all variants and images.',
      isSuccess: false,
      showConfirm: true,
      onConfirm: async () => {
        setAlert({ show: false, message: '', isSuccess: false })
        setUpdatingProduct(productId)
        try {
          await deleteProduct(productId)
          setAlert({ show: true, message: 'Product deleted successfully!', isSuccess: true })
          setTimeout(() => {
            setAlert({ show: false, message: '', isSuccess: false })
            loadProducts()
          }, 2000)
        } catch (error: any) {
          console.error('Error deleting product:', error)
          setAlert({ show: true, message: error.response?.data?.error || 'Failed to delete product', isSuccess: false })
        } finally {
          setUpdatingProduct(null)
        }
      }
    })
  }

  const handleToggleFeatured = async (productId: number) => {
    setUpdatingProduct(productId)
    try {
      const result = await toggleProductFeatured(productId)
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, is_featured: result.is_featured }
          : product
      ))
      setAlert({ show: true, message: `Product ${result.is_featured ? 'featured' : 'unfeatured'} successfully!`, isSuccess: true })
      setTimeout(() => setAlert({ show: false, message: '', isSuccess: false }), 2000)
    } catch (error: any) {
      console.error('Error updating featured status:', error)
      setAlert({ show: true, message: error.response?.data?.error || 'Failed to update featured status', isSuccess: false })
      loadProducts()
    } finally {
      setUpdatingProduct(null)
    }
  }

  const handleToggleStatus = async (productId: number) => {
    setUpdatingProduct(productId)
    try {
      const result = await toggleProductActive(productId)
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, is_active: result.is_active }
          : product
      ))
      setAlert({ show: true, message: `Product ${result.is_active ? 'activated' : 'deactivated'} successfully!`, isSuccess: true })
      setTimeout(() => setAlert({ show: false, message: '', isSuccess: false }), 2000)
    } catch (error: any) {
      console.error('Error updating product status:', error)
      setAlert({ show: true, message: error.response?.data?.error || 'Failed to update product status', isSuccess: false })
      loadProducts()
    } finally {
      setUpdatingProduct(null)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && product.is_active) ||
      (statusFilter === 'inactive' && !product.is_active)
    
    return matchesSearch && matchesStatus
  })

  const getTotalStock = (variants: any[]) => {
    return variants.reduce((total, variant) => total + (variant.stock_quantity || 0), 0)
  }

  const getPriceRange = (variants: any[]) => {
    if (!variants || variants.length === 0) return '$0'
    const prices = variants.map(v => v.discount_price || v.price).filter(p => p != null)
    if (prices.length === 0) return '$0'
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return min === max ? `$${min}` : `$${min} - $${max}`
  }

  const getPrimaryImage = (variants: any[]) => {
    if (!variants) return null
    for (const variant of variants) {
      if (variant.images && variant.images.length > 0) {
        const primaryImage = variant.images.find((img: any) => img.is_primary)
        if (primaryImage) return primaryImage.image_url
        return variant.images[0].image_url
      }
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
        <div className="animate-pulse">
          <div className="w-1/3 h-6 mb-6 bg-gray-200 rounded sm:h-7"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 bg-white border border-gray-200 rounded-md">
                <div className="h-32 mb-3 bg-gray-200 rounded sm:h-40"></div>
                <div className="h-3 mb-2 bg-gray-200 rounded sm:h-4"></div>
                <div className="w-2/3 h-3 bg-gray-200 rounded sm:h-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center sm:mb-8">
        <div>
          <h1 className="mb-1 text-xl font-light sm:text-2xl">Manage Products</h1>
          <p className="text-xs text-gray-600 sm:text-sm">Create, edit, and manage your product catalog</p>
        </div>
        <Link href="/admin/products/new" className="mt-3 btn-primary text-xs py-1.5 px-3 sm:mt-0 sm:text-sm sm:py-2 sm:px-4">
          Add New Product
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="p-4 mb-4 card sm:p-5 sm:mb-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field text-xs py-1.5 px-3 sm:text-sm sm:py-2 sm:px-4"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field text-xs py-1.5 px-3 sm:text-sm sm:py-2 sm:px-4"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 sm:mt-4">
          <div className="text-xs text-gray-600 sm:text-sm">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="text-xs text-gray-600 sm:text-sm">
            {products.filter(p => p.is_active).length} active • {products.filter(p => !p.is_active).length} inactive
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(product => {
          const primaryImage = getPrimaryImage(product.variants)
          const totalStock = getTotalStock(product.variants)
          const priceRange = getPriceRange(product.variants)
          const isUpdating = updatingProduct === product.id
          
          return (
            <div key={product.id} className="relative p-4 transition-shadow card hover:shadow-md sm:p-5">
              {/* Loading Overlay */}
              {isUpdating && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white rounded-md bg-opacity-70">
                  <div className="w-6 h-6 border-b-2 border-blue-600 rounded-full animate-spin sm:w-7 sm:h-7"></div>
                </div>
              )}

              {/* Product Image */}
              <div className="p-3 sm:p-4">
                {/* Status Overlay */}
                {!product.is_active && (
                  <div className="absolute px-1.5 py-0.5 text-[10px] text-white bg-red-600 rounded top-1 left-1 sm:px-2 sm:text-xs">
                    Inactive
                  </div>
                )}
                {product.is_featured && (
                  <div className="absolute px-1.5 py-0.5 text-[10px] text-white bg-yellow-600 rounded top-1 right-1 sm:px-2 sm:text-xs">
                    Featured
                  </div>
                )}
              </div>

              {/* Product Header */}
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex-1">
                  <h3 className="mb-0.5 text-base font-medium truncate sm:text-lg">{product.name}</h3>
                  <p className="text-xs text-gray-600 sm:text-sm">{product.category_name}</p>
                </div>
                <div className="flex ml-1 space-x-1 sm:ml-2">
                  <button
                    onClick={() => handleToggleFeatured(product.id)}
                    disabled={isUpdating}
                    className={`p-1 rounded transition-colors ${
                      product.is_featured 
                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={product.is_featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(product.id)}
                    disabled={isUpdating}
                    className={`p-1 rounded transition-colors ${
                      product.is_active 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={product.is_active ? 'Deactivate' : 'Activate'}
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {product.is_active ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-3 space-y-1.5 sm:mb-4 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{priceRange}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`font-medium ${
                    totalStock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {totalStock} units
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Variants:</span>
                  <span className="font-medium">{product.variants?.length || 0}</span>
                </div>
              </div>

              {/* Variants Preview */}
              {product.variants.length > 0 && (
                <div className="mb-3 sm:mb-4">
                  <h4 className="mb-1 text-xs font-medium sm:text-sm">Variants Preview:</h4>
                  <div className="space-y-1">
                    {product.variants.slice(0, 2).map(variant => (
                      <div key={variant.id} className="flex justify-between text-[10px] sm:text-xs">
                        <span className="flex items-center space-x-1 sm:space-x-2">
                          <span>{variant.size} - {variant.color}</span>
                          <div 
                            className="w-2 h-2 border border-gray-300 rounded sm:w-3 sm:h-3"
                            style={{ backgroundColor: variant.color_hex || '#ccc' }}
                          ></div>
                        </span>
                        <span>${variant.discount_price || variant.price}</span>
                      </div>
                    ))}
                    {product.variants.length > 2 && (
                      <div className="text-[10px] text-gray-600 sm:text-xs">
                        +{product.variants.length - 2} more variants
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex-1 py-1.5 text-xs text-center btn-secondary sm:text-sm sm:py-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  disabled={isUpdating}
                  className="flex items-center px-3 py-1.5 space-x-1 text-xs text-white transition-colors bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm sm:px-4 sm:py-2"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-8 text-center sm:py-10">
          <div className="mb-3 text-gray-400 sm:mb-4">
            <svg className="w-12 h-12 mx-auto sm:w-14 sm:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="mb-1 text-base font-medium sm:text-lg">No products found</h3>
          <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search terms or filters' 
              : 'Get started by adding your first product'
            }
          </p>
          <Link href="/admin/products/new" className="btn-primary text-xs py-1.5 px-3 sm:text-sm sm:py-2 sm:px-4">
            Add New Product
          </Link>
        </div>
      )}

      {/* Alert Component */}
      <AnimatePresence>
        {alert.show && (
          <CustomAlert 
            message={alert.message}
            isSuccess={alert.isSuccess}
            showConfirm={alert.showConfirm}
            onConfirm={alert.onConfirm}
            onClose={() => setAlert({ show: false, message: '', isSuccess: false })}
          />
        )}
      </AnimatePresence>
    </div>
  )
}