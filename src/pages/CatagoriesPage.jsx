import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  MoreVertical,
  Edit,
  Trash2,
  FolderTree,
  BarChart3,
  AlertTriangle,
  Package,
  Layers,
  Users,
  ChevronDown,
  X,
  FolderOpen,
  Grid,
  List,
  Settings
} from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parentCategory: '',
    color: '#3B82F6',
    reorderPoint: 5,
    tags: [],
    isActive: true
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockCategories = [
      {
        id: 1,
        name: 'Electronics',
        description: 'Electronic devices and components',
        parentCategory: '',
        productCount: 156,
        totalValue: 125000,
        lowStockItems: 12,
        outOfStockItems: 3,
        color: '#3B82F6',
        reorderPoint: 5,
        tags: ['digital', 'devices'],
        createdDate: '2024-01-15',
        lastUpdated: '2024-03-20',
        subCategories: ['Smartphones', 'Laptops'],
        supplierCount: 8,
        isActive: true
      },
      {
        id: 2,
        name: 'Clothing',
        description: 'Apparel and fashion items',
        parentCategory: '',
        productCount: 234,
        totalValue: 89000,
        lowStockItems: 8,
        outOfStockItems: 2,
        color: '#EF4444',
        reorderPoint: 10,
        tags: ['fashion', 'apparel'],
        createdDate: '2024-01-10',
        lastUpdated: '2024-03-18',
        subCategories: ['Men', 'Women'],
        supplierCount: 12,
        isActive: true
      },
      {
        id: 3,
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        parentCategory: 'Electronics',
        productCount: 45,
        totalValue: 75000,
        lowStockItems: 5,
        outOfStockItems: 1,
        color: '#8B5CF6',
        reorderPoint: 8,
        tags: ['mobile', 'tech'],
        createdDate: '2024-02-01',
        lastUpdated: '2024-03-22',
        subCategories: [],
        supplierCount: 6,
        isActive: true
      }
    ];
    setCategories(mockCategories);
    setFilteredCategories(mockCategories);
  }, []);

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
      tags: [...category.tags],
      isActive: category.isActive
    });
    setShowAddModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setCategories(categories.filter(category => category.id !== categoryId));
    }
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
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      subCategories: [],
      supplierCount: 0
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
      tags: [],
      isActive: true
    });
  };

  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleBulkAction = () => {
    if (bulkAction && selectedCategories.length > 0) {
      // Implement bulk actions
      console.log(`Performing ${bulkAction} on`, selectedCategories);
      setSelectedCategories([]);
      setBulkAction('');
    }
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

  const CategoryCard = ({ category, onEdit, onDelete }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <div>
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            {category.parentCategory && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Subcategory of {category.parentCategory}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => toggleCategorySelection(category.id)}
            className="rounded border-gray-300"
          />
          <div className="relative">
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="font-bold text-blue-900">{category.productCount}</div>
          <div className="text-xs text-blue-600">Products</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="font-bold text-green-900">{formatCurrency(category.totalValue)}</div>
          <div className="text-xs text-green-600">Value</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 rounded-full text-xs ${
            category.outOfStockItems > 0 
              ? 'bg-red-100 text-red-800'
              : category.lowStockItems > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {category.outOfStockItems > 0 ? 'Critical' : category.lowStockItems > 0 ? 'Warning' : 'Healthy'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(category)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const CategoryRow = ({ category, onEdit, onDelete }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selectedCategories.includes(category.id)}
          onChange={() => toggleCategorySelection(category.id)}
          className="rounded border-gray-300"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <div>
            <div className="font-medium text-gray-900">{category.name}</div>
            <div className="text-sm text-gray-500">{category.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {category.parentCategory ? (
          <span className="text-sm text-gray-600">{category.parentCategory}</span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Main Category
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{category.productCount}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(category.totalValue)}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          category.outOfStockItems > 0 
            ? 'bg-red-100 text-red-800'
            : category.lowStockItems > 0
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {category.outOfStockItems > 0 ? 'Critical' : category.lowStockItems > 0 ? 'Warning' : 'Healthy'}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(category)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
            <p className="text-gray-600 mt-1">
              Organize and manage product categories, track inventory health, and optimize stock levels.
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Category</span>
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{categories.length}</p>
              <p className="text-xs text-gray-500 mt-2">
                {getMainCategories().length} main, {categories.length - getMainCategories().length} sub
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Layers className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Across all categories
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Package className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(categories.reduce((sum, cat) => sum + cat.totalValue, 0))}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Total stock value
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock Alerts</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {categories.filter(cat => cat.outOfStockItems > 0 || cat.lowStockItems > 0).length}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Need attention
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCategories.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-blue-800 font-medium">
                {selectedCategories.length} categories selected
              </span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="border border-blue-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Bulk Actions</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
                <option value="export">Export Selected</option>
                <option value="delete">Delete Selected</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            <button
              onClick={() => setSelectedCategories([])}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
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
              className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={16} />
            </button>

            {/* Export */}
            <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
              {/* Category Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
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
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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

      {/* Categories Content */}
      {filteredCategories.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map(category => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Color
                    </label>
                    <input
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newCategory.isActive}
                    onChange={(e) => setNewCategory({...newCategory, isActive: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Active Category
                  </label>
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
                      tags: [],
                      isActive: true
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