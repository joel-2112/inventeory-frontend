import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MoreVertical,
  Eye,
  FolderTree
} from 'lucide-react';

const CategoryCard = ({ category, onEdit, onDelete, onViewProducts }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockStatus = () => {
    if (category.outOfStockItems > 0) return 'critical';
    if (category.lowStockItems > 0) return 'warning';
    return 'healthy';
  };

  const stockStatus = getStockStatus();

  // Calculate health percentage for radial progress
  const getHealthPercentage = () => {
    const totalItems = category.productCount;
    const problematicItems = category.lowStockItems + category.outOfStockItems;
    return totalItems > 0 ? ((totalItems - problematicItems) / totalItems) * 100 : 100;
  };

  const healthPercentage = getHealthPercentage();

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Card Container */}
      <div className={`
        relative bg-white rounded-2xl transition-all duration-500 ease-out
        ${isHovered 
          ? 'shadow-2xl scale-105 rotate-1' 
          : 'shadow-lg scale-100 rotate-0'
        }
        border border-gray-100 overflow-hidden
      `}>
        {/* Animated Background Gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${category.color}15, transparent 50%)`
          }}
        />

        {/* Header with Image and Radial Progress */}
        <div className="relative h-32 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Radial Progress Overlay */}
          <div className="absolute top-4 right-4">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={stockStatus === 'healthy' ? '#10B981' : stockStatus === 'warning' ? '#F59E0B' : '#EF4444'}
                  strokeWidth="3"
                  strokeDasharray={`${healthPercentage}, 100`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-md">
                  {Math.round(healthPercentage)}%
                </span>
              </div>
            </div>
          </div>

          {/* Category Type Badge */}
          <div className="absolute top-4 left-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm"
              style={{ backgroundColor: category.color }}
            >
              {category.parentCategory ? 'SUB' : 'MAIN'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 relative">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">
              {category.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {category.description}
            </p>
          </div>

          {/* Parent Category Indicator */}
          {category.parentCategory && (
            <div className="flex items-center space-x-1 mb-3 text-xs text-gray-500">
              <FolderTree size={12} />
              <span>Child of {category.parentCategory}</span>
            </div>
          )}

          {/* Interactive Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors group/metric">
              <Package size={16} className="mx-auto mb-1 text-blue-600 group-hover/metric:scale-110 transition-transform" />
              <p className="text-sm font-bold text-gray-900">{category.productCount}</p>
              <p className="text-xs text-gray-500">Products</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors group/metric">
              <TrendingUp size={16} className="mx-auto mb-1 text-green-600 group-hover/metric:scale-110 transition-transform" />
              <p className="text-sm font-bold text-gray-900">{formatCurrency(category.totalValue)}</p>
              <p className="text-xs text-gray-500">Value</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gray-50 hover:bg-yellow-50 transition-colors group/metric">
              <AlertTriangle size={16} className="mx-auto mb-1 text-yellow-600 group-hover/metric:scale-110 transition-transform" />
              <p className="text-sm font-bold text-gray-900">{category.lowStockItems}</p>
              <p className="text-xs text-gray-500">Low Stock</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors group/metric">
              <Users size={16} className="mx-auto mb-1 text-purple-600 group-hover/metric:scale-110 transition-transform" />
              <p className="text-sm font-bold text-gray-900">{category.supplierCount}</p>
              <p className="text-xs text-gray-500">Suppliers</p>
            </div>
          </div>

          {/* Tags with Hover Effect */}
          <div className="flex flex-wrap gap-1 mb-4">
            {category.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                {tag}
              </span>
            ))}
            {category.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                +{category.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100
          transform transition-all duration-300 ease-out
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => onViewProducts(category)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              <Eye size={16} />
              <span>View Products</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(category)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Edit Category"
              >
                <Edit size={16} />
              </button>
              
              <button
                onClick={() => onDelete(category.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Delete Category"
              >
                <Trash2 size={16} />
              </button>

              {/* More Options Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  <MoreVertical size={16} />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Duplicate Category
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Export Products
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Set Reorder Point
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Corner Accent */}
        <div 
          className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${category.color} 50%)`
          }}
        />
      </div>

      {/* Background Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10"
        style={{ backgroundColor: category.color }}
      />
    </div>
  );
};

export default CategoryCard;