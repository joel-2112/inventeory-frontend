import React, { useState, useEffect } from 'react';
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
  FolderTree
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
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parentCategory: '',
    color: '#3B82F6',
    reorderPoint: 5,
    tags: []
  });

  // Filter and search categories
  useEffect(() => {
    let filtered = categories;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      if (selectedType === 'main') {
        filtered = filtered.filter(category => !category.parentCategory);
      } else if (selectedType === 'sub') {
        filtered = filtered.filter(category => category.parentCategory);
      }
    }

    // Status filter
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'healthy') {
        filtered = filtered.filter(category => category.lowStockItems === 0 && category.outOfStockItems === 0);
      } else if (selectedStatus === 'warning') {
        filtered = filtered.filter(category => category.lowStockItems > 0 && category.outOfStockItems === 0);
      } else if (selectedStatus === 'critical') {
        filtered = filtered.filter(category => category.outOfStockItems > 0);
      }
    }

    // Sort categories
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'products-high':
          return b.productCount - a.productCount;
        case 'products-low':
          return a.productCount - b.productCount;
        case 'value-high':
          return b.totalValue - a.totalValue;
        case 'value-low':
          return a.totalValue - b.totalValue;
        default:
          return 0;
      }
    });

    setFilteredCategories(filtered);
  }, [categories, searchTerm, selectedType, selectedStatus, sortBy]);

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
    // Navigate to products page with category filter
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

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
            <p className="text-gray-600 mt-1">
              Organize and manage product categories, track inventory health, and optimize stock levels.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Advanced Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categoryStats.totalCategories}</p>
              <p className="text-xs text-gray-500 mt-1">{getMainCategories().length} main, {categories.length - getMainCategories().length} sub</p>
            </div>
            <Layers className="text-blue-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{categoryStats.totalProducts}</p>
              <p className="text-xs text-gray-500 mt-1">Avg: {categoryStats.averageProductsPerCategory}/category</p>
            </div>
            <Package className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(categoryStats.totalValue)}</p>
              <p className="text-xs text-gray-500 mt-1">Across all categories</p>
            </div>
            <BarChart3 className="text-purple-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Alerts</p>
              <p className="text-2xl font-bold text-red-600">{categoryStats.categoriesWithLowStock}</p>
              <p className="text-xs text-gray-500 mt-1">Need attention</p>
            </div>
            <AlertTriangle className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="products-high">Products: High to Low</option>
              <option value="products-low">Products: Low to High</option>
              <option value="value-high">Value: High to Low</option>
              <option value="value-low">Value: Low to High</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={16} />
            </button>

            {/* Export */}
            <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              {/* Category Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="main">Main Categories</option>
                  <option value="sub">Subcategories</option>
                </select>
              </div>

              {/* Stock Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy Stock</option>
                  <option value="warning">Low Stock</option>
                  <option value="critical">Critical Stock</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                >
                  <X size={16} />
                  <span>Clear Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          Showing {filteredCategories.length} of {categories.length} categories
        </p>
        {filteredCategories.length === 0 && (
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="text-center py-12">
          <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent Category
                  </label>
                  <select
                    value={newCategory.parentCategory}
                    onChange={(e) => setNewCategory({...newCategory, parentCategory: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">No Parent (Main Category)</option>
                    {getMainCategories().map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Color
                  </label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reorder Point
                  </label>
                  <input
                    type="number"
                    value={newCategory.reorderPoint}
                    onChange={(e) => setNewCategory({...newCategory, reorderPoint: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
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
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
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