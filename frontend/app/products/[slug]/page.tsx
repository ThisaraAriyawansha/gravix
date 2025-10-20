'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { getProduct, addToCart } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'

interface ProductVariant {
  id: number
  size: string
  color: string
  color_hex: string
  price: number
  discount_price: number | null
  stock_quantity: number
  images: Array<{ id: number; image_url: string; is_primary: boolean }>
}

interface Product {
  id: number
  name: string
  slug: string
  description: string
  category_name: string
  variants: ProductVariant[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)

  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    loadProduct()
  }, [slug])

  useEffect(() => {
    if (product && product.variants.length > 0) {
      const defaultVariant = product.variants[0]
      setSelectedSize(defaultVariant.size)
      setSelectedColor(defaultVariant.color)
      updateSelectedVariant(defaultVariant.size, defaultVariant.color)
    }
  }, [product])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProduct(slug)
      setProduct(data)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSelectedVariant = (size: string, color: string) => {
    if (!product) return

    const variant = product.variants.find(
      v => v.size === size && v.color === color
    )
    setSelectedVariant(variant || null)

    // If no valid variant is found, try to select a valid color for the current size
    if (!variant && product.variants.length > 0) {
      const validVariant = product.variants.find(v => v.size === size)
      if (validVariant) {
        setSelectedColor(validVariant.color)
        setSelectedVariant(validVariant)
      } else {
        // If no valid variant for the size, try a valid size for the current color
        const validSizeVariant = product.variants.find(v => v.color === color)
        if (validSizeVariant) {
          setSelectedSize(validSizeVariant.size)
          setSelectedVariant(validSizeVariant)
        }
      }
    }
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    updateSelectedVariant(size, selectedColor)
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    updateSelectedVariant(selectedSize, color)
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return

    try {
      setAddingToCart(true)

      // Add to backend cart
      await addToCart(selectedVariant.id, quantity)

      // Add to local state
      addItem({
        id: Date.now(), // Temporary ID
        product_variant_id: selectedVariant.id,
        quantity,
        size: selectedVariant.size,
        color: selectedVariant.color,
        price: selectedVariant.price,
        discount_price: selectedVariant.discount_price,
        product_name: product?.name || '',
        product_slug: product?.slug || '',
        image: selectedVariant.images[0]?.image_url || ''
      })

      // Show success message
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add product to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-4 py-8 mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="aspect-square bg-gravix-gray-200"></div>
              <div className="space-y-4">
                <div className="w-3/4 h-8 rounded bg-gravix-gray-200"></div>
                <div className="w-1/2 h-4 rounded bg-gravix-gray-200"></div>
                <div className="w-1/4 h-6 rounded bg-gravix-gray-200"></div>
                <div className="w-full h-10 rounded bg-gravix-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-light">Product not found</h1>
          <a href="/products" className="btn-primary">Back to Products</a>
        </div>
      </div>
    )
  }

  const primaryImage = selectedVariant?.images.find(img => img.is_primary) || selectedVariant?.images[0]
  const displayPrice = selectedVariant?.discount_price || selectedVariant?.price || 0
  const originalPrice = selectedVariant?.discount_price ? selectedVariant.price : null

  const availableSizes = Array.from(new Set(product.variants.map(v => v.size)))
  const availableColors = Array.from(new Set(product.variants.map(v => v.color)))

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            {primaryImage && (
              <div className="overflow-hidden aspect-square bg-gravix-gray-100">
                <Image
                  src={`http://localhost:5000${primaryImage.image_url}`}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-light">{product.name}</h1>
              <p className="mb-4 text-gravix-gray-600">{product.category_name}</p>

              <div className="flex items-center mb-4 space-x-2">
                {originalPrice && (
                  <span className="text-lg line-through text-gravix-gray-500">
                    ${originalPrice}
                  </span>
                )}
                <span className="text-2xl font-medium">${displayPrice}</span>
              </div>
            </div>

            <p className="leading-relaxed text-gravix-gray-700">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="mb-3 text-sm font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => {
                  const variant = product.variants.find(v => v.size === size && v.color === selectedColor)
                  return (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      disabled={!variant}
                      className={`px-4 py-2 border ${
                        selectedSize === size
                          ? 'border-gravix-black bg-gravix-black text-white'
                          : 'border-gravix-gray-300 hover:border-gravix-black'
                      } ${!variant ? 'opacity-50 cursor-not-allowed' : ''} transition-colors`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="mb-3 text-sm font-medium">Color</h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map(color => {
                  const variant = product.variants.find(v => v.color === color && v.size === selectedSize)
                  const colorVariant = product.variants.find(v => v.color === color)
                  return (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      disabled={!variant}
                      className={`w-10 h-10 border-2 ${
                        selectedColor === color
                          ? 'border-gravix-black'
                          : 'border-gravix-gray-300 hover:border-gravix-gray-500'
                      } ${!variant ? 'opacity-50 cursor-not-allowed' : ''} transition-colors`}
                      style={{ backgroundColor: colorVariant?.color_hex }}
                      title={color}
                    />
                  )
                })}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium">Quantity</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 input-field"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || addingToCart || selectedVariant.stock_quantity === 0}
                  className="w-full py-3 btn-primary disabled:bg-gravix-gray-400 disabled:cursor-not-allowed"
                >
                  {addingToCart ? 'Adding...' : selectedVariant?.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Stock Info */}
            {selectedVariant && (
              <div className="text-sm text-gravix-gray-600">
                {selectedVariant.stock_quantity > 0
                  ? `${selectedVariant.stock_quantity} in stock`
                  : 'Out of stock'
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}