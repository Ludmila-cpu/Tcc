import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isValidEmail } from "../utils/formatters";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

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
      navigate("/");
    } catch (err: any) {
      const errorMsg = err.message || "Erro ao processar requisição";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src="/Imagem2.svg"
            alt="Vereco Logo"
            className="w-40 mx-auto mb-4"
          />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="text-primary hover:text-primary-dark font-medium text-sm w-full text-center"
          >
            {isLogin
              ? "Não tem uma conta? Registre-se"
              : "Já tem uma conta? Faça login"}
          </button>
        </div>

        {/* Social login - em breve */}
        {/* <div className="mt-6">
          <p className="text-center text-gray-600 text-sm mb-4">Ou entre com</p>
          <div className="flex gap-4 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <img src="/logo-google-.png" alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <img src="/face.svg" alt="Facebook" className="w-5 h-5" />
              Facebook
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
