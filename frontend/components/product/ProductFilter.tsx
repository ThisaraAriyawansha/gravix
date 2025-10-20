'use client'

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

  const handlePriceRangeChange = (value: string) => {
    onFilterChange({ priceRange: value })
  }

  const clearFilters = () => {
    onFilterChange({ 
      category: '', 
      search: '', 
      sort: 'newest',
      priceRange: '' 
    })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Search products..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div>
        <label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-700">
          Sort By
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range - Fixed */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.value} className="flex items-center">
              <input 
                type="radio" 
                name="price"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => handlePriceRangeChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Clear All Filters
      </button>
    </div>
  )
}