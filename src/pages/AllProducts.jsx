import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Package,
  ChevronDown,
  X,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  Grid3X3,
  Workflow,
  Database,
  Cpu
} from 'lucide-react';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedView, setSelectedView] = useState('matrix'); // matrix, timeline, workflow
  const [sortBy, setSortBy] = useState('performance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data initialization
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        sku: 'AUD-001',
        category: 'Electronics',
        price: 129.99,
        cost: 65.00,
        currentStock: 45,
        minStock: 10,
        maxStock: 100,
        status: 'In Stock',
        performance: 'high',
        salesVelocity: 12,
        margin: 66.2,
        lastUpdated: '2024-01-15',
        supplier: 'AudioTech Inc',
        location: 'Warehouse A'
      },
      {
        id: 2,
        name: 'Ergonomic Office Chair',
        sku: 'FUR-002',
        category: 'Furniture',
        price: 299.99,
        cost: 180.00,
        currentStock: 8,
        minStock: 5,
        maxStock: 25,
        status: 'Low Stock',
        performance: 'medium',
        salesVelocity: 4,
        margin: 66.7,
        lastUpdated: '2024-01-18',
        supplier: 'ComfortWorks',
        location: 'Warehouse B'
      },
      {
        id: 3,
        name: 'Stainless Steel Water Bottle',
        sku: 'LIF-003',
        category: 'Lifestyle',
        price: 24.99,
        cost: 12.50,
        currentStock: 0,
        minStock: 20,
        maxStock: 50,
        status: 'Out of Stock',
        performance: 'low',
        salesVelocity: 8,
        margin: 50.0,
        lastUpdated: '2024-01-20',
        supplier: 'EcoGear',
        location: 'Warehouse A'
      }
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(product => product.status === selectedStatus);
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'performance':
          const perfOrder = { high: 0, medium: 1, low: 2 };
          return perfOrder[a.performance] - perfOrder[b.performance];
        case 'velocity':
          return b.salesVelocity - a.salesVelocity;
        case 'margin':
          return b.margin - a.margin;
        case 'stock':
          return b.currentStock - a.currentStock;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'high': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'medium': return <BarChart3 className="w-4 h-4 text-yellow-600" />;
      case 'low': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Low Stock': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Out of Stock': return <Clock className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4 text-gray-400" />;
    }
  };

  const StockIndicator = ({ current, min, max }) => {
    const percentage = (current / max) * 100;
    let color = 'bg-green-500';
    
    if (percentage < 30) color = 'bg-red-500';
    else if (percentage < 60) color = 'bg-yellow-500';

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Command Center Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-gray-900">Product Intelligence</h1>
                <p className="text-gray-600 text-sm">Real-time inventory analytics & management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Matrix */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Overview - Minimal */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total SKUs', value: products.length, icon: Layers, trend: '+2' },
            { label: 'High Performers', value: products.filter(p => p.performance === 'high').length, icon: Zap, trend: '+1' },
            { label: 'Require Attention', value: products.filter(p => p.status !== 'In Stock').length, icon: AlertTriangle, trend: '-1' },
            { label: 'Avg Margin', value: '58.3%', icon: TrendingUp, trend: '+2.1%' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 border-l-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-light text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Search & View Controls */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* View Mode Selector */}
            <div className="flex items-center space-x-2">
              {[
                { key: 'matrix', icon: Grid3X3, label: 'Matrix' },
                { key: 'timeline', icon: BarChart3, label: 'Timeline' },
                { key: 'workflow', icon: Workflow, label: 'Workflow' }
              ].map((view) => (
                <button
                  key={view.key}
                  onClick={() => setSelectedView(view.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedView === view.key 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <view.icon className="w-4 h-4" />
                  <span className="text-sm">{view.label}</span>
                </button>
              ))}
            </div>

            {/* Search & Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="performance">Sort by Performance</option>
                <option value="velocity">Sort by Sales Velocity</option>
                <option value="margin">Sort by Margin</option>
                <option value="stock">Sort by Stock Level</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-4 mt-4">
            {['all', 'In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status === 'all' ? 'all' : status)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status === 'all' ? 'All Status' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Product Matrix View */}
        {selectedView === 'matrix' && (
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Matrix Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="col-span-3">Product</div>
              <div className="col-span-1">SKU</div>
              <div className="col-span-1">Performance</div>
              <div className="col-span-1">Stock Level</div>
              <div className="col-span-1">Velocity</div>
              <div className="col-span-1">Margin</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Matrix Rows */}
            <div className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-50 transition-colors group"
                >
                  {/* Product Info */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Package className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="col-span-1">
                    <div className="text-sm text-gray-600 font-mono">{product.sku}</div>
                  </div>

                  {/* Performance */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      {getPerformanceIcon(product.performance)}
                      <span className="text-sm capitalize">{product.performance}</span>
                    </div>
                  </div>

                  {/* Stock Level */}
                  <div className="col-span-1">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">
                        {product.currentStock}/{product.maxStock}
                      </div>
                      <StockIndicator 
                        current={product.currentStock} 
                        min={product.minStock} 
                        max={product.maxStock} 
                      />
                    </div>
                  </div>

                  {/* Sales Velocity */}
                  <div className="col-span-1">
                    <div className="text-sm text-gray-900 font-medium">
                      {product.salesVelocity}/week
                    </div>
                  </div>

                  {/* Margin */}
                  <div className="col-span-1">
                    <div className={`text-sm font-medium ${
                      product.margin > 60 ? 'text-green-600' : 
                      product.margin > 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.margin}%
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(product.status)}
                      <span className={`text-sm font-medium ${
                        product.status === 'In Stock' ? 'text-green-600' :
                        product.status === 'Low Stock' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <Cpu className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products match your criteria</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;