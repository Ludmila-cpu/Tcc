// Lista de produtos (agora será carregada da API)
let products = [];

// Carrinho de compras (sincronizado com backend se autenticado)
let cart = [];

// Atualiza o contador do carrinho
async function updateCartCount() {
    try {
        if (window.API && window.API.Auth.isAuthenticated()) {
            const cartData = await window.API.Cart.get();
            const count = cartData.items.reduce((total, item) => total + item.quantity, 0);
            const cartCountEl = document.getElementById('cart-count');
            if (cartCountEl) cartCountEl.textContent = count;
        } else {
            // Fallback para localStorage se não autenticado
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const count = localCart.reduce((total, item) => total + (item.quantity || 0), 0);
            const cartCountEl = document.getElementById('cart-count');
            if (cartCountEl) cartCountEl.textContent = count;
        }
    } catch (error) {
        console.error('Erro ao atualizar contador:', error);
        // Fallback para localStorage em caso de erro
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = localCart.reduce((total, item) => total + (item.quantity || 0), 0);
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) cartCountEl.textContent = count;
    }
}

// Adiciona produto ao carrinho
async function addToCart(productId) {
    try {
        if (window.API && window.API.Auth.isAuthenticated()) {
            // Usar API se autenticado
            await window.API.Cart.addItem(productId, 1);
            await updateCartCount();
            showNotification('Produto adicionado ao carrinho!');
        } else {
            // Fallback para localStorage
            const product = products.find(p => p._id === productId || p.id === productId);
            if (!product) {
                console.error('Produto não encontrado');
                return;
            }

            let localCart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = localCart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                localCart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(localCart));
            await updateCartCount();
            showNotification('Produto adicionado ao carrinho!');
        }
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        showNotification('Erro ao adicionar produto. Tente novamente.', 'error');
    }
}

// Mostrar notificação temporária
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#39b54a' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Cria cards de produtos
function createProductCard(product) {
    const productId = product._id || product.id;
    return `
        <div class="product-card">
            <img 
                src="${product.image}" 
                alt="${product.name} - imagem do produto orgânico" 
                class="product-image" 
                loading="lazy" 
                decoding="async" 
                referrerpolicy="no-referrer" 
                data-loading="true"
                onload="this.removeAttribute('data-loading')"
                onerror="this.onerror=null;this.setAttribute('data-error','true');this.removeAttribute('data-loading');this.src='src/assets/product-placeholder.svg';"
            >
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                <button onclick="addToCart('${productId}')" class="add-to-cart-btn">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
}

// Renderiza produtos na página
async function renderProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
        try {
            // Mostrar loading
            productList.innerHTML = '<p style="text-align:center; padding:2rem; color:#666;">Carregando produtos...</p>';

            // Buscar produtos da API
            if (window.API) {
                products = await window.API.Products.getAll();
            }

            if (products.length === 0) {
                productList.innerHTML = '<p style="text-align:center; padding:2rem; color:#666;">Nenhum produto disponível no momento.</p>';
                return;
            }

            productList.innerHTML = products.map(createProductCard).join('');
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            productList.innerHTML = '<p style="text-align:center; padding:2rem; color:#e74c3c;">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
        }
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
document.addEventListener('DOMContentLoaded', function () {
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
