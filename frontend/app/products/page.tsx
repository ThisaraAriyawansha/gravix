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
  
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams.toString())
    return {
      category: params.get('category') || '',
      search: params.get('search') || '',
      sort: params.get('sort') || 'newest',
      priceRange: params.get('priceRange') || ''
    }
  })

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
      <div className="container px-6 py-12 mx-auto lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-8">
              <ProductFilter filters={filters} onFilterChange={updateFilters} />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-end justify-between pb-6 mb-10 border-b border-gray-200 opacity-0 animate-fade-in-up">
              <h1 className="text-2xl font-light tracking-wider uppercase">Products</h1>
              <div className="text-xs tracking-wider text-gray-500 uppercase transition-all duration-300">
                {products.length} {products.length === 1 ? 'Item' : 'Items'}
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="opacity-0 animate-fade-in-up"
                    style={{ 
                      animationDelay: `${i * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="mb-4 bg-gray-100 aspect-square animate-pulse"></div>
                    <div className="h-3 mb-2 bg-gray-100 animate-pulse"></div>
                    <div className="w-1/2 h-3 bg-gray-100 animate-pulse"></div>
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