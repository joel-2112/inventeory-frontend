import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Download,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Grid3X3,
  List,
  MapPin,
  Box,
  ArrowUpRight,
  Eye,
  Edit3,
  MoreVertical,
  Warehouse,
  DollarSign,
  Target,
  Users,
  Filter,
  ChevronDown
} from 'lucide-react';
import { productsData } from '../mockdata/productsData';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list, grid, map
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

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

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(product => product.location === selectedLocation);
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'stock-high':
          return b.currentStock - a.currentStock;
        case 'stock-low':
          return a.currentStock - b.currentStock;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedStatus, selectedLocation, sortBy]);

  // Calculate statistics
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.currentStock), 0),
    lowStockItems: products.filter(p => p.status === 'Low Stock').length,
    outOfStockItems: products.filter(p => p.status === 'Out of Stock').length,
    totalLocations: [...new Set(products.map(p => p.location))].length
  };

  const StatusIndicator = ({ status }) => {
    const config = {
      'In Stock': { color: 'bg-green-500', icon: CheckCircle },
      'Low Stock': { color: 'bg-yellow-500', icon: AlertTriangle },
      'Out of Stock': { color: 'bg-red-500', icon: Clock }
    };
    const { color, icon: Icon } = config[status];
    
    return (
      <div className={`${color} w-2 h-2 rounded-full flex items-center justify-center`}>
        <Icon className="w-1 h-1 text-white" />
      </div>
    );
  };

  const StockProgress = ({ current, max }) => {
    const percentage = (current / max) * 100;
    let color = 'bg-green-500';
    if (percentage < 30) color = 'bg-red-500';
    else if (percentage < 60) color = 'bg-yellow-500';

    return (
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div 
          className={`h-1 rounded-full ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    );
  };

  // Professional List View - Optimized for millions of products
  const ListView = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 text-sm font-medium text-gray-700 bg-gray-50">
        <div className="col-span-4">Product</div>
        <div className="col-span-1 text-center">SKU</div>
        <div className="col-span-1 text-center">Category</div>
        <div className="col-span-1 text-center">Price</div>
        <div className="col-span-2 text-center">Stock Level</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredProducts.map((product) => (
          <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-gray-50 transition-colors">
            <div className="col-span-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                  <div className="text-xs text-gray-500 truncate">{product.location}</div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1 text-center">
              <div className="text-sm text-gray-600 font-mono">{product.sku}</div>
            </div>
            
            <div className="col-span-1 text-center">
              <div className="text-sm text-gray-600">{product.category}</div>
            </div>
            
            <div className="col-span-1 text-center">
              <div className="text-sm font-medium text-gray-900">${product.price}</div>
            </div>
            
            <div className="col-span-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">{product.currentStock} in stock</span>
                  <span className="text-gray-500">of {product.maxStock}</span>
                </div>
                <StockProgress current={product.currentStock} max={product.maxStock} />
              </div>
            </div>
            
            <div className="col-span-1 text-center">
              <div className="flex items-center justify-center space-x-2">
                <StatusIndicator status={product.status} />
                <span className="text-xs text-gray-600">{product.status}</span>
              </div>
            </div>
            
            <div className="col-span-2 text-center">
              <div className="flex items-center justify-center space-x-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Eye className="w-3 h-3" />
                </button>
                <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
                  <Edit3 className="w-3 h-3" />
                </button>
                <button className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors">
                  <MoreVertical className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Compact Grid View for large datasets
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-12 h-12 rounded object-cover"
            />
            <StatusIndicator status={product.status} />
          </div>
          
          <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{product.name}</h3>
          <div className="text-xs text-gray-500 mb-2">{product.sku}</div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium">{product.currentStock}/{product.maxStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium">${product.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{product.location}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">{product.category}</span>
            <div className="flex space-x-1">
              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                <Eye className="w-3 h-3" />
              </button>
              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Map View - Location based
  const MapView = () => {
    const locations = [...new Set(products.map(p => p.location))];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location) => {
          const locationProducts = filteredProducts.filter(p => p.location === location);
          const totalValue = locationProducts.reduce((sum, p) => sum + (p.price * p.currentStock), 0);
          
          return (
            <div key={location} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-gray-900">{location}</h3>
                </div>
                <span className="text-xs text-gray-500">{locationProducts.length} items</span>
              </div>
              
              <div className="space-y-2">
                {locationProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <StatusIndicator status={product.status} />
                      <span className="text-sm text-gray-900 truncate">{product.name}</span>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">{product.currentStock} units</span>
                  </div>
                ))}
                
                {locationProducts.length > 5 && (
                  <div className="text-center pt-2 text-xs text-gray-500">
                    +{locationProducts.length - 5} more products
                  </div>
                )}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600">
                Total Value: ${totalValue.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSelectedLocation('all');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-500">Products Management</h1>
              <p className="text-gray-600 text-sm">Manage your product inventory and stock levels</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'list', icon: List, label: 'List' },
                  { key: 'grid', icon: Grid3X3, label: 'Grid' },
                  { key: 'map', icon: MapPin, label: 'Locations' }
                ].map((view) => (
                  <button
                    key={view.key}
                    onClick={() => setViewMode(view.key)}
                    className={`p-2 rounded ${viewMode === view.key ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    title={view.label}
                  >
                    <view.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm">
                  <Warehouse className="w-4 h-4" />
                  <span>Add Location</span>
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-light text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="text-gray-600" size={20} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-2xl font-light text-gray-900">${(stats.totalValue / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="text-gray-600" size={20} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-light text-gray-900">{stats.lowStockItems}</p>
              </div>
              <AlertTriangle className="text-yellow-600" size={20} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Locations</p>
                <p className="text-2xl font-light text-gray-900">{stats.totalLocations}</p>
              </div>
              <MapPin className="text-gray-600" size={20} />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products by name, SKU, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="stock-high">Stock: High to Low</option>
                <option value="stock-low">Stock: Low to High</option>
              </select>

              <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 text-sm">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="all">All Categories</option>
                    {[...new Set(products.map(p => p.category))].map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="all">All Locations</option>
                    {[...new Set(products.map(p => p.location))].map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 text-sm">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {filteredProducts.length === 0 && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Dynamic View Renderer */}
        {viewMode === 'list' && <ListView />}
        {viewMode === 'grid' && <GridView />}
        {viewMode === 'map' && <MapView />}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;