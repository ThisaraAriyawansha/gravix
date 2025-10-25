import ProductCard from './ProductCard'

interface Product {
  id: number
  name: string
  slug: string
  description: string
  variants: any[]
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center opacity-0 animate-fade-in-up">
        <p className="mb-2 text-sm tracking-wider text-gray-500 uppercase">No products found</p>
        <p className="text-xs tracking-wide text-gray-400">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {products.map((product, index) => (
        <div 
          key={product.id}
          style={{ 
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}