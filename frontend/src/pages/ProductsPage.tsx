import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <button
            onClick={() => navigate('/carrinho')}
            className="btn-primary"
          >
            Ver Carrinho
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Exemplo de produtos - você pode adicionar mais depois */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="aspect-w-1 aspect-h-1 mb-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Produto 1</h3>
            <p className="text-gray-600 mb-4">Descrição do produto 1</p>
            <button className="btn-primary w-full">
              Adicionar ao Carrinho
            </button>
          </div>
          
          {/* Mais produtos podem ser adicionados aqui */}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
