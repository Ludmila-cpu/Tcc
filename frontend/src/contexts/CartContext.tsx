import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { cartAPI, Cart } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextData {
  cart: Cart | null;
  loading: boolean;
  itemCount: number;
  totalPrice: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  // Carregar carrinho quando usuário estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const refreshCart = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const data = await cartAPI.get();
      setCart(data);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    setLoading(true);
    try {
      const data = await cartAPI.addItem({ productId, quantity });
      setCart(data);
      toast.success('Produto adicionado ao carrinho! 🛒');
    } catch (error: any) {
      console.error('Erro ao adicionar ao carrinho:', error);
      const errorMsg = error.response?.data?.msg || 'Erro ao adicionar ao carrinho';
      toast.error(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    setLoading(true);
    try {
      const data = await cartAPI.updateItem(productId, quantity);
      setCart(data);
      toast.success('Quantidade atualizada');
    } catch (error: any) {
      console.error('Erro ao atualizar quantidade:', error);
      const errorMsg = error.response?.data?.msg || 'Erro ao atualizar quantidade';
      toast.error(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    try {
      const data = await cartAPI.removeItem(productId);
      setCart(data);
      toast.success('Produto removido do carrinho');
    } catch (error: any) {
      console.error('Erro ao remover do carrinho:', error);
      const errorMsg = error.response?.data?.msg || 'Erro ao remover do carrinho';
      toast.error(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartAPI.clear();
      setCart(null);
    } catch (error: any) {
      console.error('Erro ao limpar carrinho:', error);
      throw new Error(error.response?.data?.msg || 'Erro ao limpar carrinho');
    } finally {
      setLoading(false);
    }
  };

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = cart?.totalPrice || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        itemCount,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
