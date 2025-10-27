console.log('=== DEBUG CARRINHO ===');
const cart = localStorage.getItem('cart');
console.log('Cart raw:', cart);
console.log('Cart parsed:', JSON.parse(cart || '[]'));
