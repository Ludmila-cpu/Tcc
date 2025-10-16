import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carrinho</h1>
          <button
            onClick={() => navigate('/produtos')}
            className="btn-outline"
          >
            Continuar Comprando
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          {/* Exemplo de item no carrinho */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div>
                  <h3 className="text-lg font-semibold">Produto 1</h3>
                  <p className="text-gray-600">Quantidade: 1</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">R$ 99,90</p>
                <button className="text-red-500 hover:text-red-700">
                  Remover
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Total:</span>
              <span className="text-2xl font-bold">R$ 99,90</span>
            </div>
            
            <button
              onClick={() => navigate('/pagamento')}
              className="btn-primary w-full"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
