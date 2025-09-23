// Lista de produtos
const products = [
    {
        id: 1,
        name: 'Ração Premium',
        price: 89.90,
        description: 'Ração premium para cães adultos de todas as raças',
        image: 'src/assets/products/racao.jpg'
    },
    {
        id: 2,
        name: 'Coleira Ajustável',
        price: 29.90,
        description: 'Coleira ajustável com fecho de segurança',
        image: 'src/assets/products/coleira.jpg'
    },
    {
        id: 3,
        name: 'Brinquedo Interativo',
        price: 39.90,
        description: 'Brinquedo para estimular seu pet',
        image: 'src/assets/products/brinquedo.jpg'
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
            <img src="${product.image}" alt="${product.name}" class="product-image">
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
