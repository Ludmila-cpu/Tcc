// Módulo de comunicação com a API Backend
const API_URL = 'http://localhost:5000/api';

// Gerenciamento de token JWT
const TokenManager = {
    get() {
        return localStorage.getItem('authToken');
    },
    set(token) {
        localStorage.setItem('authToken', token);
    },
    remove() {
        localStorage.removeItem('authToken');
    },
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = this.get();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }
};

// Cliente HTTP genérico
async function request(endpoint, options = {}) {
    const config = {
        ...options,
        headers: {
            ...TokenManager.getHeaders(),
            ...options.headers
        }
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || data.message || 'Erro na requisição');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// API de Autenticação
const AuthAPI = {
    async register(userData) {
        const data = await request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        if (data.token) {
            TokenManager.set(data.token);
        }
        return data;
    },

    async login(credentials) {
        const data = await request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        if (data.token) {
            TokenManager.set(data.token);
        }
        return data;
    },

    async getMe() {
        return request('/auth/me');
    },

    logout() {
        TokenManager.remove();
        localStorage.removeItem('currentUser');
    },

    isAuthenticated() {
        return !!TokenManager.get();
    }
};

// API de Produtos
const ProductsAPI = {
    async getAll() {
        return request('/products');
    },

    async getById(id) {
        return request(`/products/${id}`);
    },

    async create(productData) {
        return request('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    },

    async update(id, productData) {
        return request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    },

    async delete(id) {
        return request(`/products/${id}`, {
            method: 'DELETE'
        });
    }
};

// API de Carrinho
const CartAPI = {
    async get() {
        return request('/cart');
    },

    async addItem(productId, quantity = 1) {
        return request('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity })
        });
    },

    async updateItem(productId, quantity) {
        return request(`/cart/update/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    },

    async removeItem(productId) {
        return request(`/cart/remove/${productId}`, {
            method: 'DELETE'
        });
    },

    async clear() {
        return request('/cart/clear', {
            method: 'DELETE'
        });
    }
};

// API de Pedidos
const OrdersAPI = {
    async create(orderData) {
        return request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },

    async getAll() {
        return request('/orders');
    },

    async getById(id) {
        return request(`/orders/${id}`);
    },

    async updateStatus(id, status) {
        return request(`/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    },

    async getAllAdmin() {
        return request('/orders/admin/all');
    }
};

// Exportar para uso global
window.API = {
    Auth: AuthAPI,
    Products: ProductsAPI,
    Cart: CartAPI,
    Orders: OrdersAPI,
    TokenManager
};
