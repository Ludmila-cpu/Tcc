import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI, Product } from '../services/api';
import { formatPrice } from '../utils/formatters';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll({ page: 1, limit: 6 });
      setFeaturedProducts(response.products);
    } catch (err) {
      console.error('Erro ao carregar produtos em destaque:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Frutas', icon: '🍎', description: 'Frutas frescas e saudáveis' },
    { name: 'Verduras', icon: '🥬', description: 'Verduras e folhas verdes' },
    { name: 'Legumes', icon: '🥕', description: 'Legumes frescos' },
    { name: 'Orgânicos', icon: '🌿', description: 'Produtos 100% orgânicos' },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Bem-vindo ao Mercado Verde! 🌱
            </h1>
            <p className="text-xl mb-8 text-green-50">
              Produtos frescos e saudáveis direto para sua casa
            </p>
            <button
              onClick={() => navigate('/produtos')}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors duration-200 shadow-lg"
            >
              Ver Produtos
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nossas Categorias
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => navigate('/produtos')}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Produtos em Destaque
            </h2>
            <button
              onClick={() => navigate('/produtos')}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              Ver todos →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
                onClick={() => navigate('/produtos')}
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center p-8">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-6xl">🥗</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Por que escolher o Mercado Verde?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">✅</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Produtos Frescos
                    </h3>
                    <p className="text-gray-600">
                      Selecionamos os melhores produtos diretamente dos produtores locais
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🚚</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Entrega Rápida
                    </h3>
                    <p className="text-gray-600">
                      Receba seus produtos no conforto da sua casa em até 24 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">💚</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Sustentabilidade
                    </h3>
                    <p className="text-gray-600">
                      Comprometidos com práticas sustentáveis e embalagens eco-friendly
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🏆</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Qualidade Garantida
                    </h3>
                    <p className="text-gray-600">
                      100% de satisfação garantida ou seu dinheiro de volta
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-6">🥬🥕🍎</div>
                <p className="text-2xl font-semibold text-gray-800">
                  Alimentação saudável começa aqui!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar? 🛒
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Faça seu primeiro pedido e ganhe 10% de desconto!
          </p>
          <button
            onClick={() => navigate('/produtos')}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors duration-200 shadow-lg"
          >
            Começar a Comprar
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
