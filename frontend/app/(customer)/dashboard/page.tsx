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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-light mb-8">My Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="text-2xl font-light mb-2">{orders.length}</div>
            <div className="text-gravix-gray-600">Total Orders</div>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-2xl font-light mb-2">
              ${orders.reduce((total, order) => total + order.total_amount, 0).toFixed(2)}
            </div>
            <div className="text-gravix-gray-600">Total Spent</div>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-2xl font-light mb-2">
              {orders.filter(order => order.status === 'delivered').length}
            </div>
            <div className="text-gravix-gray-600">Delivered Orders</div>
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-gravix-gray-200">
            <h2 className="text-xl font-light">Recent Orders</h2>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex justify-between items-center py-4">
                    <div className="h-4 bg-gravix-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gravix-gray-200 rounded w-1/6"></div>
                    <div className="h-4 bg-gravix-gray-200 rounded w-1/6"></div>
                    <div className="h-6 bg-gravix-gray-200 rounded w-1/5"></div>
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gravix-gray-600 mb-4">No orders yet</p>
                <a href="/products" className="btn-primary">Start Shopping</a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="flex justify-between items-center py-4 border-b border-gravix-gray-100 last:border-0">
                    <div>
                      <div className="font-medium">#{order.order_number}</div>
                      <div className="text-sm text-gravix-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">${order.total_amount}</div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.current_status || order.status)}`}>
                        {order.current_status || order.status}
                      </span>
                    </div>
                  </div>
                ))}
                
                {orders.length > 5 && (
                  <div className="text-center pt-4">
                    <a href="/orders" className="text-gravix-black hover:underline">
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