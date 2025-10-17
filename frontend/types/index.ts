export interface User {
  id: number
  email: string
  full_name: string
  phone: string
  avatar_url: string
  role: 'admin' | 'customer'
  is_active: boolean
  created_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image_url: string
  parent_id: number | null
  is_active: boolean
  created_at: string
}

export interface ProductVariant {
  id: number
  product_id: number
  size: string
  color: string
  color_hex: string
  price: number
  discount_price: number | null
  stock_quantity: number
  sku: string
  created_at: string
  images: ProductImage[]
}

export interface ProductImage {
  id: number
  product_variant_id: number
  image_url: string
  is_primary: boolean
  alt_text: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  category_id: number
  category_name: string
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  variants: ProductVariant[]
}

export interface CartItem {
  id: number
  user_id: number
  product_variant_id: number
  quantity: number
  size: string
  color: string
  price: number
  discount_price: number | null
  product_name: string
  product_slug: string
  image: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_variant_id: number
  product_name: string
  size: string
  color: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface OrderStatusHistory {
  id: number
  order_id: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  notes: string
  created_at: string
}

export interface Order {
  id: number
  user_id: number
  order_number: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: string
  customer_name: string
  customer_phone: string
  customer_email: string
  payment_method: 'card' | 'paypal' | 'cod'
  payment_status: 'pending' | 'paid' | 'failed'
  created_at: string
  updated_at: string
  items?: OrderItem[]
  history?: OrderStatusHistory[]
}

export interface DashboardStats {
  stats: {
    totalSales: number
    totalOrders: number
    totalProducts: number
    totalUsers: number
  }
  recentOrders: Order[]
}