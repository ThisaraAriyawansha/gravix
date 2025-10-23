'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'
import { getProducts } from '@/lib/api'
import { useSearchParams } from 'next/navigation'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  category_name: string
  variants: any[]
}

export default function ProductsPage() {
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Initialize filters from URL on mount
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams.toString())
    return {
      category: params.get('category') || '',
      search: params.get('search') || '',
      sort: params.get('sort') || 'newest',
      priceRange: params.get('priceRange') || ''
    }
  })

  // Load products whenever filters change
  useEffect(() => {
    loadProducts()
  }, [filters])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts(filters)
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <ProductFilter filters={filters} onFilterChange={updateFilters} />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-light">All Products</h1>
              <div className="text-gray-500">
                {products.length} products
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="mb-4 bg-gray-200 rounded aspect-square"></div>
                    <div className="h-4 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}