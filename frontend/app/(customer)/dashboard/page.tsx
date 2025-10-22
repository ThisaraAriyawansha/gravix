'use client'

import { useState, useEffect } from 'react'
import { getOrders } from '@/lib/api'

interface Order {
  id: number
  order_number: string
  total_amount: number
  status: string
  created_at: string
  current_status: string
}

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
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

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-6 mx-auto sm:py-8">
        <h1 className="mb-6 text-2xl font-light sm:text-3xl">My Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:mb-8">
          <div className="p-4 text-center rounded-lg shadow-sm card sm:p-6 bg-gray-50">
            <div className="mb-1 text-xl font-light sm:text-2xl">{orders.length}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          
          <div className="p-4 text-center rounded-lg shadow-sm card sm:p-6 bg-gray-50">
            <div className="mb-1 text-xl font-light sm:text-2xl">
              ${orders.reduce((total, order) => total + Number(order.total_amount || 0), 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          
          <div className="p-4 text-center rounded-lg shadow-sm card sm:p-6 bg-gray-50">
            <div className="mb-1 text-xl font-light sm:text-2xl">
              {orders.filter(order => order.status === 'delivered').length}
            </div>
            <div className="text-sm text-gray-600">Delivered Orders</div>
          </div>
        </div>

        <div className="rounded-lg shadow-sm card bg-gray-50">
          <div className="p-4 border-b border-gray-200 sm:p-6">
            <h2 className="text-lg font-light sm:text-xl">Recent Orders</h2>
          </div>
          
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3 animate-pulse">
                    <div className="w-1/4 h-3 bg-gray-200 rounded"></div>
                    <div className="w-1/6 h-3 bg-gray-200 rounded"></div>
                    <div className="w-1/6 h-3 bg-gray-200 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="py-6 text-center sm:py-8">
                <p className="mb-3 text-sm text-gray-600 sm:text-base sm:mb-4">No orders yet</p>
                <a href="/products" className="inline-block px-4 py-2 text-sm text-white bg-blue-600 rounded sm:text-base hover:bg-blue-700">
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex flex-col items-start justify-between py-3 border-b border-gray-100 sm:flex-row sm:items-center last:border-0">
                    <div>
                      <div className="text-sm font-medium sm:text-base">#{order.order_number}</div>
                      <div className="text-xs text-gray-600 sm:text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="mt-2 text-left sm:text-right sm:mt-0">
                      <div className="text-sm font-medium sm:text-base">${order.total_amount}</div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.current_status || order.status)}`}>
                        {order.current_status || order.status}
                      </span>
                    </div>
                  </div>
                ))}
                
                {orders.length > 5 && (
                  <div className="pt-3 text-center sm:pt-4">
                    <a href="/orders" className="text-sm text-blue-600 sm:text-base hover:underline">
                      View all orders
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}