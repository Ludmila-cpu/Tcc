import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Imagem1 from "../assets/Imagem1.svg";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirecionar para a página de login/produtos
    navigate(isAuthenticated ? "/produtos" : "/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navegação */}
      <nav className="flex justify-between items-center px-[5%] py-5 bg-white shadow-sm sticky top-0 z-50">
        <ul className="flex gap-8 list-none m-0 p-0">
          <li>
            <a
              href="/"
              className="text-[#333] no-underline font-medium px-0 py-2 relative hover:text-[#39b54a] border-b-2 border-[#39b54a]"
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="/produtos"
              onClick={(e) => {
                e.preventDefault();
                navigate("/produtos");
              }}
              className="text-[#333] no-underline font-medium px-0 py-2 relative hover:text-[#39b54a]"
            >
              Produtos
            </a>
          </li>
          <li>
            <a
              href="/sobre"
              className="text-[#333] no-underline font-medium px-0 py-2 relative hover:text-[#39b54a]"
            >
              Sobre Nós
            </a>
          </li>
        </ul>

        <div className="flex gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-[#333]">Olá, {user.name}</span>
              <button
                onClick={() => navigate("/perfil")}
                className="px-5 py-2.5 rounded-lg border-2 border-[#39b54a] bg-transparent text-[#39b54a] text-base cursor-pointer transition-all duration-300 hover:bg-[#39b54a] hover:text-white"
              >
                Perfil
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-lg border-2 border-[#39b54a] bg-transparent text-[#39b54a] text-base cursor-pointer transition-all duration-300 hover:bg-[#39b54a] hover:text-white"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-lg border-2 border-[#39b54a] bg-[#39b54a] text-white text-base cursor-pointer transition-all duration-300 hover:bg-[#2e9c3f] hover:border-[#2e9c3f]"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex justify-between items-center px-[10%] py-[60px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
        <div className="flex-1 pr-[60px]">
          <h1 className="text-5xl text-[#333] mb-5 leading-tight">
            Produtos Orgânicos
            <br />
            Direto do Produtor
          </h1>
          <p className="text-xl text-[#666] mb-8">
            Alimentos frescos, saudáveis e sustentáveis para sua mesa.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={Imagem1}
            alt="Ilustração Vereco"
            className="max-w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-[10%] py-[60px] bg-white">
        <div className="text-center p-8 rounded-xl bg-[#f8f9fa] transition-transform duration-300 hover:-translate-y-1">
          <div className="text-5xl mb-5">🌱</div>
          <h3 className="text-[#333] mb-4 text-xl font-semibold">
            100% Orgânico
          </h3>
          <p className="text-[#666]">
            Produtos certificados e livres de agrotóxicos
          </p>
        </div>
        <div className="text-center p-8 rounded-xl bg-[#f8f9fa] transition-transform duration-300 hover:-translate-y-1">
          <div className="text-5xl mb-5">🚚</div>
          <h3 className="text-[#333] mb-4 text-xl font-semibold">
            Entrega Fresca
          </h3>
          <p className="text-[#666]">Do produtor para sua casa com rapidez</p>
        </div>
        <div className="text-center p-8 rounded-xl bg-[#f8f9fa] transition-transform duration-300 hover:-translate-y-1">
          <div className="text-5xl mb-5">💚</div>
          <h3 className="text-[#333] mb-4 text-xl font-semibold">
            Sustentável
          </h3>
          <p className="text-[#666]">Apoiando pequenos produtores locais</p>
        </div>
      </section>

      {/* Modal de Login */}
      {showLoginModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-10 max-w-md w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 text-3xl text-[#999] cursor-pointer hover:text-[#333]"
              onClick={() => setShowLoginModal(false)}
            >
              ×
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl text-[#333] mb-2">Bem-vindo de volta!</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-[#333] mb-2 font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#ddd] rounded-lg text-base transition-all duration-300 focus:border-[#39b54a] focus:outline-none"
                />
              </div>
              <div>
                <label
                  className="block text-[#333] mb-2 font-medium"
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#ddd] rounded-lg text-base transition-all duration-300 focus:border-[#39b54a] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#39b54a] text-white py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[#2e9c3f]"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
