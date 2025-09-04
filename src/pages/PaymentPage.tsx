import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pagamento</h1>
          <button
            onClick={() => navigate('/carrinho')}
            className="btn-outline"
          >
            Voltar ao Carrinho
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número do Cartão
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Validade
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="MM/AA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="123"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome no Cartão
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Nome completo"
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              onClick={(e) => {
                e.preventDefault();
                alert('Pagamento processado com sucesso!');
                navigate('/produtos');
              }}
            >
              Pagar R$ 99,90
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
