import Link from 'next/link'
import Image from 'next/image'

interface ProductVariant {
  id: number
  size: string
  color: string
  price: number
  discount_price: number | null
  primary_image: string
}

interface Product {
  id: number
  name: string
  slug: string
  description: string
  variants: ProductVariant[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryVariant = product.variants[0]
  const displayPrice = primaryVariant.discount_price || primaryVariant.price
  const originalPrice = primaryVariant.discount_price ? primaryVariant.price : null

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-4 overflow-hidden aspect-square bg-gravix-gray-100">
          {primaryVariant.primary_image && (
            <Image
              src={primaryVariant.primary_image}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {originalPrice && (
            <div className="absolute px-2 py-1 text-sm text-white bg-red-600 top-2 left-2">
              Sale
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="mb-2 text-lg font-light transition-colors group-hover:text-gravix-gray-600">
            {product.name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            {originalPrice && (
              <span className="text-sm line-through text-gravix-gray-500">
                ${originalPrice}
              </span>
            )}
            <span className="font-medium">${displayPrice}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}