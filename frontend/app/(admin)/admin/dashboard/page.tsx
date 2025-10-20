'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDashboardStats, getAllProducts, getAllOrders, getAdminUsers } from '@/lib/api'
import StatsCard from '@/components/admin/StatsCard'

interface DashboardStats {
  stats: {
    totalSales: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
  }
  recentOrders: any[]
  monthlySales: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsData, productsData, ordersData, usersData] = await Promise.all([
        getDashboardStats(),
        getAllProducts(),
        getAllOrders(),
        getAdminUsers()
      ])
      
      setStats(statsData)
      setProducts(productsData.slice(0, 5))
      setOrders(ordersData.slice(0, 5))
      setUsers(usersData.slice(0, 5))
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
        <div className="animate-pulse">
          <div className="w-1/3 h-6 mb-4 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-1 text-xl font-light sm:text-2xl">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome to your store management panel</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <Link href="/admin/products/new" className="px-4 py-2 text-sm btn-primary">
              Add Product
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Sales"
            value={`$${stats?.stats.totalSales.toLocaleString() || '0'}`}
            description="All time revenue"
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatsCard
            title="Total Orders"
            value={stats?.stats.totalOrders.toString() || '0'}
            description="Completed orders"
            trend={{ value: 8, isPositive: true }}
          />
          
          <StatsCard
            title="Total Products"
            value={stats?.stats.totalProducts.toString() || '0'}
            description="Active products"
            trend={{ value: 5, isPositive: true }}
          />
          
          <StatsCard
            title="Total Users"
            value={stats?.stats.totalUsers.toString() || '0'}
            description="Registered customers"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-light">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            
            <div className="p-4">
              {orders.length === 0 ? (
                <div className="py-6 text-sm text-center text-gray-500">
                  No recent orders
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="text-sm font-medium">#{order.order_number}</div>
                        <div className="text-xs text-gray-600">
                          {order.full_name || 'Guest'} • {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${order.total_amount}</div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Products */}
          <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-light">Recent Products</h2>
              <Link href="/admin/products" className="text-xs text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
            
            <div className="p-4">
              {products.length === 0 ? (
                <div className="py-6 text-sm text-center text-gray-500">
                  No products yet
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs text-gray-600">
                          {product.category_name} • {product.variants?.length || 0} variants
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ${product.variants?.[0]?.price || '0'}
                        </div>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="mb-4 text-lg font-light">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Link href="/admin/products/new" className="p-4 transition-shadow card hover:shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Add Product</h3>
                  <p className="text-xs text-gray-600">Create new product with variants</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/orders" className="p-4 transition-shadow card hover:shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Manage Orders</h3>
                  <p className="text-xs text-gray-600">Process and track orders</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/users" className="p-4 transition-shadow card hover:shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Manage Users</h3>
                  <p className="text-xs text-gray-600">View and manage customers</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}