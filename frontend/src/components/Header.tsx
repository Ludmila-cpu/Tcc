import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/produtos')}
              className="text-gray-700 hover:text-primary font-medium"
            >
              Produtos
            </button>

            <button
              onClick={() => navigate('/meus-pedidos')}
              className="text-gray-700 hover:text-primary font-medium"
            >
              Meus Pedidos
            </button>

            <button
              onClick={() => navigate('/carrinho')}
              className="relative text-gray-700 hover:text-primary font-medium"
            >
              <div className="flex items-center space-x-1">
                <img src="/cart.svg" alt="Carrinho" className="w-6 h-6" />
                <span>Carrinho</span>
              </div>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/perfil')}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Sair
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
