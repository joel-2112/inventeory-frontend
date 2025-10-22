import React, { useState, useEffect } from "react";
import { 
  Package, 
  AlertTriangle, 
  DollarSign, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart,
  RefreshCw,
  Download,
  Filter,
  Search,
  BarChart3,
  Calendar
} from "lucide-react";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import {
  inventoryStats,
  recentActivities,
  lowStockItems,
  categoryDistribution,
} from "../mockdata/inventoryData";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(recentActivities);
  const [stats, setStats] = useState(inventoryStats);

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setStats({
        ...inventoryStats,
        totalItems: inventoryStats.totalItems + Math.floor(Math.random() * 10),
        totalValue: inventoryStats.totalValue + Math.floor(Math.random() * 1000),
      });
      setIsLoading(false);
    }, 1000);
  };

  // Filter activities based on search
  useEffect(() => {
    const filtered = recentActivities.filter(activity =>
      activity.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchTerm]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTrendIcon = (trend) => {
    if (trend.includes("+")) {
      return <TrendingUp size={14} className="text-green-500" />;
    }
    return <TrendingDown size={14} className="text-red-500" />;
  };

  // Calculate additional metrics
  const additionalMetrics = [
    { label: "Inventory Turnover", value: "2.4x", change: "+0.2x" },
    { label: "Stockout Rate", value: "1.2%", change: "-0.3%" },
    { label: "Carrying Cost", value: formatCurrency(12540), change: "-2%" },
    { label: "Order Accuracy", value: "99.1%", change: "+0.4%" },
  ];

  return (
    <div>
      {/* Page Header with Controls */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your inventory today.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            {/* Time Range Filter */}
            <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
              <Calendar size={16} className="text-gray-400" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm bg-transparent border-none focus:outline-none focus:ring-0"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              <span className="text-sm">Refresh</span>
            </button>

            {/* Export Button */}
            <button className="flex items-center space-x-2 bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700 transition-colors">
              <Download size={16} />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Items"
          value={stats.totalItems.toLocaleString()}
          icon={<Package />}
          trend={
            <div className="flex items-center space-x-1">
              {getTrendIcon("+12%")}
              <span>+12% from last month</span>
            </div>
          }
          color="blue"
          loading={isLoading}
        />
        <StatCard
          title="Total Value"
          value={formatCurrency(stats.totalValue)}
          icon={<DollarSign />}
          trend={
            <div className="flex items-center space-x-1">
              {getTrendIcon("+8%")}
              <span>+8% from last month</span>
            </div>
          }
          color="green"
          loading={isLoading}
        />
        <StatCard
          title="Low Stock"
          value={stats.lowStock}
          icon={<AlertTriangle />}
          trend="Need immediate attention"
          color="yellow"
          loading={isLoading}
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          icon={<AlertCircle />}
          trend="Urgent restock needed"
          color="red"
          loading={isLoading}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {additionalMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
              <span className={`text-xs font-medium ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activities with Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                />
              </div>
            </div>
            
            {/* Activity Summary */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Total: {filteredActivities.length} activities</span>
              <span>•</span>
              <span>Last updated: Just now</span>
            </div>
          </div>
          
          <DataTable
            headers={["Item", "Action", "Quantity", "Time"]}
            data={filteredActivities.map((activity) => ({
              Item: (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{activity.item}</span>
                </div>
              ),
              Action: (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.action.includes("Added")
                      ? "bg-green-100 text-green-800"
                      : activity.action.includes("Alert")
                      ? "bg-yellow-100 text-yellow-800"
                      : activity.action.includes("Sold")
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {activity.action}
                </span>
              ),
              Quantity: (
                <span className={`font-semibold ${
                  activity.action.includes("Sold") ? "text-red-600" : "text-green-600"
                }`}>
                  {activity.action.includes("Sold") ? "-" : "+"}{activity.quantity}
                </span>
              ),
              Time: (
                <span className="text-gray-500 text-sm">{activity.time}</span>
              ),
            }))}
            emptyMessage="No activities found matching your search"
          />
        </div>

        {/* Low Stock Alerts */}
        <DataTable
          title={
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} className="text-yellow-600" />
              <span>Low Stock Alerts - Needs Restock</span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {lowStockItems.length} critical
              </span>
            </div>
          }
          headers={["Product Name", "Current Stock", "Min Stock", "Action"]}
          data={lowStockItems.map((item) => ({
            "Product Name": (
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
            ),
            "Current Stock": (
              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-semibold">{item.currentStock}</span>
                {item.currentStock === 0 && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            ),
            "Min Stock": item.minStock,
            Action: (
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Reorder
              </button>
            ),
          }))}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution with Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Category Distribution</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
              <BarChart3 size={16} />
              <span>View Details</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                    }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 min-w-24">
                    {category.name}
                  </span>
                  <div className="flex-1 max-w-48">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${category.value}%`,
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 min-w-12 text-right">
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Largest Category</p>
                <p className="font-semibold">Electronics (35%)</p>
              </div>
              <div>
                <p className="text-gray-600">Fastest Growing</p>
                <p className="font-semibold text-green-600">Accessories (+5%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Categories</span>
                <span className="font-semibold">{stats.categories}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Avg. Item Value</span>
                <span className="font-semibold">
                  {formatCurrency(stats.totalValue / stats.totalItems)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Stock Turnover</span>
                <span className="font-semibold">2.4x</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Inventory Accuracy</span>
                <span className="font-semibold text-green-600">98.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reorder Rate</span>
                <span className="font-semibold">12.5%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 bg-blue-50 text-blue-700 p-3 rounded-lg hover:bg-blue-100 transition-colors">
                <ShoppingCart size={18} />
                <span className="font-medium">Place New Order</span>
              </button>
              <button className="w-full flex items-center space-x-3 bg-green-50 text-green-700 p-3 rounded-lg hover:bg-green-100 transition-colors">
                <Package size={18} />
                <span className="font-medium">Add New Product</span>
              </button>
              <button className="w-full flex items-center space-x-3 bg-purple-50 text-purple-700 p-3 rounded-lg hover:bg-purple-100 transition-colors">
                <BarChart3 size={18} />
                <span className="font-medium">Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;