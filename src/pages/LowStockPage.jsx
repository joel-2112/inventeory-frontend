import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Zap, 
  Clock, 
  Package, 
  Truck, 
  BarChart3,
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Target,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  X,
  Search,
  ChevronDown,
  Eye
} from 'lucide-react';
import StockMeter from '../components/StockMeter';
import UrgencyBadge from '../components/UrgencyBadge';
import { lowStockProducts, lowStockStats, reorderSuggestions } from '../mockdata/lowStockData';

const LowStockPage = () => {
  const [products, setProducts] = useState(lowStockProducts);
  const [filteredProducts, setFilteredProducts] = useState(lowStockProducts);
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('urgency');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [autoReorder, setAutoReorder] = useState(false);

  // Filter and search products
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedUrgency !== 'all') {
      filtered = filtered.filter(product => product.urgency === selectedUrgency);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'urgency':
          const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        case 'daysUntilStockout':
          return a.daysUntilStockout - b.daysUntilStockout;
        case 'currentStock':
          return a.currentStock - b.currentStock;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedUrgency, selectedCategory, sortBy]);

  const handleReorder = (productId, quantity) => {
    console.log(`Reorder product ${productId} with quantity ${quantity}`);
    // Implement reorder logic
  };

  const handleQuickReorder = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      handleReorder(productId, product.reorderQuantity);
    }
  };

  const handleBulkReorder = () => {
    selectedProducts.forEach(productId => {
      handleQuickReorder(productId);
    });
    setSelectedProducts(new Set());
  };

  const toggleProductSelection = (productId) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const selectAllProducts = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategories = () => {
    return [...new Set(products.map(p => p.category))];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return <Zap size={16} className="text-red-500" />;
      case 'urgent': return <AlertCircle size={16} className="text-orange-500" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'out-of-stock': return <X size={16} className="text-red-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50/20 via-orange-50/10 to-yellow-50/10">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 bg-red-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-yellow-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-red-500 rounded-2xl">
                  <AlertTriangle className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Stock Alert Center</h1>
                  <p className="text-gray-600 text-lg">Monitor and manage inventory levels in real-time</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAutoReorder(!autoReorder)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  autoReorder
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                    : 'bg-white/80 text-gray-700  border border-white/20'
                }`}
              >
                {autoReorder ? <Pause size={18} /> : <Play size={18} />}
                <span>Auto-Reorder {autoReorder ? 'On' : 'Off'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 rounded-2xl shadow-lg shadow-gray-500/10 hover:scale-105 transition-all duration-300">
                <Download size={18} />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Critical Alert Banner */}
        {lowStockStats.criticalItems > 0 && (
          <div className="bg-linear-to-br from-red-500 to-orange-500 text-white rounded-2xl p-6 mb-8 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Bell size={24} />
                <div>
                  <h3 className="text-xl font-bold">Critical Stock Alert</h3>
                  <p className="opacity-90">
                    {lowStockStats.criticalItems} items are critically low and {lowStockStats.outOfStock} are out of stock
                  </p>
                </div>
              </div>
              <button 
                onClick={handleBulkReorder}
                disabled={selectedProducts.size === 0}
                className="px-6 py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reorder Selected ({selectedProducts.size})
              </button>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: AlertTriangle,
              label: 'Critical Items',
              value: lowStockStats.criticalItems,
              color: 'red',
              change: '+2'
            },
            {
              icon: Package,
              label: 'Total Low Stock',
              value: lowStockStats.totalLowStock,
              color: 'orange',
              change: '+3'
            },
            {
              icon: TrendingDown,
              label: 'Days Until Stockout',
              value: lowStockStats.estimatedStockoutDays,
              color: 'yellow',
              change: '-5'
            },
            {
              icon: BarChart3,
              label: 'Value at Risk',
              value: formatCurrency(lowStockStats.totalValueAtRisk),
              color: 'purple',
              change: '+12%'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-white/10 p-6  transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className={`text-xs font-medium ${
                    stat.color === 'red' ? 'text-red-600' :
                    stat.color === 'orange' ? 'text-orange-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'
                  }`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className={`p-3 rounded-2xl bg-${stat.color}-500/10`}>
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Control Panel */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6  mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search low stock items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/20 transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3">
              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/20 transition-all duration-300"
              >
                <option value="all">All Urgency Levels</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/20 transition-all duration-300"
              >
                <option value="all">All Categories</option>
                {getCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500/20 focus:border-red-500/20 transition-all duration-300"
              >
                <option value="urgency">Sort by Urgency</option>
                <option value="daysUntilStockout">Days Until Stockout</option>
                <option value="currentStock">Current Stock</option>
                <option value="name">Product Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table - No Cards! */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200  overflow-hidden mb-8">
          {/* Table Header */}
          <div className="border-b border-gray-200 bg-gray-50/50">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-gray-700">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                  onChange={selectAllProducts}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
              </div>
              <div className="col-span-3">Product</div>
              <div className="col-span-2">Stock Level</div>
              <div className="col-span-1">Urgency</div>
              <div className="col-span-2">Supplier</div>
              <div className="col-span-2">Timeline</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className={`transition-all duration-300 hover:bg-gray-50/50 ${
                  expandedProduct === product.id ? 'bg-blue-50/30' : ''
                } ${
                  product.status === 'out-of-stock' ? 'bg-red-50/30' : ''
                }`}
              >
                {/* Main Row */}
                <div 
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer"
                  onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                >
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                        <div className="text-xs text-gray-400">{product.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Level */}
                  <div className="col-span-2">
                    <StockMeter 
                      current={product.currentStock} 
                      min={product.minStock} 
                      max={product.maxStock}
                      size="medium"
                    />
                  </div>

                  {/* Urgency */}
                  <div className="col-span-1">
                    <UrgencyBadge urgency={product.urgency} />
                  </div>

                  {/* Supplier */}
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-gray-900">{product.supplier}</div>
                    <div className="text-xs text-gray-500">Lead: {product.leadTime}d</div>
                  </div>

                  {/* Timeline */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.daysUntilStockout === 0 ? 'Out of Stock' : `${product.daysUntilStockout} days`}
                        </div>
                        <div className="text-xs text-gray-500">
                          Sales: {product.weeklySales}/wk
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickReorder(product.id);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Quick Reorder"
                      >
                        <Truck size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedProduct(expandedProduct === product.id ? null : product.id);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProduct === product.id && (
                  <div className="px-6 py-4 bg-white border-t border-gray-100">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                      <div>
                        <label className="font-medium text-gray-700">Cost & Pricing</label>
                        <div className="mt-2 space-y-1">
                          <div>Cost: {formatCurrency(product.cost)}</div>
                          <div>Price: {formatCurrency(product.price)}</div>
                          <div>Margin: {((product.price - product.cost) / product.cost * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="font-medium text-gray-700">Reorder Info</label>
                        <div className="mt-2 space-y-1">
                          <div>Suggested Qty: {product.reorderQuantity}</div>
                          <div>Total Cost: {formatCurrency(product.cost * product.reorderQuantity)}</div>
                          <div>Last Restock: {product.lastRestock}</div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="font-medium text-gray-700">Supplier Contact</label>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center space-x-2">
                            <Mail size={14} className="text-gray-400" />
                            <span className="text-blue-600">{product.supplierContact}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone size={14} className="text-gray-400" />
                            <span>+1-800-XXX-XXXX</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="font-medium text-gray-700">Quick Actions</label>
                        <div className="mt-2 space-y-2">
                          <button
                            onClick={() => handleQuickReorder(product.id)}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Reorder Now
                          </button>
                          <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Contact Supplier
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Low Stock Items</h3>
              <p className="text-gray-600">All your inventory levels are healthy!</p>
            </div>
          )}
        </div>

        {/* Smart Reorder Suggestions */}
        {reorderSuggestions.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg shadow-gray-500/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Target size={24} className="text-blue-600" />
                <span>Smart Reorder Suggestions</span>
              </h3>
              <button 
                onClick={handleBulkReorder}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Reorder All Suggested
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reorderSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{suggestion.name}</h4>
                    <UrgencyBadge urgency={suggestion.urgency} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-semibold">{suggestion.suggestedQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cost:</span>
                      <span className="font-semibold">{formatCurrency(suggestion.totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supplier:</span>
                      <span className="font-semibold">{suggestion.supplier}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReorder(suggestion.productId, suggestion.suggestedQuantity)}
                    className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Reorder This Item
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LowStockPage;