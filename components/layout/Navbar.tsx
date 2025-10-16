'use client';

import Link from 'next/link';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isAdmin } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            GRAVIX
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-sm font-medium hover:opacity-60 transition-opacity">
              SHOP
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:opacity-60 transition-opacity">
              CATEGORIES
            </Link>
            <Link href="/about" className="text-sm font-medium hover:opacity-60 transition-opacity">
              ABOUT
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:opacity-60 transition-opacity">
              CONTACT
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/cart">
                    <ShoppingBag className="h-5 w-5" />
                  </Link>
                </Button>

                <div className="relative group">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>

                  <div className="absolute right-0 mt-2 w-48 bg-white border border-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-2">
                      <p className="text-xs text-gray-600 px-3 py-2">{profile?.email}</p>
                      <Link href={isAdmin ? "/admin" : "/dashboard"} className="block px-3 py-2 text-sm hover:bg-gray-100">
                        {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                      </Link>
                      <Link href="/dashboard/orders" className="block px-3 py-2 text-sm hover:bg-gray-100">
                        Orders
                      </Link>
                      <Link href="/dashboard/profile" className="block px-3 py-2 text-sm hover:bg-gray-100">
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-black bg-white">
          <div className="px-4 py-4 space-y-4">
            <Link href="/shop" className="block text-sm font-medium">
              SHOP
            </Link>
            <Link href="/categories" className="block text-sm font-medium">
              CATEGORIES
            </Link>
            <Link href="/about" className="block text-sm font-medium">
              ABOUT
            </Link>
            <Link href="/contact" className="block text-sm font-medium">
              CONTACT
            </Link>

            {user ? (
              <>
                <Link href="/cart" className="block text-sm font-medium">
                  CART
                </Link>
                <Link href={isAdmin ? "/admin" : "/dashboard"} className="block text-sm font-medium">
                  {isAdmin ? 'ADMIN DASHBOARD' : 'MY DASHBOARD'}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block text-sm font-medium text-left w-full"
                >
                  SIGN OUT
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="block text-sm font-medium">
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
