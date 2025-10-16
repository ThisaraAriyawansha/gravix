'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { toast } from 'sonner';

type ProductWithVariants = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  variants: Array<{
    id: string;
    size: string;
    color: string;
    price: number;
    discount_price: number | null;
    stock_quantity: number;
    images: Array<{
      image_url: string;
      is_primary: boolean;
      alt_text: string | null;
    }>;
  }>;
};

export default function ShopPage() {
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants(
            id,
            size,
            color,
            price,
            discount_price,
            stock_quantity,
            images:product_images(
              image_url,
              is_primary,
              alt_text
            )
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getProductImage(product: ProductWithVariants) {
    const primaryImage = product.variants[0]?.images?.find((img) => img.is_primary);
    return primaryImage?.image_url || product.variants[0]?.images?.[0]?.image_url;
  }

  function getProductPrice(product: ProductWithVariants) {
    if (!product.variants.length) return 0;
    const prices = product.variants.map((v) => v.discount_price || v.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 tracking-tight">SHOP ALL</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our complete collection of premium clothing
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : products.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600">No products available at the moment</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                    {getProductImage(product) ? (
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white">
                        <span className="text-6xl font-light">
                          {product.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{getProductPrice(product)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
