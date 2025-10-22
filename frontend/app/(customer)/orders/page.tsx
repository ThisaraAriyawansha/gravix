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
      <div className="container px-4 py-6 mx-auto sm:py-8">
        <div className="flex flex-col items-center justify-between mb-6 sm:flex-row sm:mb-8">
          <h1 className="mb-4 text-2xl font-light sm:text-3xl sm:mb-0">My Orders</h1>
          <Link href="/products" className="inline-block px-4 py-2 text-sm text-white bg-black rounded sm:text-base hover:bg-gray-700">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="rounded-lg shadow-sm card bg-gray-50">
              <div className="p-4 border-b border-gray-200 sm:p-6">
                <h2 className="text-lg font-light sm:text-xl">Order History</h2>
              </div>
              
              <div className="p-4 sm:p-6">
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="w-3/4 h-3 mb-2 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-6 text-center sm:py-8">
                    <p className="mb-3 text-sm text-gray-600 sm:text-base sm:mb-4">No orders found</p>
                    <Link href="/products" className="inline-block px-4 py-2 text-sm text-white bg-blue-600 rounded sm:text-base hover:bg-blue-700">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map(order => (
                      <div
                        key={order.id}
                        className={`p-3 sm:p-4 border rounded-none cursor-pointer transition-colors ${
                          selectedOrder?.id === order.id
                            ? 'border-black bg-gray-100'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => loadOrderDetails(order.id)}
                      >
                        <div className="flex flex-col items-start justify-between mb-2 sm:flex-row sm:items-center">
                          <div>
                            <div className="text-sm font-medium sm:text-base">#{order.order_number}</div>
                            <div className="text-xs text-gray-600 sm:text-sm">
                              {new Date(order.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 text-left sm:text-right sm:mt-0">
                            <div className="text-sm font-medium sm:text-base">${order.total_amount}</div>
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
            <div className="sticky rounded-lg shadow-sm card top-4 sm:top-8 bg-gray-50">
              <div className="p-4 border-b border-gray-200 sm:p-6">
                <h2 className="text-lg font-light sm:text-xl">
                  {selectedOrder ? `Order #${selectedOrder.order_number}` : 'Order Details'}
                </h2>
              </div>
              
              <div className="p-4 sm:p-6">
                {detailLoading ? (
                  <div className="space-y-3">
                    <div className="animate-pulse">
                      <div className="h-3 mb-2 bg-gray-200 rounded"></div>
                      <div className="h-3 mb-2 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ) : selectedOrder ? (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="mb-2 text-sm font-medium sm:text-base sm:mb-3">Items</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {selectedOrder.items?.map(item => (
                          <div key={item.id} className="flex flex-col items-start justify-between text-xs sm:flex-row sm:text-sm">
                            <div>
                              <div className="font-medium">{item.product_name}</div>
                              <div className="text-gray-600">
                                {item.size} • {item.color} • Qty: {item.quantity}
                              </div>
                            </div>
                            <div className="mt-2 text-left sm:text-right sm:mt-0">
                              <div>${item.unit_price}</div>
                              <div className="text-gray-600">${item.total_price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div className="pt-3 border-t border-gray-200 sm:pt-4">
                      <div className="flex items-center justify-between text-sm font-medium sm:text-base">
                        <span>Total</span>
                        <span>${selectedOrder.total_amount}</span>
                      </div>
                    </div>

                    {/* Order History */}
                    <div>
                      <h3 className="mb-2 text-sm font-medium sm:text-base sm:mb-3">Order History</h3>
                      <div className="space-y-2 text-xs sm:text-sm">
                        {selectedOrder.history?.map((history, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="capitalize">{history.status}</span>
                            <span className="text-gray-600">
                              {new Date(history.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-sm text-center text-gray-600 sm:py-8 sm:text-base">
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