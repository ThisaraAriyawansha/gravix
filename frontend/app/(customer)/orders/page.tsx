'use client'

import { useState, useEffect } from 'react'
import { getOrders, getOrderDetails } from '@/lib/api'
import Link from 'next/link'

interface OrderItem {
  id: number
  product_name: string
  size: string
  color: string
  quantity: number
  unit_price: number
  total_price: number
}

interface Order {
  id: number
  order_number: string
  total_amount: number
  status: string
  created_at: string
  items?: OrderItem[]
  history?: Array<{ status: string; created_at: string; notes: string }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

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

  const loadOrderDetails = async (orderId: number) => {
    try {
      setDetailLoading(true)
      const data = await getOrderDetails(orderId)
      setSelectedOrder(data)
    } catch (error) {
      console.error('Error loading order details:', error)
    } finally {
      setDetailLoading(false)
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">My Orders</h1>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6 border-b border-gravix-gray-200">
                <h2 className="text-xl font-light">Order History</h2>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gravix-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gravix-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gravix-gray-600 mb-4">No orders found</p>
                    <Link href="/products" className="btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div
                        key={order.id}
                        className={`p-4 border rounded-none cursor-pointer transition-colors ${
                          selectedOrder?.id === order.id
                            ? 'border-gravix-black bg-gravix-gray-50'
                            : 'border-gravix-gray-200 hover:border-gravix-gray-400'
                        }`}
                        onClick={() => loadOrderDetails(order.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">#{order.order_number}</div>
                            <div className="text-sm text-gravix-gray-600">
                              {new Date(order.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${order.total_amount}</div>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <div className="p-6 border-b border-gravix-gray-200">
                <h2 className="text-xl font-light">
                  {selectedOrder ? `Order #${selectedOrder.order_number}` : 'Order Details'}
                </h2>
              </div>
              
              <div className="p-6">
                {detailLoading ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gravix-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gravix-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gravix-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ) : selectedOrder ? (
                  <div className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-3">Items</h3>
                      <div className="space-y-3">
                        {selectedOrder.items?.map(item => (
                          <div key={item.id} className="flex justify-between items-start text-sm">
                            <div>
                              <div className="font-medium">{item.product_name}</div>
                              <div className="text-gravix-gray-600">
                                {item.size} • {item.color} • Qty: {item.quantity}
                              </div>
                            </div>
                            <div className="text-right">
                              <div>${item.unit_price}</div>
                              <div className="text-gravix-gray-600">${item.total_price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-gravix-gray-200 pt-4">
                      <div className="flex justify-between items-center font-medium">
                        <span>Total</span>
                        <span>${selectedOrder.total_amount}</span>
                      </div>
                    </div>

                    {/* Order History */}
                    <div>
                      <h3 className="font-medium mb-3">Order History</h3>
                      <div className="space-y-2 text-sm">
                        {selectedOrder.history?.map((history, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="capitalize">{history.status}</span>
                            <span className="text-gravix-gray-600">
                              {new Date(history.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gravix-gray-600">
                    Select an order to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}