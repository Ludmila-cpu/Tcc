import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI, Order } from '../services/api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { formatPrice, formatDate, translateOrderStatus, getStatusColor } from '../utils/formatters';
import toast from 'react-hot-toast';

const OrdersHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('todos');

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const data = await ordersAPI.getAll();
        setOrders(data);
      } catch (err: any) {
        console.error('Erro ao buscar pedidos:', err);
        toast.error('Não foi possível carregar seus pedidos');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'todos') return true;
    return order.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
          <p className="text-gray-600">
            Acompanhe o status de todos os seus pedidos
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('todos')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'todos'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pendente')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'pendente'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendentes ({orders.filter(o => o.status === 'pendente').length})
            </button>
            <button
              onClick={() => setFilter('processando')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'processando'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Processando ({orders.filter(o => o.status === 'processando').length})
            </button>
            <button
              onClick={() => setFilter('enviado')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'enviado'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Enviados ({orders.filter(o => o.status === 'enviado').length})
            </button>
            <button
              onClick={() => setFilter('entregue')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'entregue'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Entregues ({orders.filter(o => o.status === 'entregue').length})
            </button>
            <button
              onClick={() => setFilter('cancelado')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'cancelado'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancelados ({orders.filter(o => o.status === 'cancelado').length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filter === 'todos' ? 'Nenhum pedido ainda' : `Nenhum pedido ${translateOrderStatus(filter).toLowerCase()}`}
            </h2>
            <p className="text-gray-600 mb-6">
              {filter === 'todos'
                ? 'Comece a comprar agora e seus pedidos aparecerão aqui.'
                : 'Quando você tiver pedidos neste status, eles aparecerão aqui.'}
            </p>
            {filter === 'todos' && (
              <button
                onClick={() => navigate('/produtos')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
              >
                Explorar Produtos
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/pedido/${order._id}`)}
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Pedido #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {translateOrderStatus(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Realizado em {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                    </p>
                    <div className="flex gap-2 overflow-x-auto">
                      {order.items.slice(0, 5).map((item, index) => {
                        const product = typeof item.product === 'string' ? null : item.product;
                        return (
                          <div
                            key={index}
                            className="flex-shrink-0"
                            title={product?.name || item.name || 'Produto'}
                          >
                            <img
                              src={product?.image || '/product-placeholder.svg'}
                              alt={product?.name || item.name || 'Produto'}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          </div>
                        );
                      })}
                      {order.items.length > 5 && (
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            +{order.items.length - 5}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span>📍</span>
                        <span>
                          {order.shippingAddress.city} - {order.shippingAddress.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {order.paymentMethod === 'cartao' && <span>💳 Cartão</span>}
                        {order.paymentMethod === 'pix' && <span>📱 PIX</span>}
                        {order.paymentMethod === 'boleto' && <span>📄 Boleto</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="bg-gray-50 px-6 py-3 rounded-b-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/pedido/${order._id}`);
                    }}
                    className="text-primary hover:text-green-600 font-semibold text-sm transition"
                  >
                    Ver Detalhes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Products Button */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/produtos')}
              className="text-primary hover:text-green-600 font-semibold transition"
            >
              ← Voltar para Produtos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistoryPage;
