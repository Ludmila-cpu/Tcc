// Lista de produtos (Frutas e Legumes)
const products = [
    {
        id: 1,
        name: 'Maçã Orgânica',
        price: 7.90,
        description: 'Maçãs frescas e crocantes cultivadas sem agrotóxicos (500g)',
        image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 2,
        name: 'Banana Nanica',
        price: 5.50,
        description: 'Bananas maduras e doces ideais para lanches (1kg)',
        image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e43e?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 3,
        name: 'Cenoura',
        price: 4.20,
        description: 'Cenouras crocantes ricas em betacaroteno (500g)',
        image: 'https://images.unsplash.com/photo-1582515073490-dc84f5ed9b32?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 4,
        name: 'Tomate Italiano',
        price: 8.40,
        description: 'Tomates suculentos ideais para molhos e saladas (500g)',
        image: 'https://images.unsplash.com/photo-1561136594-7f68413bfae3?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 5,
        name: 'Alface Crespa',
        price: 3.90,
        description: 'Folhas verdes e frescas para uma salada saudável (unidade)',
        image: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=600&q=80'
    }
];

// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualiza o contador do carrinho
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Adiciona produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Cria cards de produtos
function createProductCard(product) {
    return `
        <div class="product-card">
            <img 
                src="${product.image}" 
                alt="${product.name} - imagem do produto orgânico" 
                class="product-image" 
                loading="lazy" 
                decoding="async" 
                referrerpolicy="no-referrer" 
                onerror="this.onerror=null;this.src='src/assets/product-placeholder.svg';"
            >
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
}

// Renderiza produtos na página
function renderProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = products.map(createProductCard).join('');
    }
}

// Renderiza itens do carrinho
function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartContents = document.getElementById('cart-contents');
    const cartResumo = document.getElementById('cart-resumo');
    
    if (cartList && cartTotal) {
        if (cart.length === 0) {
            cartContents.innerHTML = '<p>Seu carrinho está vazio</p>';
            cartResumo.style.display = 'none';
        } else {
            cartList.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `R$ ${total.toFixed(2)}`;
            cartResumo.style.display = 'block';
        }
    }
}

// Função para finalizar a compra
function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    window.location.href = 'pagamento.html';
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa produtos se estiver na página de produtos
    renderProducts();
    
    // Inicializa carrinho se estiver na página do carrinho
    renderCart();
    
    // Atualiza contador do carrinho em todas as páginas
    updateCartCount();
    
    // Se houver um botão de finalizar compra, adiciona o evento
    const btnFinalizar = document.getElementById('btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', checkout);
    }
});
