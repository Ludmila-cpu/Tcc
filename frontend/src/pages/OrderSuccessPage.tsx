import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI, Order } from '../services/api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { formatPrice, formatDateTime, translateOrderStatus, getStatusColor } from '../utils/formatters';
import toast from 'react-hot-toast';

const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        navigate('/produtos');
        return;
      }

      try {
        setLoading(true);
        const data = await ordersAPI.getById(orderId);
        setOrder(data);
      } catch (err: any) {
        console.error('Erro ao buscar pedido:', err);
        setError(err.response?.data?.msg || 'Erro ao carregar pedido');
        toast.error('Não foi possível carregar os dados do pedido');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Loading />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pedido não encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'Não foi possível encontrar este pedido.'}
            </p>
            <button
              onClick={() => navigate('/produtos')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Voltar para Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pedido Realizado com Sucesso!
          </h1>
          <p className="text-gray-600 mb-4">
            Obrigado por comprar na Vereco. Seu pedido foi confirmado.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Número do Pedido</p>
            <p className="text-2xl font-bold text-primary">
              #{order._id?.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Status do Pedido</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
              {translateOrderStatus(order.status)}
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Pedido realizado em {formatDateTime(order.createdAt)}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Itens do Pedido</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => {
              const product = typeof item.product === 'string' ? null : item.product;
              return (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img
                      src={product?.image || '/product-placeholder.svg'}
                      alt={product?.name || item.name || 'Produto'}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {product?.name || item.name || 'Produto'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantidade: {item.quantity} {product?.unit || 'un'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.price)} cada
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Total */}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(order.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações de Entrega</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Endereço:</strong> {order.shippingAddress.street}, {order.shippingAddress.number}</p>
            {order.shippingAddress.complement && (
              <p><strong>Complemento:</strong> {order.shippingAddress.complement}</p>
            )}
            <p><strong>Bairro:</strong> {order.shippingAddress.neighborhood}</p>
            <p><strong>Cidade:</strong> {order.shippingAddress.city} - {order.shippingAddress.state}</p>
            <p><strong>CEP:</strong> {order.shippingAddress.zipCode}</p>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pagamento</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Método:</span>
            <span className="font-semibold text-gray-900 capitalize">
              {order.paymentMethod === 'cartao' && '💳 Cartão de Crédito'}
              {order.paymentMethod === 'pix' && '📱 PIX'}
              {order.paymentMethod === 'boleto' && '📄 Boleto'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/meus-pedidos')}
            className="flex-1 bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Ver Meus Pedidos
          </button>
          <button
            onClick={() => navigate('/produtos')}
            className="flex-1 bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Continuar Comprando
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-blue-500 text-xl">ℹ️</span>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Próximos Passos:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Você receberá um email de confirmação em breve</li>
                <li>Acompanhe o status do seu pedido em "Meus Pedidos"</li>
                <li>Prazo de entrega: 3-5 dias úteis</li>
                <li>Qualquer dúvida, entre em contato conosco</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
