'use client'

import { useState, useEffect } from 'react'
import ImageUpload from './ImageUpload'

interface ProductFormData {
  name: string
  description: string
  category_id: number
  is_featured: boolean
  is_active?: boolean
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

interface ProductFormProps {
  initialData?: ProductFormData
  initialVariants?: VariantFormData[]
  onSubmit: (productData: ProductFormData, variants: VariantFormData[]) => Promise<void>
  loading: boolean
  isEdit?: boolean
}

const categories = [
  { id: 1, name: 'Men' },
  { id: 2, name: 'Women' },
  { id: 3, name: 'Kids' }
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Navy', hex: '#1E3A8A' },
  { name: 'Brown', hex: '#78350F' }
]

export default function ProductForm({ 
  initialData, 
  initialVariants = [], 
  onSubmit, 
  loading, 
  isEdit = false 
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category_id: 1,
    is_featured: false,
    is_active: true,
    ...initialData
  })

  const [variants, setVariants] = useState<VariantFormData[]>(initialVariants)
  const [newVariant, setNewVariant] = useState<Omit<VariantFormData, 'id'>>({
    size: 'M',
    color: 'Black',
    color_hex: '#000000',
    price: 0,
    discount_price: 0,
    stock_quantity: 0,
    images: []
  })

  const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData, variants)
  }

  const handleAddVariant = () => {
    if (newVariant.price > 0 && newVariant.stock_quantity >= 0) {
      setVariants(prev => [...prev, { ...newVariant }])
      setNewVariant({
        size: 'M',
        color: 'Black',
        color_hex: '#000000',
        price: 0,
        discount_price: 0,
        stock_quantity: 0,
        images: []
      })
    }
  }

  const handleRemoveVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index))
    if (activeVariantIndex === index) {
      setActiveVariantIndex(null)
    }
  }

  const handleUpdateVariant = (index: number, field: string, value: any) => {
    setVariants(prev => prev.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    ))
  }

  const handleColorChange = (colorName: string) => {
    const color = colors.find(c => c.name === colorName)
    if (color) {
      setNewVariant(prev => ({
        ...prev,
        color: color.name,
        color_hex: color.hex
      }))
    }
  }

  const handleVariantImagesUpdate = (variantIndex: number, images: any[]) => {
    setVariants(prev => prev.map((variant, i) => 
      i === variantIndex ? { ...variant, images } : variant
    ))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="p-4 card">
        <h2 className="mb-4 text-lg font-light">Basic Information</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-xs font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="text-sm input-field"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1 text-xs font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="text-sm resize-none input-field"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="category" className="block mb-1 text-xs font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: parseInt(e.target.value) }))}
                className="text-sm input-field"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="mr-2"
              />
              <label htmlFor="is_featured" className="text-xs font-medium text-gray-700">
                Featured Product
              </label>
            </div>

            {isEdit && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="is_active" className="text-xs font-medium text-gray-700">
                  Active Product
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Variants */}
      <div className="p-4 card">
        <h2 className="mb-4 text-lg font-light">Product Variants</h2>

        {/* Add New Variant */}
        <div className="p-3 mb-4 rounded-lg bg-gray-50">
          <h3 className="mb-3 text-sm font-medium">Add New Variant</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Size</label>
              <select
                value={newVariant.size}
                onChange={(e) => setNewVariant(prev => ({ ...prev, size: e.target.value }))}
                className="text-sm input-field"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Color</label>
              <select
                value={newVariant.color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="text-sm input-field"
              >
                {colors.map(color => (
                  <option key={color.name} value={color.name}>{color.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newVariant.price}
                onChange={(e) => setNewVariant(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="text-sm input-field"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Discount Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newVariant.discount_price}
                onChange={(e) => setNewVariant(prev => ({ ...prev, discount_price: parseFloat(e.target.value) }))}
                className="text-sm input-field"
              />
            </div>

            <div>
              <label className="block mb-1 text-xs font-medium text-gray-700">Stock</label>
              <input
                type="number"
                min="0"
                value={newVariant.stock_quantity}
                onChange={(e) => setNewVariant(prev => ({ ...prev, stock_quantity: parseInt(e.target.value) }))}
                className="text-sm input-field"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddVariant}
            className="px-4 py-2 mt-3 text-sm btn-primary"
            disabled={newVariant.price <= 0}
          >
            Add Variant
          </button>
        </div>

        {/* Variants List */}
        <div>
          <h3 className="mb-3 text-sm font-medium">
            Variants ({variants.length})
          </h3>

          {variants.length === 0 ? (
            <div className="py-6 text-sm text-center text-gray-500">
              No variants added yet. Add your first variant above.
            </div>
          ) : (
            <div className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  {/* Variant Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-medium">
                        {variant.size} - {variant.color}
                      </h4>
                      <div className="flex items-center mt-1 space-x-3">
                        <div 
                          className="w-5 h-5 border border-gray-300 rounded"
                          style={{ backgroundColor: variant.color_hex }}
                        ></div>
                        <span className="text-xs text-gray-600">
                          SKU: {variant.id ? `GX-${variant.id}-${variant.size}-${variant.color}`.toUpperCase() : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-xs font-medium text-red-600 hover:text-red-800"
                    >
                      Remove Variant
                    </button>
                  </div>

                  {/* Variant Details */}
                  <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-4">
                    <div>
                      <label className="block mb-1 text-xs font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={variant.price}
                        onChange={(e) => handleUpdateVariant(index, 'price', parseFloat(e.target.value))}
                        className="text-sm input-field"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-xs font-medium text-gray-700">Discount</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={variant.discount_price}
                        onChange={(e) => handleUpdateVariant(index, 'discount_price', parseFloat(e.target.value))}
                        className="text-sm input-field"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-xs font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={variant.stock_quantity}
                        onChange={(e) => handleUpdateVariant(index, 'stock_quantity', parseInt(e.target.value))}
                        className="text-sm input-field"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-xs font-medium text-gray-700">Final Price</label>
                      <div className="p-2 text-sm font-medium rounded bg-gray-50">
                        {variant.discount_price > 0 ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500 line-through">${variant.price}</span>
                            <span className="text-green-600">${variant.discount_price}</span>
                          </div>
                        ) : (
                          <span>${variant.price}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Variant Images */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-medium">Variant Images</h5>
                      <button
                        type="button"
                        onClick={() => setActiveVariantIndex(activeVariantIndex === index ? null : index)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {activeVariantIndex === index ? 'Hide Images' : 'Manage Images'}
                      </button>
                    </div>

                    {activeVariantIndex === index && variant.id && (
                      <ImageUpload
                        productVariantId={variant.id}
                        existingImages={variant.images || []}
                        onImagesUpdate={(images) => handleVariantImagesUpdate(index, images)}
                      />
                    )}

                    {activeVariantIndex === index && !variant.id && (
                      <div className="py-6 text-sm text-center text-gray-500 rounded-lg bg-gray-50">
                        <p>Save the product first to upload images for this variant.</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || variants.length === 0}
          className="px-4 py-2 text-sm btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  )
}