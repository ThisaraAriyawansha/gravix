'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { addToCart } from '@/lib/cart';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

type ProductVariant = {
  id: string;
  size: string;
  color: string;
  color_hex: string;
  price: number;
  discount_price: number | null;
  stock_quantity: number;
  images: Array<{
    image_url: string;
    is_primary: boolean;
    alt_text: string | null;
  }>;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  variants: ProductVariant[];
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [params.slug]);

  async function loadProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants(
            *,
            images:product_images(*)
          )
        `)
        .eq('slug', params.slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        router.push('/shop');
        return;
      }

      setProduct(data);

      if (data.variants.length > 0) {
        const firstVariant = data.variants[0];
        setSelectedSize(firstVariant.size);
        setSelectedColor(firstVariant.color);
        setSelectedVariant(firstVariant);
      }
    } catch (error: any) {
      toast.error('Failed to load product');
      console.error(error);
      router.push('/shop');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (product && selectedSize && selectedColor) {
      const variant = product.variants.find(
        (v) => v.size === selectedSize && v.color === selectedColor
      );
      setSelectedVariant(variant || null);
    }
  }, [selectedSize, selectedColor, product]);

  async function handleAddToCart() {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      router.push('/auth/signin');
      return;
    }

    if (!selectedVariant) {
      toast.error('Please select a size and color');
      return;
    }

    if (selectedVariant.stock_quantity <= 0) {
      toast.error('This item is out of stock');
      return;
    }

    setAdding(true);
    try {
      const { error } = await addToCart(user.id, selectedVariant.id, 1);
      if (error) throw error;
      toast.success('Added to cart');
    } catch (error: any) {
      toast.error('Failed to add to cart');
      console.error(error);
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 mt-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const availableSizes = Array.from(new Set(product.variants.map((v) => v.size)));
  const uniqueColors = new Map<string, string>();
  product.variants
    .filter((v) => v.size === selectedSize)
    .forEach((v) => {
      if (!uniqueColors.has(v.color)) {
        uniqueColors.set(v.color, v.color_hex);
      }
    });
  const availableColors = Array.from(uniqueColors.entries()).map(([name, hex]) => ({ name, hex }));

  const currentImage = selectedVariant?.images?.find((img) => img.is_primary) ||
                       selectedVariant?.images?.[0];

  const price = selectedVariant?.discount_price || selectedVariant?.price || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-gray-200">
              {currentImage ? (
                <img
                  src={currentImage.image_url}
                  alt={currentImage.alt_text || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white">
                  <span className="text-9xl font-light">
                    {product.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold mb-6">${price.toFixed(2)}</p>

              {product.description && (
                <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">SIZE</label>
                  <div className="flex gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 transition-colors ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">COLOR</label>
                  <div className="flex gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`px-6 py-3 border-2 transition-colors ${
                          selectedColor === color.name
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedVariant && (
                  <p className="text-sm text-gray-600">
                    {selectedVariant.stock_quantity > 0
                      ? `${selectedVariant.stock_quantity} in stock`
                      : 'Out of stock'}
                  </p>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={adding || !selectedVariant || selectedVariant.stock_quantity <= 0}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {adding ? 'Adding...' : 'Add to Cart'}
                </Button>
              </div>

              <Card className="mt-8 p-6 bg-gray-50">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Premium quality materials</li>
                  <li>• Carefully crafted design</li>
                  <li>• Free shipping on orders over $100</li>
                  <li>• 30-day return policy</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
