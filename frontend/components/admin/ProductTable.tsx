'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  slug: string
  category_name: string
  is_active: boolean
  is_featured: boolean
  created_at: string
  variants: Array<{
    price: number
    discount_price: number | null
    stock_quantity: number
  }>
}

interface ProductTableProps {
  products: Product[]
  loading: boolean
  onProductUpdate: () => void
}

export default function ProductTable({ products, loading, onProductUpdate }: ProductTableProps) {
  const [editingProduct, setEditingProduct] = useState<number | null>(null)

  const toggleFeatured = async (productId: number, currentStatus: boolean) => {
    // Implement API call to toggle featured status
    console.log('Toggle featured:', productId, !currentStatus)
    onProductUpdate()
  }

  const toggleActive = async (productId: number, currentStatus: boolean) => {
    // Implement API call to toggle active status
    console.log('Toggle active:', productId, !currentStatus)
    onProductUpdate()
  }

  const deleteProduct = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // Implement API call to delete product
      console.log('Delete product:', productId)
      onProductUpdate()
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="p-6 border-b border-gravix-gray-200">
          <div className="h-6 bg-gravix-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 animate-pulse">
              <div className="h-4 bg-gravix-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gravix-gray-200 rounded w-1/6"></div>
              <div className="h-4 bg-gravix-gray-200 rounded w-1/6"></div>
              <div className="h-8 bg-gravix-gray-200 rounded w-1/5"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="p-6 border-b border-gravix-gray-200">
        <h2 className="text-xl font-light">Products ({products.length})</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gravix-gray-200">
              <th className="text-left p-4 font-medium">Product</th>
              <th className="text-left p-4 font-medium">Category</th>
              <th className="text-left p-4 font-medium">Price</th>
              <th className="text-left p-4 font-medium">Stock</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const primaryVariant = product.variants[0]
              const displayPrice = primaryVariant.discount_price || primaryVariant.price
              const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock_quantity, 0)
              
              return (
                <tr key={product.id} className="border-b border-gravix-gray-100 hover:bg-gravix-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gravix-gray-600">{product.slug}</div>
                    </div>
                  </td>
                  <td className="p-4">{product.category_name}</td>
                  <td className="p-4">${displayPrice}</td>
                  <td className="p-4">
                    <span className={totalStock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {totalStock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        product.is_active ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span>{product.is_active ? 'Active' : 'Inactive'}</span>
                      {product.is_featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </Link>
                      
                      <button
                        onClick={() => toggleFeatured(product.id, product.is_featured)}
                        className={`text-sm ${
                          product.is_featured 
                            ? 'text-yellow-600 hover:text-yellow-800' 
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        {product.is_featured ? 'Unfeature' : 'Feature'}
                      </button>
                      
                      <button
                        onClick={() => toggleActive(product.id, product.is_active)}
                        className={`text-sm ${
                          product.is_active 
                            ? 'text-red-600 hover:text-red-800' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                      >
                        {product.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="p-8 text-center text-gravix-gray-500">
          No products found. <Link href="/admin/products/new" className="text-blue-600 hover:underline">Create the first product</Link>.
        </div>
      )}
    </div>
  )
}