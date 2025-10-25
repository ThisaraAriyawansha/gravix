'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { getProduct, addToCart } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import AppleAlert from '@/components/AppleAlert'

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details')
  const [alert, setAlert] = useState<{
    isOpen: boolean
    title: string
    message: string
    type: 'success' | 'error'
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  })
  
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
    setSelectedImageIndex(0)
  }

  const getAvailableColorsForSize = (size: string): string[] => {
    if (!product) return []
    return product.variants
      .filter(v => v.size === size)
      .map(v => v.color)
      .filter((color, index, arr) => arr.indexOf(color) === index)
  }

  const getAvailableSizesForColor = (color: string): string[] => {
    if (!product) return []
    return product.variants
      .filter(v => v.color === color)
      .map(v => v.size)
      .filter((size, index, arr) => arr.indexOf(size) === index)
  }

  const handleSizeChange = (size: string) => {
    if (!product) return
    
    const availableColorsForNewSize = getAvailableColorsForSize(size)
    let newColor = selectedColor
    if (!availableColorsForNewSize.includes(selectedColor) && availableColorsForNewSize.length > 0) {
      newColor = availableColorsForNewSize[0]
      setSelectedColor(newColor)
    }
    
    setSelectedSize(size)
    updateSelectedVariant(size, newColor)
  }

  const handleColorChange = (color: string) => {
    if (!product) return
    
    const availableSizesForNewColor = getAvailableSizesForColor(color)
    let newSize = selectedSize
    if (!availableSizesForNewColor.includes(selectedSize) && availableSizesForNewColor.length > 0) {
      newSize = availableSizesForNewColor[0]
      setSelectedSize(newSize)
    }
    
    setSelectedColor(color)
    updateSelectedVariant(newSize, color)
  }

  const showAlert = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setAlert({
      isOpen: true,
      title,
      message,
      type
    })
  }

  const handleAlertClose = () => {
    setAlert(prev => ({ ...prev, isOpen: false }))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    
    try {
      setAddingToCart(true)
      await addToCart(selectedVariant.id, quantity)
      
      addItem({
        id: Date.now(),
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
      
      showAlert('Added to Cart', 'Product has been added to your cart successfully!', 'success')
    } catch (error) {
      console.error('Error adding to cart:', error)
      showAlert('Error', 'Failed to add product to cart. Please try again.', 'error')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-6 py-12 mx-auto lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="bg-gray-100 aspect-square animate-pulse"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-100 aspect-square animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-3/4 h-8 bg-gray-100 animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-100 animate-pulse"></div>
              <div className="w-full h-32 bg-gray-100 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center opacity-0 animate-fade-in-up">
          <h1 className="mb-4 text-2xl font-light tracking-wider uppercase">Product not found</h1>
          <a href="/products" className="inline-block px-6 py-3 text-xs tracking-widest uppercase transition-all border border-black hover:bg-black hover:text-white">
            Back to Products
          </a>
        </div>
      </div>
    )
  }

  const displayPrice = selectedVariant?.discount_price || selectedVariant?.price || 0
  const originalPrice = selectedVariant?.discount_price ? selectedVariant.price : null
  const availableSizes = product.variants.map(v => v.size).filter((s, i, arr) => arr.indexOf(s) === i)
  const availableColors = product.variants.map(v => v.color).filter((c, i, arr) => arr.indexOf(c) === i)
  const currentImages = selectedVariant?.images || []

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="container px-6 py-12 mx-auto lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Product Images */}
            <div className="opacity-0 animate-fade-in-up">
              {/* Main Image */}
              <div className="mb-4 overflow-hidden bg-gray-50 aspect-square group">
                {currentImages[selectedImageIndex] && (
                  <Image
                    src={`http://localhost:5000${currentImages[selectedImageIndex].image_url}`}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Thumbnail Images */}
              {currentImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {currentImages.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square overflow-hidden bg-gray-50 transition-all duration-300 ${
                        selectedImageIndex === index 
                          ? 'ring-2 ring-black' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={`http://localhost:5000${img.image_url}`}
                        alt={`${product.name} - ${index + 1}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              {/* Header */}
              <div className="pb-6 border-b border-gray-200">
                <p className="mb-2 text-xs tracking-widest text-gray-500 uppercase">{product.category_name}</p>
                <h1 className="mb-4 text-3xl font-light tracking-wide uppercase">{product.name}</h1>
                
                <div className="flex items-baseline space-x-3">
                  {originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                  )}
                  <span className="text-2xl">${displayPrice}</span>
                </div>
              </div>

              {/* Description */}
              <p className="leading-relaxed text-gray-600">{product.description}</p>

              {/* Size Selection */}
              <div>
                <h3 className="mb-4 text-xs tracking-widest text-gray-500 uppercase">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => {
                    const availableColorsForThisSize = getAvailableColorsForSize(size)
                    const isAvailable = availableColorsForThisSize.length > 0
                    
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        disabled={!isAvailable}
                        className={`px-6 py-3 text-sm tracking-wider uppercase transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-black text-white'
                            : isAvailable
                              ? 'border border-gray-300 hover:border-black'
                              : 'border border-gray-200 text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="mb-4 text-xs tracking-widest text-gray-500 uppercase">
                  Select Color
                  <span className="ml-2 font-normal text-gray-600">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map(color => {
                    const availableSizesForThisColor = getAvailableSizesForColor(color)
                    const isAvailable = availableSizesForThisColor.length > 0
                    const colorVariant = product.variants.find(v => v.color === color)
                    
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        disabled={!isAvailable}
                        className={`w-12 h-12 border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-black scale-110'
                            : isAvailable
                              ? 'border-gray-300 hover:border-gray-500 hover:scale-105'
                              : 'border-gray-200 opacity-30 cursor-not-allowed'
                        }`}
                        style={{ backgroundColor: colorVariant?.color_hex }}
                        title={color}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="pt-6 space-y-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block mb-2 text-xs tracking-widest text-gray-500 uppercase">Quantity</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-20 px-3 py-3 text-sm transition-colors border border-gray-300 focus:outline-none focus:border-black"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block mb-2 text-xs tracking-widest text-gray-500 uppercase opacity-0">Action</label>
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant || addingToCart || selectedVariant.stock_quantity === 0}
                      className="w-full py-3 text-xs tracking-widest text-white uppercase transition-all duration-300 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {addingToCart ? 'Adding...' : selectedVariant?.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>

                {/* Stock Info */}
                {selectedVariant && (
                  <p className="text-xs tracking-wide text-gray-500">
                    {selectedVariant.stock_quantity > 0 
                      ? `${selectedVariant.stock_quantity} items in stock`
                      : 'Out of stock'
                    }
                  </p>
                )}
              </div>

              {/* Additional Info Tabs */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex mb-6 space-x-8 border-b border-gray-200">
                  {(['details', 'shipping', 'care'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-xs tracking-widest uppercase transition-all duration-300 ${
                        activeTab === tab
                          ? 'text-black border-b-2 border-black'
                          : 'text-gray-400 hover:text-black'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="text-sm leading-relaxed text-gray-600">
                  {activeTab === 'details' && (
                    <div className="space-y-3 opacity-0 animate-fade-in-up">
                      <p>Premium quality materials</p>
                      <p>Carefully crafted for comfort and style</p>
                      <p>Sustainable and eco-friendly production</p>
                      <p>Made with attention to every detail</p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-3 opacity-0 animate-fade-in-up">
                      <p>Free shipping on orders over $100</p>
                      <p>Standard delivery: 5-7 business days</p>
                      <p>Express delivery available</p>
                      <p>International shipping available</p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <div className="space-y-3 opacity-0 animate-fade-in-up">
                      <p>Machine wash cold with like colors</p>
                      <p>Do not bleach or tumble dry</p>
                      <p>Iron on low heat if needed</p>
                      <p>Dry flat for best results</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppleAlert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={handleAlertClose}
      />
    </>
  )
}