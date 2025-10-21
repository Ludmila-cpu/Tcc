import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authAPI, User } from '../services/api';

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Tentar buscar dados atualizados do usuário
        try {
          const response = await authAPI.getProfile();
          setUser(response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        } catch (error) {
          console.error('Erro ao carregar perfil:', error);
          // Se falhar, limpar dados inválidos
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    loadStoredData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token } = response;

      // Salvar token
      localStorage.setItem('token', token);
      setToken(token);

      // Buscar dados do usuário
      const userResponse = await authAPI.getProfile();
      setUser(userResponse.user);
      localStorage.setItem('user', JSON.stringify(userResponse.user));
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw new Error(error.response?.data?.msg || 'Erro ao fazer login');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.register({ name, email, password });
      const { token } = response;

      // Salvar token
      localStorage.setItem('token', token);
      setToken(token);

      // Buscar dados do usuário
      const userResponse = await authAPI.getProfile();
      setUser(userResponse.user);
      localStorage.setItem('user', JSON.stringify(userResponse.user));
    } catch (error: any) {
      console.error('Erro no registro:', error);
      throw new Error(error.response?.data?.msg || 'Erro ao fazer registro');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      throw new Error(error.response?.data?.msg || 'Erro ao atualizar perfil');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
