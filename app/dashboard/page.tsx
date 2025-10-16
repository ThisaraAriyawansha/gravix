'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Package, User } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    } else {
      loadStats();
    }
  }, [user, router]);

  async function loadStats() {
    if (!user) return;

    try {
      const { data: orders } = await supabase
        .from('orders')
        .select('status')
        .eq('user_id', user.id);

      setStats({
        totalOrders: orders?.length || 0,
        pendingOrders: orders?.filter((o) => ['pending', 'confirmed', 'processing'].includes(o.status)).length || 0,
        deliveredOrders: orders?.filter((o) => o.status === 'delivered').length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome back, {profile?.full_name || 'there'}!</p>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
                    <Package className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Delivered</CardTitle>
                    <Package className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.deliveredOrders}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/orders" className="block">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">My Orders</h3>
                      <p className="text-sm text-gray-600">View and track your orders</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/dashboard/profile" className="block">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <User className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">My Profile</h3>
                      <p className="text-sm text-gray-600">Manage your account details</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/cart" className="block">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Package className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Shopping Cart</h3>
                      <p className="text-sm text-gray-600">View items in your cart</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
