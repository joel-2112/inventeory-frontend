import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Layers,
  Activity,
  AlertCircle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { 
  inventoryStats, 
  recentActivities, 
  lowStockItems, 
  categoryDistribution 
} from '../mockdata/inventoryData';

const Dashboard = () => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your stock management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Items"
          value={inventoryStats.totalItems.toLocaleString()}
          icon={<Package />}
          trend="+12% from last month"
          color="blue"
        />
        <StatCard
          title="Total Value"
          value={formatCurrency(inventoryStats.totalValue)}
          icon={<DollarSign />}
          trend="+8% from last month"
          color="green"
        />
        <StatCard
          title="Low Stock"
          value={inventoryStats.lowStock}
          icon={<AlertTriangle />}
          trend="Need immediate attention"
          color="yellow"
        />
        <StatCard
          title="Out of Stock"
          value={inventoryStats.outOfStock}
          icon={<AlertCircle />}
          trend="Urgent restock needed"
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activities */}
        <DataTable
          title="Recent Activities"
          headers={['Item', 'Action', 'Quantity', 'Time']}
          data={recentActivities.map(activity => ({
            Item: activity.item,
            Action: activity.action,
            Quantity: activity.quantity,
            Time: activity.time
          }))}
        />

        {/* Low Stock Alerts */}
        <DataTable
          title="Low Stock Alerts"
          headers={['Product Name', 'Current Stock', 'Min Stock', 'Category']}
          data={lowStockItems.map(item => ({
            'Product Name': item.name,
            'Current Stock': (
              <span className="text-red-600 font-semibold">
                {item.currentStock}
              </span>
            ),
            'Min Stock': item.minStock,
            'Category': item.category
          }))}
        />
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
        <div className="flex flex-wrap gap-4">
          {categoryDistribution.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                }}
              ></div>
              <span className="text-sm text-gray-700">{category.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {category.value}%
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-4 rounded-full overflow-hidden">
          {categoryDistribution.map((category, index) => (
            <div
              key={index}
              className="h-full transition-all duration-500"
              style={{
                width: `${category.value}%`,
                backgroundColor: `hsl(${index * 60}, 70%, 50%)`
              }}
              title={`${category.name}: ${category.value}%`}
            ></div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Package size={16} />
            <span>Add New Item</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <TrendingUp size={16} />
            <span>Generate Report</span>
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Layers size={16} />
            <span>Manage Categories</span>
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
            <Activity size={16} />
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;