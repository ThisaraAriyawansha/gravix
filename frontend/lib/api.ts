import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (userData: any) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

// Products API
export const getProducts = async (filters?: any) => {
  const response = await api.get('/products', { params: filters })
  return response.data
}

export const getProduct = async (slug: string) => {
  const response = await api.get(`/products/${slug}`)
  return response.data
}

export const getFeaturedProducts = async () => {
  const response = await api.get('/products?featured=true')
  return response.data
}

export const createProduct = async (productData: any) => {
  const response = await api.post('/products', productData)
  return response.data
}

export const updateProduct = async (id: number, productData: any) => {
  const response = await api.put(`/products/${id}`, productData)
  return response.data
}

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

// Cart API
export const getCart = async () => {
  const response = await api.get('/cart')
  return response.data
}

export const addToCart = async (product_variant_id: number, quantity: number) => {
  const response = await api.post('/cart', { product_variant_id, quantity })
  return response.data
}

export const updateCartItem = async (itemId: number, quantity: number) => {
  const response = await api.put(`/cart/${itemId}`, { quantity })
  return response.data
}

export const removeFromCart = async (itemId: number) => {
  const response = await api.delete(`/cart/${itemId}`)
  return response.data
}

export const clearCart = async () => {
  const response = await api.delete('/cart')
  return response.data
}

// Orders API
export const createOrder = async (orderData: any) => {
  const response = await api.post('/orders', orderData)
  return response.data
}

export const getOrders = async () => {
  const response = await api.get('/orders')
  return response.data
}

export const getOrderDetails = async (orderId: number) => {
  const response = await api.get(`/orders/${orderId}`)
  return response.data
}

// Admin API
export const getDashboardStats = async () => {
  const response = await api.get('/admin/stats')
  return response.data
}

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users')
  return response.data
}

export const updateUser = async (userId: number, userData: any) => {
  const response = await api.put(`/admin/users/${userId}`, userData)
  return response.data
}

export const getAdminOrders = async () => {
  const response = await api.get('/admin/orders')
  return response.data
}

export const updateOrderStatus = async (orderId: number, statusData: any) => {
  const response = await api.put(`/admin/orders/${orderId}/status`, statusData)
  return response.data
}

export const updateProductVariant = async (id: number, variantData: any) => {
  const response = await api.put(`/products/variants/${id}`, variantData);
  return response.data;
};

// Get product by ID (for admin edit)
export const getProductById = async (id: number) => {
  const response = await api.get(`/products/id/${id}`);
  return response.data;
};


// Product Variants API
export const createProductVariant = async (variantData: any) => {
  const response = await api.post('/admin/variants', variantData);
  return response.data;
};



export const deleteProductVariant = async (id: number) => {
  const response = await api.delete(`/admin/variants/${id}`);
  return response.data;
};


// Admin Products API
export const getAllProducts = async () => {
  const response = await api.get('/admin/products');
  return response.data;
};

// Admin Orders API
export const getAllOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

// Image Management API
export const uploadProductImages = async (formData: FormData) => {
  const response = await api.post('/products/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const setPrimaryImage = async (imageId: number, data: any) => {
  const response = await api.put(`/products/images/${imageId}/primary`, data);
  return response.data;
};

export const deleteProductImage = async (imageId: number) => {
  const response = await api.delete(`/products/images/${imageId}`);
  return response.data;
};

export const getProductImages = async (productVariantId: number) => {
  const response = await api.get(`/products/images/${productVariantId}`);
  return response.data;
};

// Enhanced Product API
export const createProductWithImages = async (formData: FormData) => {
  const response = await api.post('/admin/products/with-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadVariantImages = async (formData: FormData) => {
  const response = await api.post('/admin/variants/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api