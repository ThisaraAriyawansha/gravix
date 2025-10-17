'use client'

interface Filters {
  category: string
  search: string
  sort: string
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

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Search products..."
          className="input-field"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="input-field"
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
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
          className="input-field"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="price" className="mr-2" />
            <span className="text-sm">All Prices</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="price" className="mr-2" />
            <span className="text-sm">Under $50</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="price" className="mr-2" />
            <span className="text-sm">$50 - $100</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="price" className="mr-2" />
            <span className="text-sm">Over $100</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFilterChange({ category: '', search: '', sort: 'newest' })}
        className="w-full btn-secondary text-sm"
      >
        Clear All Filters
      </button>
    </div>
  )
}