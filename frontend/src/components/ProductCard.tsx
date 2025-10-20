import React from 'react';
import { Product } from '../services/api';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/product-placeholder.svg';
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
          </div>
          
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600">
                {product.stock} em estoque
              </span>
            ) : (
              <span className="text-red-600">Sem estoque</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product._id)}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            product.stock > 0
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
