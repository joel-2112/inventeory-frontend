import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Grid, 
  List, 
  Layers,
  BarChart3,
  Users,
  AlertTriangle,
  Package,
  ChevronDown,
  X,
  FolderOpen,
  FolderTree,
  Sparkles,
  Zap,
  Target,
  Cube,
  Palette,
  Settings2
} from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import { categoriesData, categoryStats } from '../mockdata/categoriesData';

const CategoriesPage = () => {
  const [categories, setCategories] = useState(categoriesData);
  const [filteredCategories, setFilteredCategories] = useState(categoriesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parentCategory: '',
    color: '#3B82F6',
    reorderPoint: 5,
    tags: []
  });

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and search categories
  useEffect(() => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      if (selectedType === 'main') {
        filtered = filtered.filter(category => !category.parentCategory);
      } else if (selectedType === 'sub') {
        filtered = filtered.filter(category => category.parentCategory);
      }
    }

    if (selectedStatus !== 'all') {
      if (selectedStatus === 'healthy') {
        filtered = filtered.filter(category => category.lowStockItems === 0 && category.outOfStockItems === 0);
      } else if (selectedStatus === 'warning') {
        filtered = filtered.filter(category => category.lowStockItems > 0 && category.outOfStockItems === 0);
      } else if (selectedStatus === 'critical') {
        filtered = filtered.filter(category => category.outOfStockItems > 0);
      }
    }

    if (activeTab !== 'all') {
      filtered = filtered.filter(category => category.name === activeTab);
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'products-high': return b.productCount - a.productCount;
        case 'products-low': return a.productCount - b.productCount;
        case 'value-high': return b.totalValue - a.totalValue;
        case 'value-low': return a.totalValue - b.totalValue;
        default: return 0;
      }
    });

    setFilteredCategories(filtered);
  }, [categories, searchTerm, selectedType, selectedStatus, sortBy, activeTab]);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory || '',
      color: category.color,
      reorderPoint: category.reorderPoint,
      tags: [...category.tags]
    });
    setShowAddModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(category => category.id !== categoryId));
    }
  };

  const handleViewProducts = (category) => {
    console.log('View products for category:', category.name);
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() === '') {
      alert('Please enter a category name');
      return;
    }

    const categoryData = {
      ...newCategory,
      id: categories.length + 1,
      productCount: 0,
      totalValue: 0,
      lowStockItems: 0,
      outOfStockItems: 0,
      image: 'https://images.unsplash.com/photo-1417733403748-83bbc7c05140?w=400&h=300&fit=crop',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      subCategories: [],
      supplierCount: 0,
      isActive: true
    };

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...categoryData } : cat
      ));
    } else {
      setCategories([...categories, categoryData]);
    }

    setShowAddModal(false);
    setEditingCategory(null);
    setNewCategory({
      name: '',
      description: '',
      parentCategory: '',
      color: '#3B82F6',
      reorderPoint: 5,
      tags: []
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedStatus('all');
    setSortBy('name');
    setActiveTab('all');
  };

  const getMainCategories = () => {
    return categories.filter(cat => !cat.parentCategory);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const popularCategories = categories.slice(0, 4);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Sticky Header */}
      <div className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/5 border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/25">
                  <Cube className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Category Hub
                  </h1>
                  <p className="text-gray-600 text-sm">Organize your inventory universe</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* AI Assistant Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105">
                <Sparkles size={16} />
                <span>AI Organize</span>
              </button>

              {/* Add Category Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-2xl shadow-lg shadow-gray-500/10 hover:shadow-gray-500/20 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Plus size={20} />
                <span>New Category</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Hero Stats Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg shadow-blue-500/10 mb-6">
            <Zap className="text-yellow-500" size={16} />
            <span className="text-sm font-medium text-gray-700">Inventory Intelligence Dashboard</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Master Your <span className="bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">Product Universe</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your inventory management with intelligent categorization, real-time analytics, and AI-powered organization.
          </p>
        </div>

        {/* Interactive Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              icon: Layers, 
              label: 'Total Categories', 
              value: categoryStats.totalCategories,
              subtext: `${getMainCategories().length} main, ${categories.length - getMainCategories().length} sub`,
              color: 'blue',
              gradient: 'from-blue-500 to-cyan-500'
            },
            { 
              icon: Package, 
              label: 'Total Products', 
              value: categoryStats.totalProducts,
              subtext: `Avg: ${categoryStats.averageProductsPerCategory}/category`,
              color: 'green',
              gradient: 'from-green-500 to-emerald-500'
            },
            { 
              icon: BarChart3, 
              label: 'Inventory Value', 
              value: formatCurrency(categoryStats.totalValue),
              subtext: 'Across all categories',
              color: 'purple',
              gradient: 'from-purple-500 to-pink-500'
            },
            { 
              icon: AlertTriangle, 
              label: 'Stock Alerts', 
              value: categoryStats.categoriesWithLowStock,
              subtext: 'Need attention',
              color: 'red',
              gradient: 'from-red-500 to-orange-500'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-3xl border border-white/20 p-6 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>
                </div>
                <div className={`p-3 rounded-2xl bg-linear-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              
              {/* Animated background on hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Quick Access Tabs */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'bg-white/70 text-gray-700 hover:bg-white/90 backdrop-blur-sm border border-white/20'
            }`}
          >
            All Categories
          </button>
          {popularCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.name)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                activeTab === category.name
                  ? 'bg-white text-gray-900 shadow-lg shadow-gray-500/10 border border-white/20'
                  : 'bg-white/50 text-gray-700 hover:bg-white/80 backdrop-blur-sm border border-white/20'
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span>{category.name}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {category.productCount}
              </span>
            </button>
          ))}
        </div>

        {/* Advanced Command Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Magic Search */}
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Ask anything... 'Show me electronics with low stock' or 'Categories needing restock'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 text-lg placeholder-gray-400 transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <kbd className="px-2 py-1 bg-gray-100 rounded-lg text-xs">⌘K</kbd>
                    <span>for AI search</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="flex bg-white/50 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-lg shadow-gray-500/10 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-lg shadow-gray-500/10 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              {/* Smart Filter */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  showFilters
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/50 text-gray-700 hover:bg-white/80 backdrop-blur-sm border border-white/20'
                }`}
              >
                <Filter size={18} />
                <span>Smart Filter</span>
                <ChevronDown size={16} className={showFilters ? 'rotate-180 transition-transform' : ''} />
              </button>

              {/* Export with Animation */}
              <button className="flex items-center space-x-2 px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/20 text-gray-700 rounded-2xl hover:bg-white/80 transition-all duration-300 hover:scale-105 group">
                <Download size={18} />
                <span>Export</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping group-hover:animate-none"></div>
              </button>
            </div>
          </div>

          {/* Expanded AI Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <Target size={16} />
                    <span>Category Type</span>
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                  >
                    <option value="all">All Types</option>
                    <option value="main">Main Categories</option>
                    <option value="sub">Subcategories</option>
                  </select>
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <AlertTriangle size={16} />
                    <span>Stock Health</span>
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                  >
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy Stock</option>
                    <option value="warning">Low Stock</option>
                    <option value="critical">Critical Stock</option>
                  </select>
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <Settings2 size={16} />
                    <span>Sort By</span>
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                  >
                    <option value="name">Name</option>
                    <option value="products-high">Most Products</option>
                    <option value="products-low">Fewest Products</option>
                    <option value="value-high">Highest Value</option>
                    <option value="value-low">Lowest Value</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  <X size={16} />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Category Explorer
            </h3>
            <p className="text-gray-600">
              Discover and manage {filteredCategories.length} of {categories.length} categories
            </p>
          </div>
          
          {filteredCategories.length === 0 && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/20 text-blue-600 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10"
            >
              Clear Cosmic Filters
            </button>
          )}
        </div>

        {/* Categories Grid - The Main Attraction */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onViewProducts={handleViewProducts}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <FolderOpen size={64} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No categories in this dimension</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Your search query didn't match any categories. Try different keywords or clear filters to explore the entire universe.
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-4 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 text-lg font-medium"
              >
                Explore All Categories
              </button>
            </div>
          </div>
        )}

        {/* Floating Add Button for Mobile */}
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-8 right-8 z-50 lg:hidden p-4 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-110"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Futuristic Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl shadow-blue-500/20">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({
                      name: '',
                      description: '',
                      parentCategory: '',
                      color: '#3B82F6',
                      reorderPoint: 5,
                      tags: []
                    });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <Cube size={16} />
                    <span>Category Name *</span>
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <Palette size={16} />
                    <span>Category Color</span>
                  </label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="w-full h-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3">
                    Description
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    rows="3"
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                    placeholder="Describe this category..."
                  />
                </div>

                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-3">
                    Parent Category
                  </label>
                  <select
                    value={newCategory.parentCategory}
                    onChange={(e) => setNewCategory({...newCategory, parentCategory: e.target.value})}
                    className="w-full bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-300"
                  >
                    <option value="">No Parent (Main Category)</option>
                    {getMainCategories().map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCategory(null);
                    setNewCategory({
                      name: '',
                      description: '',
                      parentCategory: '',
                      color: '#3B82F6',
                      reorderPoint: 5,
                      tags: []
                    });
                  }}
                  className="px-6 py-3 bg-white/50 backdrop-blur-sm border border-white/20 text-gray-700 rounded-2xl hover:bg-white/80 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;