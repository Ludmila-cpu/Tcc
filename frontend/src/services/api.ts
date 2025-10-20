import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Configuração base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT em todas as requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== TIPOS =====
export interface User {
  _id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  isAdmin: boolean;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'frutas' | 'verduras' | 'processados' | 'mel';
  stock: number;
  unit: 'kg' | 'un' | 'frasco';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: string;
  items: {
    product: Product | string;
    name?: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: 'pendente' | 'processando' | 'enviado' | 'entregue' | 'cancelado';
  shippingAddress: {
    street: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: 'cartao' | 'pix' | 'boleto';
  paymentStatus: 'pendente' | 'aprovado' | 'recusado';
  createdAt: string;
  updatedAt?: string;
}

// ===== AUTENTICAÇÃO =====
export const authAPI = {
  // Registrar novo usuário
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  // Login
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  // Obter perfil do usuário
  getProfile: async (): Promise<{ success: boolean; user: User }> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  // Atualizar perfil
  updateProfile: async (data: Partial<User>): Promise<{ success: boolean; user: User }> => {
    const response = await api.put('/api/auth/profile', data);
    return response.data;
  },
};

// ===== PRODUTOS =====
export const productsAPI = {
  // Listar produtos com filtros
  getAll: async (params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sort?: string;
  }) => {
    const response = await api.get('/api/products', { params });
    return response.data;
  },

  // Buscar produto por ID
  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  },

  // Criar produto (admin)
  create: async (data: Omit<Product, '_id' | 'createdAt'>): Promise<Product> => {
    const response = await api.post('/api/products', data);
    return response.data;
  },

  // Atualizar produto (admin)
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
  },

  // Deletar produto (admin)
  delete: async (id: string) => {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  },
};

// ===== CARRINHO =====
export const cartAPI = {
  // Obter carrinho
  get: async (): Promise<Cart> => {
    const response = await api.get('/api/cart');
    return response.data;
  },

  // Adicionar item ao carrinho
  addItem: async (data: { productId: string; quantity: number }): Promise<Cart> => {
    const response = await api.post('/api/cart/add', data);
    return response.data;
  },

  // Atualizar quantidade
  updateItem: async (productId: string, quantity: number): Promise<Cart> => {
    const response = await api.put(`/api/cart/update/${productId}`, { quantity });
    return response.data;
  },

  // Remover item
  removeItem: async (productId: string): Promise<Cart> => {
    const response = await api.delete(`/api/cart/remove/${productId}`);
    return response.data;
  },

  // Limpar carrinho
  clear: async () => {
    const response = await api.delete('/api/cart/clear');
    return response.data;
  },
};

// ===== PEDIDOS =====
export const ordersAPI = {
  // Criar pedido
  create: async (data: {
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    paymentMethod: 'cartao' | 'pix' | 'boleto';
  }): Promise<Order> => {
    const response = await api.post('/api/orders', data);
    return response.data;
  },

  // Listar pedidos do usuário
  getAll: async (): Promise<Order[]> => {
    const response = await api.get('/api/orders');
    return response.data;
  },

  // Buscar pedido específico
  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },

  // Atualizar status (admin)
  updateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const response = await api.put(`/api/orders/${id}/status`, { status });
    return response.data;
  },

  // Listar todos os pedidos (admin)
  getAllAdmin: async (): Promise<Order[]> => {
    const response = await api.get('/api/orders/admin/all');
    return response.data;
  },
};

// ===== SISTEMA =====
export const systemAPI = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Informações da API
  getInfo: async () => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api;
