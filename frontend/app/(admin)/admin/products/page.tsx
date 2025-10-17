'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAllProducts, deleteProduct, updateProduct } from '@/lib/api'

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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product? This will also delete all variants and images.')) {
      try {
        await deleteProduct(productId)
        loadProducts() // Refresh the list
      } catch (error: any) {
        console.error('Error deleting product:', error)
        alert(error.response?.data?.error || 'Failed to delete product')
      }
    }
  }

  const handleToggleStatus = async (productId: number, currentStatus: boolean) => {
    try {
      await updateProduct(productId, { is_active: !currentStatus })
      loadProducts() // Refresh the list
    } catch (error: any) {
      console.error('Error updating product status:', error)
      alert(error.response?.data?.error || 'Failed to update product status')
    }
  }

  const handleToggleFeatured = async (productId: number, currentFeatured: boolean) => {
    try {
      await updateProduct(productId, { is_featured: !currentFeatured })
      loadProducts() // Refresh the list
    } catch (error: any) {
      console.error('Error updating featured status:', error)
      alert(error.response?.data?.error || 'Failed to update featured status')
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
    return variants.reduce((total, variant) => total + variant.stock_quantity, 0)
  }

  const getPriceRange = (variants: any[]) => {
    if (variants.length === 0) return '$0'
    const prices = variants.map(v => v.discount_price || v.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return min === max ? `$${min}` : `$${min} - $${max}`
  }

  const getPrimaryImage = (variants: any[]) => {
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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="h-48 bg-gray-200 mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-light mb-2">Manage Products</h1>
          <p className="text-gray-600">Create, edit, and manage your product catalog</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary mt-4 md:mt-0">
          Add New Product
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="text-sm text-gray-600">
            {products.filter(p => p.is_active).length} active • {products.filter(p => !p.is_active).length} inactive
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const primaryImage = getPrimaryImage(product.variants)
          const totalStock = getTotalStock(product.variants)
          const priceRange = getPriceRange(product.variants)
          
          return (
            <div key={product.id} className="card p-6 hover:shadow-lg transition-shadow">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {primaryImage ? (
                  <img
                    src={`http://localhost:5000${primaryImage}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Status Overlay */}
                {!product.is_active && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                    Inactive
                  </div>
                )}
                {product.is_featured && (
                  <div className="absolute top-2 right-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                    Featured
                  </div>
                )}
              </div>

              {/* Product Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category_name}</p>
                </div>
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => handleToggleFeatured(product.id, product.is_featured)}
                    className={`p-1.5 rounded ${
                      product.is_featured 
                        ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors`}
                    title={product.is_featured ? 'Remove from featured' : 'Mark as featured'}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleToggleStatus(product.id, product.is_active)}
                    className={`p-1.5 rounded ${
                      product.is_active 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    } transition-colors`}
                    title={product.is_active ? 'Deactivate' : 'Activate'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{priceRange}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`font-medium ${
                    totalStock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {totalStock} units
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Variants:</span>
                  <span className="font-medium">{product.variants.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    product.is_active ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Variants Preview */}
              {product.variants.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Variants Preview:</h4>
                  <div className="space-y-1">
                    {product.variants.slice(0, 2).map(variant => (
                      <div key={variant.id} className="flex justify-between text-xs">
                        <span className="flex items-center space-x-2">
                          <span>{variant.size} - {variant.color}</span>
                          <div 
                            className="w-3 h-3 border border-gray-300 rounded"
                            style={{ backgroundColor: variant.color_hex || '#ccc' }}
                          ></div>
                        </span>
                        <span>${variant.discount_price || variant.price}</span>
                      </div>
                    ))}
                    {product.variants.length > 2 && (
                      <div className="text-xs text-gray-600">
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
                  className="btn-secondary flex-1 text-center text-sm py-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition-colors flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search terms or filters' 
              : 'Get started by adding your first product'
            }
          </p>
          <Link href="/admin/products/new" className="btn-primary">
            Add New Product
          </Link>
        </div>
      )}
    </div>
  )
}