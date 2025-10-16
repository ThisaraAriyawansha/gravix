'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Package, ShoppingCart, Users, LayoutDashboard, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { toast } from 'sonner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/auth/signin');
    }
  }, [user, isAdmin, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-black text-white">
          <div className="p-6">
            <Link href="/admin" className="text-2xl font-bold tracking-tighter">
              GRAVIX ADMIN
            </Link>
          </div>

          <nav className="mt-6">
            <Link
              href="/admin"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Package className="h-5 w-5 mr-3" />
              Products
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              Orders
            </Link>
            <Link
              href="/admin/customers"
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <Users className="h-5 w-5 mr-3" />
              Customers
            </Link>
          </nav>

          <div className="absolute bottom-0 w-64 p-6">
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
