import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { formatPrice } from '../utils/formatters';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, loading, removeFromCart, updateQuantity } = useCart();
  const [processingItem, setProcessingItem] = useState<string | null>(null);

  const handleRemove = async (productId: string) => {
    if (window.confirm('Deseja remover este item do carrinho?')) {
      setProcessingItem(productId);
      try {
        await removeFromCart(productId);
        // O toast já é exibido pelo CartContext
      } catch (error) {
        // O toast de erro já é exibido pelo CartContext
        console.error('Erro ao remover item:', error);
      } finally {
        setProcessingItem(null);
      }
    }
  };

  const handleQuantityChange = async (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    setProcessingItem(productId);
    try {
      await updateQuantity(productId, newQuantity);
      // O toast já é exibido pelo CartContext
    } catch (error) {
      // O toast de erro já é exibido pelo CartContext
      console.error('Erro ao atualizar quantidade:', error);
    } finally {
      setProcessingItem(null);
    }
  };

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho</h1>
          <button
            onClick={() => navigate('/produtos')}
            className="btn-outline"
          >
            Continuar Comprando
          </button>
        </div>
        
        {!cart || cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <img src="/cart.svg" alt="Carrinho vazio" className="w-24 h-24 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-6">
              Adicione produtos para começar suas compras
            </p>
            <button
              onClick={() => navigate('/produtos')}
              className="btn-primary"
            >
              Ver Produtos
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            {/* Items do carrinho */}
            <div className="divide-y">
              {cart.items.map((item) => (
                <div key={item.product._id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/product-placeholder.svg';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.product.category} • {item.product.unit}
                        </p>
                        <p className="text-primary font-semibold mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* Controle de quantidade */}
                      <div className="flex items-center space-x-2 border rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                          disabled={processingItem === item.product._id || item.quantity <= 1}
                          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                          disabled={processingItem === item.product._id}
                          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Subtotal e remover */}
                      <div className="text-right min-w-[120px]">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.product._id)}
                          disabled={processingItem === item.product._id}
                          className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
                        >
                          {processingItem === item.product._id ? 'Removendo...' : 'Remover'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total e finalizar */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">Subtotal ({cart.items.length} {cart.items.length === 1 ? 'item' : 'itens'})</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatPrice(cart.totalPrice)}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/pagamento')}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
