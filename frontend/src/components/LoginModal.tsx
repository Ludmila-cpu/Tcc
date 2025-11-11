import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isValidEmail } from "../utils/formatters";
import toast from "react-hot-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, initialMode = "login" }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Resetar modo quando o modal abrir com um novo initialMode
  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === "login");
      setFormData({ name: "", email: "", password: "" });
      setError("");
    }
  }, [isOpen, initialMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!isValidEmail(formData.email)) {
      setError("Email inválido");
      toast.error("Email inválido");
      return;
    }

    if (formData.password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres");
      toast.error("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setError("Nome é obrigatório");
      toast.error("Nome é obrigatório");
      return;
    }

    if (!isLogin && formData.name.trim().length < 3) {
      setError("Nome deve ter no mínimo 3 caracteres");
      toast.error("Nome deve ter no mínimo 3 caracteres");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Login realizado com sucesso! 👋");
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success("Conta criada com sucesso! 🎉");
      }
      onClose();
      navigate("/produtos");
    } catch (err: any) {
      console.error("❌ Erro detalhado no modal:", err);
      let errorMsg = "Erro no servidor";

      if (err.response?.data?.msg) {
        errorMsg = err.response.data.msg;
      } else if (err.message) {
        errorMsg = err.message;
      } else if (!navigator.onLine) {
        errorMsg = "Sem conexão com a internet";
      } else if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
        errorMsg = "Tempo de conexão esgotado. Verifique sua internet.";
      } else if (err.message?.includes("Network Error")) {
        errorMsg = "Erro de rede. Verifique se o servidor está online.";
      }

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "" });
    setError("");
    setIsLogin(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl p-10 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5 text-3xl text-[#999] cursor-pointer hover:text-[#333] transition-colors"
          onClick={handleClose}
        >
          ×
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Bem-vindo de volta!" : "Criar conta"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Entre com seus dados"
              : "Preencha os dados para se cadastrar"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent transition-all"
                placeholder="Seu nome completo"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">
                Mínimo de 6 caracteres
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#39b54a] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[#2e9c3f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processando..." : isLogin ? "Entrar" : "Registrar"}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFormData({ name: "", email: "", password: "" });
            }}
            className="text-[#39b54a] hover:text-[#2e9c3f] font-medium text-sm w-full text-center transition-colors"
          >
            {isLogin
              ? "Não tem uma conta? Registre-se"
              : "Já tem uma conta? Faça login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
