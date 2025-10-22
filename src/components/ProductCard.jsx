import React from 'react';
import { Package, Edit, Trash2, AlertTriangle } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockIndicator = (current, min) => {
    if (current === 0) return 'bg-red-500';
    if (current <= min) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {product.status}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`w-3 h-3 rounded-full ${getStockIndicator(product.currentStock, product.minStock)}`}></span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">{product.name}</h3>
          <span className="text-lg font-bold text-blue-600 ml-2">${product.price}</span>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">SKU:</span>
            <span className="font-mono text-gray-900">{product.sku}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Category:</span>
            <span className="text-gray-900">{product.category}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Stock:</span>
            <div className="flex items-center space-x-2">
              <span className={`font-semibold ${
                product.currentStock <= product.minStock ? 'text-red-600' : 'text-gray-900'
              }`}>
                {product.currentStock}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-500 text-xs">min {product.minStock}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Location:</span>
            <span className="text-gray-900">{product.location}</span>
          </div>
        </div>

        {/* Supplier Info */}
        <div className="border-t border-gray-100 pt-2 mb-3">
          <p className="text-xs text-gray-500 truncate">Supplier: {product.supplier}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          
          <button
            onClick={() => onDelete(product.id)}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;