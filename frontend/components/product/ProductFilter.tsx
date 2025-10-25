'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface Filters {
  category: string
  search: string
  sort: string
  priceRange: string
}

interface ProductFilterProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

export default function ProductFilter({ filters, onFilterChange }: ProductFilterProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' }
  ]

  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-', label: 'Over $100' }
  ]

  useEffect(() => {
    const urlCategory = searchParams.get('category') ?? ''
    const urlSearch = searchParams.get('search') ?? ''
    const urlSort = searchParams.get('sort') ?? 'newest'
    const urlPriceRange = searchParams.get('priceRange') ?? ''

    const updatedFilters: Partial<Filters> = {}

    if (urlCategory !== filters.category) updatedFilters.category = urlCategory
    if (urlSearch !== filters.search) updatedFilters.search = urlSearch
    if (urlSort !== filters.sort) updatedFilters.sort = urlSort
    if (urlPriceRange !== filters.priceRange) updatedFilters.priceRange = urlPriceRange

    if (Object.keys(updatedFilters).length > 0) {
      onFilterChange(updatedFilters)
    }
  }, [searchParams, filters, onFilterChange])

  const updateUrl = (newFilters: Partial<Filters>) => {
    const current = {
      category: filters.category,
      search: filters.search,
      sort: filters.sort,
      priceRange: filters.priceRange,
      ...newFilters,
    }

    const params = new URLSearchParams()

    if (current.category) params.set('category', current.category)
    if (current.search) params.set('search', current.search)
    if (current.sort && current.sort !== 'newest') params.set('sort', current.sort)
    if (current.priceRange) params.set('priceRange', current.priceRange)

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`)
  }

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    onFilterChange(newFilters)
    updateUrl(newFilters)
  }

  const clearFilters = () => {
    onFilterChange({
      category: '',
      search: '',
      sort: 'newest',
      priceRange: ''
    })
    router.push(pathname)
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Search */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        <input
          type="text"
          id="search"
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          placeholder="Search products..."
          className="w-full px-0 py-3 text-sm tracking-wide uppercase transition-all duration-300 bg-transparent border-b border-black placeholder:text-gray-400 focus:outline-none focus:border-gray-600 focus:placeholder:translate-x-1"
        />
      </div>

      {/* Category Filter */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
        <h3 className="mb-4 text-xs tracking-widest text-gray-500 uppercase">Category</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <label key={category.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={filters.category === category.value}
                onChange={(e) => handleFilterChange({ category: e.target.value })}
                className="hidden"
              />
              <span className={`text-sm transition-all duration-300 relative ${
                filters.category === category.value 
                  ? 'text-black font-medium translate-x-1' 
                  : 'text-gray-500 group-hover:text-black group-hover:translate-x-1'
              }`}>
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        <h3 className="mb-4 text-xs tracking-widest text-gray-500 uppercase">Sort By</h3>
        <div className="space-y-3">
          {sortOptions.map(option => (
            <label key={option.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={filters.sort === option.value}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                className="hidden"
              />
              <span className={`text-sm transition-all duration-300 ${
                filters.sort === option.value 
                  ? 'text-black font-medium translate-x-1' 
                  : 'text-gray-500 group-hover:text-black group-hover:translate-x-1'
              }`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        <h3 className="mb-4 text-xs tracking-widest text-gray-500 uppercase">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map(range => (
            <label key={range.value} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="price"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => handleFilterChange({ priceRange: e.target.value })}
                className="hidden"
              />
              <span className={`text-sm transition-all duration-300 ${
                filters.priceRange === range.value 
                  ? 'text-black font-medium translate-x-1' 
                  : 'text-gray-500 group-hover:text-black group-hover:translate-x-1'
              }`}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-3 text-xs tracking-widest uppercase transition-all duration-300 border border-black opacity-0 hover:bg-black hover:text-white animate-fade-in-up"
        style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
      >
        Clear Filters
      </button>
    </div>
  )
}