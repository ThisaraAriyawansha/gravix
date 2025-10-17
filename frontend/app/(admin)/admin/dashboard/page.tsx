'use client'

import { useState, useEffect } from 'react'
import { getDashboardStats } from '@/lib/api'
import StatsCard from '@/components/admin/StatsCard'

interface DashboardStats {
  stats: {
    totalSales: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
  }
  recentOrders: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await getDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gravix-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gravix-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">Admin Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Sales"
            value={`$${stats?.stats.totalSales.toFixed(2) || '0'}`}
            description="All time revenue"
          />
          
          <StatsCard
            title="Total Orders"
            value={stats?.stats.totalOrders.toString() || '0'}
            description="Completed orders"
          />
          
          <StatsCard
            title="Total Products"
            value={stats?.stats.totalProducts.toString() || '0'}
            description="Active products"
          />
          
          <StatsCard
            title="Total Users"
            value={stats?.stats.totalUsers.toString() || '0'}
            description="Registered customers"
          />
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="p-6 border-b border-gravix-gray-200">
            <h2 className="text-xl font-light">Recent Orders</h2>
          </div>
          
          <div className="p-6">
            {stats?.recentOrders.length === 0 ? (
              <div className="text-center py-8 text-gravix-gray-600">
                No recent orders
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.recentOrders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center py-3 border-b border-gravix-gray-100 last:border-0">
                    <div>
                      <div className="font-medium">#{order.order_number}</div>
                      <div className="text-sm text-gravix-gray-600">
                        {order.full_name || 'Guest'} • {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">${order.total_amount}</div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}