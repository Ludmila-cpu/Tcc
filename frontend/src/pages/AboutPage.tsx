import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Imagem2 from "../assets/Imagem2.svg";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navegação */}
      <nav className="flex justify-between items-center px-[5%] py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-3 no-underline" aria-label="Vereco - Início">
            <img src={Imagem2} alt="Vereco Logo" className="h-10 w-auto" />
          </a>

          <ul className="flex gap-8 list-none m-0 p-0">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="text-[#333] no-underline font-medium px-0 py-2 relative hover:text-[#39b54a]"
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
                className="text-[#333] no-underline font-medium px-0 py-2 relative hover:text-[#39b54a] border-b-2 border-[#39b54a]"
              >
                Sobre Nós
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-[#333]">Olá, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-lg border-2 border-[#39b54a] bg-transparent text-[#39b54a] text-base cursor-pointer transition-all duration-300 hover:bg-[#39b54a] hover:text-white"
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2.5 rounded-lg border-2 border-[#39b54a] bg-transparent text-[#39b54a] text-base cursor-pointer transition-all duration-300 hover:bg-[#39b54a] hover:text-white"
              >
                Entrar
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-12 bg-white border-b border-gray-200">
        <h1 className="text-4xl text-[#333] mb-4">Quem Somos</h1>
        <p className="text-xl text-[#666]">
          Conectamos produtores locais a consumidores que buscam alimentos mais saudáveis e sustentáveis.
        </p>
      </header>

      {/* Main Content */}
      <main className="px-[10%] py-12 bg-[#f8f9fa]">
        <section className="max-w-[920px] mx-auto bg-white p-10 rounded-2xl shadow-sm mb-10">
          <h2 className="text-3xl text-[#2d2d2d] mb-5 mt-0">Nossa Finalidade</h2>
          <p className="mb-4 text-[#555] text-base leading-relaxed">
            O site <strong>Vereco</strong> foi criado com o propósito de aproximar pessoas de alimentos frescos
            e de origem transparente. Acreditamos que comer bem não precisa ser complicado: ao reunir em um só
            lugar frutas e hortaliças selecionadas, ajudamos você a comprar de forma consciente, enquanto
            fortalecemos pequenos produtores e práticas agrícolas sustentáveis.
          </p>
          <p className="mb-4 text-[#555] text-base leading-relaxed">
            Aqui você encontra um catálogo simples, carrinho de compras e um fluxo de finalização pensado para
            demonstrar uma experiência de compra limpa e objetiva. Em versões futuras, planejamos integrar
            pagamentos reais, rastreabilidade de origem, avaliações de produtores e personalização baseada em
            preferências nutricionais.
          </p>
          <p className="mb-4 text-[#555] text-base leading-relaxed">
            Este projeto também serve como base acadêmica / prototípica, mostrando conceitos como persistência
            local (localStorage), gerenciamento básico de estado do carrinho e uma autenticação simulada. A
            evolução natural inclui modularização do código, API real, otimização de desempenho e acessibilidade
            aprimorada.
          </p>
          <p className="mb-0 text-[#555] text-base leading-relaxed">
            Obrigado por visitar e fazer parte dessa jornada rumo a uma alimentação mais consciente! 🌱
          </p>
        </section>

        <section className="max-w-[920px] mx-auto bg-white p-10 rounded-2xl shadow-sm">
          <h2 className="text-3xl text-[#2d2d2d] mb-5 mt-0">Informações da Vereco</h2>
          <p className="mb-8 text-[#555] text-base leading-relaxed">
            A <strong>Vereco</strong> nasce com o compromisso de tornar o acesso a alimentos orgânicos simples,
            transparente e confiável. Nosso foco é conectar diretamente produtores que adotam práticas
            responsáveis a consumidores que valorizam origem e frescor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8f9fa] p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-[#2d2d2d] mb-3 mt-1">Contato Oficial</h3>
              <p className="text-[#555] text-sm mb-2">
                Email:{" "}
                <a href="mailto:contato@vereco.com.br" className="text-[#39b54a] no-underline hover:underline">
                  contato@vereco.com.br
                </a>
              </p>
              <p className="text-[#555] text-sm mb-2">Telefone: (11) 9999-9999</p>
              <p className="text-[#555] text-sm mb-0">Horário: Seg - Sex, 08h às 18h</p>
            </div>

            <div className="bg-[#f8f9fa] p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-[#2d2d2d] mb-3 mt-1">Endereço</h3>
              <p className="text-[#555] text-sm mb-2">
                Rua das Sementes, 123
                <br />
                São Paulo - SP
              </p>
              <p className="text-[#555] text-sm mb-0">CEP 01000-000</p>
            </div>

            <div className="bg-[#f8f9fa] p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-[#2d2d2d] mb-3 mt-1">Nossa Missão</h3>
              <p className="text-[#555] text-sm mb-2">
                Promover um ecossistema alimentar mais justo, reduzindo desperdício e valorizando a origem limpa
                dos produtos.
              </p>
              <p className="text-[#555] text-sm mb-0">
                Focamos em tecnologia acessível, transparência de cadeia e educação nutricional.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
