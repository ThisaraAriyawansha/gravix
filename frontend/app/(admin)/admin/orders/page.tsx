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
  shipping_address: string | ShippingAddress // Can be string or parsed object
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
      loadOrders() // Refresh the list
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

  // Helper function to parse shipping address
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

  // Helper function to format shipping address for display
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
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="animate-pulse">
          <div className="w-1/4 h-8 mb-8 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-light">Order Management</h1>
        <p className="text-gray-600">Process and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="p-6 mb-6 card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search orders by number, customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
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
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-light">
            Orders ({filteredOrders.length})
          </h2>
        </div>
        
        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 font-medium text-left">Order</th>
                    <th className="p-4 font-medium text-left">Customer</th>
                    <th className="p-4 font-medium text-left">Amount</th>
                    <th className="p-4 font-medium text-left">Status</th>
                    <th className="p-4 font-medium text-left">Date</th>
                    <th className="p-4 font-medium text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="font-medium">#{order.order_number}</div>
                        <div className="text-sm text-gray-600 capitalize">
                          {order.payment_method} • {order.payment_status}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.customer_name}</div>
                          <div className="text-sm text-gray-600">{order.customer_email}</div>
                        </div>
                      </td>
                      <td className="p-4 font-medium">
                        ${order.total_amount}
                      </td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {nextStatusMap[order.status]?.map((nextStatus) => (
                            <button
                              key={nextStatus}
                              onClick={() => handleStatusUpdate(order.id, nextStatus)}
                              className="px-3 py-1 text-sm text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                            >
                              Mark as {nextStatus}
                            </button>
                          ))}
                          <button 
                            onClick={() => handleViewDetails(order)}
                            className="px-3 py-1 text-sm text-white transition-colors bg-gray-600 rounded hover:bg-gray-700"
                          >
                            View Details
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-light">
                  Order Details - #{selectedOrder?.order_number}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-2xl text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {itemsLoading ? (
                <div className="py-8 text-center">
                  <div className="w-8 h-8 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Loading order details...</p>
                </div>
              ) : !selectedOrder ? (
                <div className="py-8 text-center text-gray-500">
                  Error loading order details
                </div>
              ) : (
                <>
                  {/* Order Information */}
                  <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-3 text-lg font-medium">Customer Information</h4>
                        <div className="p-4 space-y-2 text-sm text-gray-600 rounded-lg bg-gray-50">
                          <div><strong className="text-gray-800">Name:</strong> {selectedOrder.customer_name}</div>
                          <div><strong className="text-gray-800">Email:</strong> {selectedOrder.customer_email}</div>
                          {selectedOrder.customer_phone && (
                            <div><strong className="text-gray-800">Phone:</strong> {selectedOrder.customer_phone}</div>
                          )}
                          <div className="mt-3">
                            <strong className="text-gray-800">Shipping Address:</strong> 
                            <div className="mt-1 text-gray-600">
                              {formatShippingAddress(selectedOrder.shipping_address)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-3 text-lg font-medium">Order Information</h4>
                        <div className="p-4 space-y-2 text-sm text-gray-600 rounded-lg bg-gray-50">
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
                            <strong className="text-base text-gray-800">Total Amount:</strong>
                            <span className="text-lg font-bold">${selectedOrder.total_amount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="mb-4 text-lg font-medium">Order Items ({selectedOrder.items?.length || 0})</h4>
                    {!selectedOrder.items || selectedOrder.items.length === 0 ? (
                      <div className="py-8 text-center text-gray-500 rounded-lg bg-gray-50">
                        No items found for this order
                      </div>
                    ) : (
                      <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-4 font-medium text-left text-gray-700">Product</th>
                              <th className="p-4 font-medium text-left text-gray-700">Size</th>
                              <th className="p-4 font-medium text-left text-gray-700">Color</th>
                              <th className="p-4 font-medium text-left text-gray-700">Unit Price</th>
                              <th className="p-4 font-medium text-left text-gray-700">Quantity</th>
                              <th className="p-4 font-medium text-left text-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.items.map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4">
                                  <div className="font-medium text-gray-900">{item.product_name}</div>
                                  <div className="text-sm text-gray-600">Variant ID: {item.product_variant_id}</div>
                                </td>
                                <td className="p-4 text-gray-700 capitalize">{item.size}</td>
                                <td className="p-4 text-gray-700 capitalize">{item.color}</td>
                                <td className="p-4 text-gray-700">${item.unit_price}</td>
                                <td className="p-4 text-gray-700">{item.quantity}</td>
                                <td className="p-4 font-medium text-gray-900">${item.total_price}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td colSpan={5} className="p-4 font-medium text-right text-gray-700">
                                Order Total:
                              </td>
                              <td className="p-4 text-lg font-bold text-gray-900">
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

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-6 py-2 font-medium text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
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