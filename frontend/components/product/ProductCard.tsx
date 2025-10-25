import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface ProductVariant {
  id: number;
  size: string;
  color: string;
  price: number;
  discount_price: number | null;
  primary_image: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  variants: ProductVariant[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const primaryVariant = product.variants[0];
  const displayPrice = primaryVariant.discount_price || primaryVariant.price;
  const originalPrice = primaryVariant.discount_price ? primaryVariant.price : null;

  return (
    <div className="opacity-0 group animate-fade-in-up">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-4 overflow-hidden bg-gray-50 aspect-square">
          {primaryVariant.primary_image ? (
            <Image
              src={`http://localhost:5000${primaryVariant.primary_image}`}
              alt={product.name}
              width={400}
              height={400}
              className={`object-cover w-full h-full transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadingComplete={() => setImageLoaded(true)}
              onError={() => console.error('Image failed to load:', primaryVariant.primary_image)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-xs tracking-widest text-gray-400 uppercase">
              No Image
            </div>
          )}
          {originalPrice && (
            <div className="absolute px-3 py-1 text-xs tracking-wider text-white uppercase transition-opacity duration-300 bg-black opacity-0 top-3 left-3 group-hover:opacity-100">
              Sale
            </div>
          )}
          <div className="absolute inset-0 transition-opacity duration-500 bg-black opacity-0 group-hover:opacity-5"></div>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm tracking-wide uppercase transition-all duration-300 group-hover:text-gray-600 group-hover:translate-x-1">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm transition-all duration-300 group-hover:translate-x-1">
            {originalPrice && (
              <span className="text-gray-400 line-through transition-colors duration-300">
                ${originalPrice}
              </span>
            )}
            <span className={`transition-colors duration-300 ${originalPrice ? 'text-black font-medium' : 'text-gray-700'}`}>
              ${displayPrice}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}