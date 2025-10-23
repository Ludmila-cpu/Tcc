import React, { useState, useEffect, useCallback } from "react";
import { productsAPI, Product } from "../services/api";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const loadProducts = useCallback(async () => {
    setLoading(true);

    try {
      const params: any = {
        page,
        limit: 9
      };

      if (category) params.category = category;
      if (search) params.search = search;

      const response = await productsAPI.getAll(params);
      setProducts(response.products);
      setTotalPages(response.pagination.totalPages);
      setTotalProducts(response.pagination.totalProducts);
    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      // O toast já é exibido pelo CartContext
    } catch (err: any) {
      // O toast de erro já é exibido pelo CartContext
      console.error("Erro ao adicionar ao carrinho:", err);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto p-8">
        {/* Título e contadores */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Produtos Orgânicos
          </h1>
          <p className="text-gray-600">
            {totalProducts} produto{totalProducts !== 1 ? "s" : ""} encontrado
            {totalProducts !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Busca */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button type="submit" className="btn-primary">
                Buscar
              </button>
            </form>

            {/* Categoria */}
            <div>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                <option value="frutas">Frutas</option>
                <option value="verduras">Verduras</option>
                <option value="processados">Processados</option>
                <option value="mel">Mel</option>
              </select>
            </div>
          </div>

          {/* Limpar filtros */}
          {(category || search) && (
            <button
              onClick={() => {
                setCategory("");
                setSearch("");
                setPage(1);
              }}
              className="mt-4 text-sm text-primary hover:text-primary-dark"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Lista de produtos */}
        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>

                <span className="px-4 py-2">
                  Página {page} de {totalPages}
                </span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto encontrado</p>
            {(category || search) && (
              <button
                onClick={() => {
                  setCategory("");
                  setSearch("");
                  setPage(1);
                }}
                className="mt-4 text-primary hover:text-primary-dark"
              >
                Ver todos os produtos
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
