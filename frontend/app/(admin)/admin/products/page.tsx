'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/api'
import ProductTable from '@/components/admin/ProductTable'
import Link from 'next/link'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">Manage Products</h1>
          <Link href="/admin/products/new" className="btn-primary">
            Add New Product
          </Link>
        </div>

        <ProductTable 
          products={products} 
          loading={loading}
          onProductUpdate={loadProducts}
        />
      </div>
    </div>
  )
}