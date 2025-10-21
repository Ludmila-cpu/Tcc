// Módulo de comunicação com a API Backend
// Base dinâmica: usa o hostname atual (localhost ou 127.0.0.1) e permite override via localStorage (API_BASE)
function normalizeBase(base) {
    if (!base) return null;
    const trimmed = String(base).trim().replace(/\/$/, '');
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `http://${trimmed}`; // backend roda em HTTP na porta 5000
}

const DEFAULT_HOST = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : 'localhost';
let API_BASE = normalizeBase(localStorage.getItem('API_BASE')) || `http://${DEFAULT_HOST}:5000`;
let API_URL = `${API_BASE}/api`;

function setApiBase(newBase) {
    const normalized = normalizeBase(newBase) || `http://${DEFAULT_HOST}:5000`;
    API_BASE = normalized;
    API_URL = `${API_BASE}/api`;
    try { localStorage.setItem('API_BASE', API_BASE); } catch { }
    console.info('[API] Base configurada para:', API_BASE);
}

function getApiBase() { return API_BASE; }

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
        const url = `${API_URL}${endpoint}`;
        const response = await fetch(url, config);
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
        // Busca e normaliza o formato da resposta para sempre retornar um array de produtos
        const data = await request('/products');
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.products)) return data.products;
        console.warn('[ProductsAPI.getAll] Formato inesperado de resposta:', data);
        return [];
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
    TokenManager,
    getBase: getApiBase,
    setBase: setApiBase
};
