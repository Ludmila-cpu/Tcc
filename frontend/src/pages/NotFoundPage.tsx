import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-green-600 mb-4">404</div>
            <div className="text-6xl mb-6">🤔</div>
          </div>

          {/* Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Página não encontrada
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ops! Parece que você se perdeu no nosso mercado. 
            A página que você está procurando não existe ou foi movida.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/produtos')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Ver Produtos
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200"
            >
              Voltar
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Ou explore estas páginas:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/produtos')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                🛒 Produtos
              </button>
              <button
                onClick={() => navigate('/carrinho')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                🛍️ Carrinho
              </button>
              <button
                onClick={() => navigate('/meus-pedidos')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                📦 Meus Pedidos
              </button>
              <button
                onClick={() => navigate('/perfil')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                👤 Perfil
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
