'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getCartItems, updateCartItemQuantity, removeFromCart } from '@/lib/cart';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CartItem = {
  id: string;
  quantity: number;
  variant: {
    id: string;
    size: string;
    color: string;
    price: number;
    discount_price: number | null;
    product: {
      name: string;
      slug: string;
    };
    images: Array<{
      image_url: string;
      is_primary: boolean;
    }>;
  };
};

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function loadCart() {
    if (!user) return;

    try {
      const { data, error } = await getCartItems(user.id);
      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast.error('Failed to load cart');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateQuantity(itemId: string, newQuantity: number) {
    try {
      const { error } = await updateCartItemQuantity(itemId, newQuantity);
      if (error) throw error;
      loadCart();
    } catch (error: any) {
      toast.error('Failed to update quantity');
      console.error(error);
    }
  }

  async function handleRemove(itemId: string) {
    try {
      const { error } = await removeFromCart(itemId);
      if (error) throw error;
      toast.success('Item removed from cart');
      loadCart();
    } catch (error: any) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.variant.discount_price || item.variant.price;
    return sum + price * item.quantity;
  }, 0);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Sign in to view your cart</h2>
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const image = item.variant.images?.find((img) => img.is_primary) || item.variant.images?.[0];
                  const price = item.variant.discount_price || item.variant.price;

                  return (
                    <Card key={item.id} className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                          {image ? (
                            <img
                              src={image.image_url}
                              alt={item.variant.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center text-white">
                              <span className="text-2xl font-light">
                                {item.variant.product.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            {item.variant.product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Size: {item.variant.size} | Color: {item.variant.color}
                          </p>
                          <p className="text-lg font-semibold">${price.toFixed(2)}</p>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                          <div className="flex items-center gap-2 border border-black">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div>
                <Card className="p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {subtotal >= 100 ? 'FREE' : '$9.99'}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>
                          ${(subtotal + (subtotal >= 100 ? 0 : 9.99)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mb-3" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
