'use client'

import { useState, useCallback } from 'react'
import { uploadProductImages, setPrimaryImage, deleteProductImage } from '@/lib/api'

interface ProductImage {
  id: number
  image_url: string
  alt_text: string
  is_primary: boolean
}

interface ImageUploadProps {
  productVariantId: number
  existingImages?: ProductImage[]
  onImagesUpdate?: (images: ProductImage[]) => void
}

export default function ImageUpload({ productVariantId, existingImages = [], onImagesUpdate }: ImageUploadProps) {
  const [images, setImages] = useState<ProductImage[]>(existingImages)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('product_variant_id', productVariantId.toString())
      
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i])
      }

      const response = await uploadProductImages(formData)
      const newImages = [...images, ...response.images]
      setImages(newImages)
      onImagesUpdate?.(newImages)
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      handleFileUpload(files)
    }
  }

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
    
    const files = event.dataTransfer.files
    if (files) {
      handleFileUpload(files)
    }
  }, [productVariantId])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOver(false)
  }, [])

  const handleSetPrimary = async (imageId: number) => {
    try {
      await setPrimaryImage(imageId, { product_variant_id: productVariantId })
      
      const updatedImages = images.map(img => ({
        ...img,
        is_primary: img.id === imageId
      }))
      
      setImages(updatedImages)
      onImagesUpdate?.(updatedImages)
    } catch (error) {
      console.error('Error setting primary image:', error)
      alert('Failed to set primary image')
    }
  }

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      await deleteProductImage(imageId)
      const updatedImages = images.filter(img => img.id !== imageId)
      setImages(updatedImages)
      onImagesUpdate?.(updatedImages)
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        
        <label htmlFor="image-upload" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            
            <div>
              <p className="text-lg font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Upload Images'}
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop images here, or click to select
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Product Images ({images.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:5000${image.image_url}`}
                    alt={image.alt_text}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                    {!image.is_primary && (
                      <button
                        onClick={() => handleSetPrimary(image.id)}
                        className="bg-white text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors"
                      >
                        Set Primary
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Primary Badge */}
                {image.is_primary && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}