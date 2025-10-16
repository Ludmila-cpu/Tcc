# 🎨 Frontend - Vereco E-commerce

Frontend da plataforma Vereco desenvolvido com React, TypeScript e Vite.

## 🚀 Stack Tecnológica

- **React** 19.1.1 - Biblioteca para construção de interfaces
- **TypeScript** 5.9.2 - Superset JavaScript com tipagem
- **Vite** 7.1.4 - Build tool e dev server
- **React Router DOM** 7.8.2 - Roteamento SPA
- **Tailwind CSS** 3.3.3 - Framework CSS utilitário
- **PostCSS** 8.4.31 - Processador CSS

## 📁 Estrutura de Pastas

```
frontend/
├── src/
│   ├── pages/          # Páginas da aplicação
│   │   ├── LoginPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── CartPage.tsx
│   │   └── PaymentPage.tsx
│   ├── assets/         # Imagens e recursos estáticos
│   ├── App.tsx         # Componente raiz com rotas
│   ├── main.tsx        # Entry point
│   └── index.css       # Estilos globais
├── public/             # Arquivos públicos
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## 🛠️ Instalação

```bash
# Na pasta frontend/
npm install
```

## 💻 Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🔌 Conexão com Backend

O frontend se comunica com a API backend em `http://localhost:5000/api`

Certifique-se de que o backend está rodando antes de iniciar o frontend.

## 🎯 Rotas da Aplicação

- `/` - Página de login
- `/produtos` - Catálogo de produtos
- `/carrinho` - Carrinho de compras
- `/pagamento` - Processamento de pagamento

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Padrões de Código

- Componentes em **PascalCase** (ex: `ProductCard.tsx`)
- Hooks customizados com prefixo **use** (ex: `useAuth.ts`)
- Tipagem TypeScript em todos os componentes
- CSS com Tailwind classes

## 🚀 Deploy

Build de produção:

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

---

**Desenvolvido com ❤️ para o TCC**
