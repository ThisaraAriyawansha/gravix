import Link from 'next/link';
import Image from 'next/image';

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
  const primaryVariant = product.variants[0];
  const displayPrice = primaryVariant.discount_price || primaryVariant.price;
  const originalPrice = primaryVariant.discount_price ? primaryVariant.price : null;

  console.log('Primary Image:', primaryVariant.primary_image); // Debug

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
          {primaryVariant.primary_image ? (
            <Image
              src={`http://localhost:5000${primaryVariant.primary_image}`}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={() => console.error('Image failed to load:', primaryVariant.primary_image)}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image Available
            </div>
          )}
          {originalPrice && (
            <div className="absolute px-2 py-1 text-sm text-white bg-red-600 top-2 left-2">
              Sale
            </div>
          )}
        </div>

        <div className="text-center">
          <h3 className="mb-2 text-lg font-light transition-colors group-hover:text-gray-600">
            {product.name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
            <span className="font-medium">${displayPrice}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}