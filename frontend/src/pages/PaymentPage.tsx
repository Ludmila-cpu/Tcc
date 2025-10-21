import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { isValidCEP } from '../utils/formatters';
import toast from 'react-hot-toast';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | 'boleto'>('cartao');
  const [shippingAddress, setShippingAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validações
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      setError('Preencha todos os campos do endereço');
      toast.error('Preencha todos os campos do endereço');
      return;
    }
    
    // Validar CEP
    if (!isValidCEP(shippingAddress.zipCode)) {
      setError('CEP inválido. Use o formato 12345-678 ou 12345678');
      toast.error('CEP inválido');
      return;
    }
    
    if (!cart || cart.items.length === 0) {
      setError('Carrinho vazio');
      toast.error('Carrinho vazio');
      return;
    }

    setLoading(true);
    
    try {
      // Criar pedido
      const order = await ordersAPI.create({
        shippingAddress,
        paymentMethod,
      });
      
      // Limpar carrinho
      await clearCart();
      
      // Mostrar sucesso e redirecionar para página de sucesso
      toast.success('Pedido criado com sucesso! 🎉');
      navigate(`/pedido/${order._id}`);
    } catch (err: any) {
      console.error('Erro ao criar pedido:', err);
      const errorMsg = err.response?.data?.msg || err.message || 'Erro ao finalizar pedido';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Carrinho vazio
            </h2>
            <p className="text-gray-600 mb-6">
              Adicione produtos antes de finalizar a compra
            </p>
            <button onClick={() => navigate('/produtos')} className="btn-primary">
              Ver Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Pedido</h1>
          <button
            onClick={() => navigate('/carrinho')}
            className="btn-outline"
          >
            Voltar ao Carrinho
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Endereço de Entrega */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Endereço de Entrega
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rua e Número *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Rua Exemplo, 123"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="SP"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CEP *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="01000-000"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Método de Pagamento */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Método de Pagamento
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cartao"
                      checked={paymentMethod === 'cartao'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Cartão de Crédito</span>
                      <p className="text-sm text-gray-600">Parcelamento em até 3x sem juros</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">PIX</span>
                      <p className="text-sm text-gray-600">Aprovação imediata</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={paymentMethod === 'boleto'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Boleto Bancário</span>
                      <p className="text-sm text-gray-600">Vencimento em 3 dias úteis</p>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>
          
          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumo do Pedido
              </h2>
              
              <div className="space-y-3 mb-4">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : 'Finalizar Pedido'}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Ao finalizar, você concorda com nossos termos de uso
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
