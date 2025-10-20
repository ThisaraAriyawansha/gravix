'use client'

import { useState, useEffect } from 'react'
import { getAllOrders, updateOrderStatus, getOrderDetails } from '@/lib/api'

interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface Order {
  id: number
  order_number: string
  total_amount: number
  status: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  payment_method: string
  payment_status: string
  created_at: string
  shipping_address: string | ShippingAddress
  items_count?: number
}

interface OrderItem {
  id: number
  product_name: string
  size: string
  color: string
  quantity: number
  unit_price: number
  total_price: number
  product_variant_id: number
}

interface OrderDetails {
  id: number
  order_number: string
  total_amount: number
  status: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  payment_method: string
  payment_status: string
  created_at: string
  shipping_address: string | ShippingAddress
  items: OrderItem[]
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null)
  const [itemsLoading, setItemsLoading] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await getAllOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, { 
        status: newStatus,
        notes: `Status updated to ${newStatus}`
      })
      loadOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleViewDetails = async (order: Order) => {
    setItemsLoading(true)
    setShowDetailsModal(true)
    
    try {
      const orderDetails: OrderDetails = await getOrderDetails(order.id)
      setSelectedOrder(orderDetails)
    } catch (error) {
      console.error('Error loading order details:', error)
      setSelectedOrder(null)
    } finally {
      setItemsLoading(false)
    }
  }

  const closeModal = () => {
    setShowDetailsModal(false)
    setSelectedOrder(null)
  }

  const parseShippingAddress = (address: string | ShippingAddress): ShippingAddress | null => {
    if (typeof address === 'string') {
      try {
        return JSON.parse(address)
      } catch (error) {
        console.error('Error parsing shipping address:', error)
        return null
      }
    }
    return address
  }

  const formatShippingAddress = (address: string | ShippingAddress): string => {
    const parsed = parseShippingAddress(address)
    if (!parsed) return 'Invalid address format'
    
    return `${parsed.firstName} ${parsed.lastName}, ${parsed.address}, ${parsed.city}, ${parsed.state} ${parsed.postalCode}, ${parsed.country}`
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

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  const nextStatusMap: { [key: string]: string[] } = {
    pending: ['confirmed', 'cancelled'],
    confirmed: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered'],
    delivered: [],
    cancelled: []
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
        <div className="animate-pulse">
          <div className="w-1/3 h-6 mb-6 bg-gray-200 rounded sm:w-1/4 sm:h-8"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded sm:h-20"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-light sm:text-2xl sm:mb-2">Order Management</h1>
        <p className="text-sm text-gray-600 sm:text-base">Process and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="p-4 mb-4 card sm:p-5 sm:mb-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:px-4 sm:py-2.5"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:px-4 sm:py-2.5"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 sm:p-5">
          <h2 className="text-lg font-light sm:text-xl">
            Orders ({filteredOrders.length})
          </h2>
        </div>
        
        <div className="p-4 sm:p-5">
          {filteredOrders.length === 0 ? (
            <div className="py-6 text-sm text-center text-gray-500 sm:py-8 sm:text-base">
              No orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Mobile Cards View */}
              <div className="space-y-3 sm:hidden">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium text-gray-900">#{order.order_number}</div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mb-2 space-y-1 text-xs text-gray-600">
                      <div>{order.customer_name}</div>
                      <div>{order.customer_email}</div>
                    </div>
                    <div className="flex justify-between mb-3 text-xs">
                      <span>${order.total_amount}</span>
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {nextStatusMap[order.status]?.map((nextStatus) => (
                        <button
                          key={nextStatus}
                          onClick={() => handleStatusUpdate(order.id, nextStatus)}
                          className="px-2 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                        >
                          {nextStatus}
                        </button>
                      ))}
                      <button 
                        onClick={() => handleViewDetails(order)}
                        className="px-2 py-1 text-xs text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden w-full sm:table">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Order</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Customer</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Amount</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Status</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Date</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 sm:p-4">
                        <div className="text-sm font-medium sm:text-base">#{order.order_number}</div>
                        <div className="text-xs text-gray-600 capitalize sm:text-sm">
                          {order.payment_method} • {order.payment_status}
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <div>
                          <div className="text-sm font-medium sm:text-base">{order.customer_name}</div>
                          <div className="text-xs text-gray-600 sm:text-sm">{order.customer_email}</div>
                        </div>
                      </td>
                      <td className="p-3 text-sm font-medium sm:p-4 sm:text-base">
                        ${order.total_amount}
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-gray-600 sm:p-4 sm:text-sm">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {nextStatusMap[order.status]?.map((nextStatus) => (
                            <button
                              key={nextStatus}
                              onClick={() => handleStatusUpdate(order.id, nextStatus)}
                              className="px-2 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 sm:px-3 sm:text-sm"
                            >
                              {nextStatus}
                            </button>
                          ))}
                          <button 
                            onClick={() => handleViewDetails(order)}
                            className="px-2 py-1 text-xs text-white transition-colors bg-gray-600 rounded hover:bg-gray-700 sm:px-3 sm:text-sm"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black bg-opacity-50 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-light sm:text-xl">
                  Order #{selectedOrder?.order_number}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-2xl text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              {itemsLoading ? (
                <div className="py-6 text-center sm:py-8">
                  <div className="w-6 h-6 mx-auto border-b-2 border-blue-600 rounded-full animate-spin sm:w-8 sm:h-8"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading order details...</p>
                </div>
              ) : !selectedOrder ? (
                <div className="py-6 text-sm text-center text-gray-500 sm:py-8">
                  Error loading order details
                </div>
              ) : (
                <>
                  {/* Order Information */}
                  <div className="grid grid-cols-1 gap-4 mb-6 sm:gap-6 sm:mb-8 sm:grid-cols-2">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="mb-2 text-base font-medium sm:text-lg sm:mb-3">Customer Information</h4>
                        <div className="p-3 space-y-1 text-xs text-gray-600 rounded-lg bg-gray-50 sm:p-4 sm:space-y-2 sm:text-sm">
                          <div><strong className="text-gray-800">Name:</strong> {selectedOrder.customer_name}</div>
                          <div><strong className="text-gray-800">Email:</strong> {selectedOrder.customer_email}</div>
                          {selectedOrder.customer_phone && (
                            <div><strong className="text-gray-800">Phone:</strong> {selectedOrder.customer_phone}</div>
                          )}
                          <div className="mt-2 sm:mt-3">
                            <strong className="text-gray-800">Shipping Address:</strong> 
                            <div className="mt-1 text-gray-600">
                              {formatShippingAddress(selectedOrder.shipping_address)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="mb-2 text-base font-medium sm:text-lg sm:mb-3">Order Information</h4>
                        <div className="p-3 space-y-1 text-xs text-gray-600 rounded-lg bg-gray-50 sm:p-4 sm:space-y-2 sm:text-sm">
                          <div className="flex justify-between">
                            <strong className="text-gray-800">Status:</strong>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                              {selectedOrder.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <strong className="text-gray-800">Payment Method:</strong>
                            <span className="capitalize">{selectedOrder.payment_method}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong className="text-gray-800">Payment Status:</strong>
                            <span className="capitalize">{selectedOrder.payment_status}</span>
                          </div>
                          <div className="flex justify-between">
                            <strong className="text-gray-800">Order Date:</strong>
                            <span>{new Date(selectedOrder.created_at).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                            <strong className="text-gray-800">Total Amount:</strong>
                            <span className="font-bold">${selectedOrder.total_amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="mb-3 text-base font-medium sm:text-lg sm:mb-4">
                      Order Items ({selectedOrder.items?.length || 0})
                    </h4>
                    {!selectedOrder.items || selectedOrder.items.length === 0 ? (
                      <div className="py-6 text-sm text-center text-gray-500 rounded-lg bg-gray-50 sm:py-8">
                        No items found for this order
                      </div>
                    ) : (
                      <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full min-w-[500px]">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-2 text-xs font-medium text-left text-gray-700 sm:p-3 sm:text-sm">Product</th>
                              <th className="p-2 text-xs font-medium text-left text-gray-700 sm:p-3 sm:text-sm">Size</th>
                              <th className="p-2 text-xs font-medium text-left text-gray-700 sm:p-3 sm:text-sm">Color</th>
                              <th className="p-2 text-xs font-medium text-left text-gray-700 sm:p-3 sm:text-sm">Price</th>
                              <th className="p-2 text-xs font-medium text-left text-gray-700 sm:p-3 sm:text-sm">Qty</th>
                              <th className="p-2 text-xs font-medium text-left text-gray-700 sm:p-3 sm:text-sm">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.items.map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-2 sm:p-3">
                                  <div className="text-xs font-medium text-gray-900 sm:text-sm">{item.product_name}</div>
                                  <div className="text-xs text-gray-600">ID: {item.product_variant_id}</div>
                                </td>
                                <td className="p-2 text-xs text-gray-700 capitalize sm:p-3 sm:text-sm">{item.size}</td>
                                <td className="p-2 text-xs text-gray-700 capitalize sm:p-3 sm:text-sm">{item.color}</td>
                                <td className="p-2 text-xs text-gray-700 sm:p-3 sm:text-sm">${item.unit_price}</td>
                                <td className="p-2 text-xs text-gray-700 sm:p-3 sm:text-sm">{item.quantity}</td>
                                <td className="p-2 text-xs font-medium text-gray-900 sm:p-3 sm:text-sm">${item.total_price}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td colSpan={5} className="p-2 text-xs font-medium text-right text-gray-700 sm:p-3 sm:text-sm">
                                Order Total:
                              </td>
                              <td className="p-2 text-sm font-bold text-gray-900 sm:p-3 sm:text-base">
                                ${selectedOrder.total_amount}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200 sm:p-5">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700 sm:px-6 sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}