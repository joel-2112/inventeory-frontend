import React from "react";
import { Package, AlertTriangle, DollarSign, AlertCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import {
  inventoryStats,
  recentActivities,
  lowStockItems,
  categoryDistribution,
} from "../mockdata/inventoryData";

const Dashboard = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your inventory today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activities */}
        <DataTable
          title="Recent Activities"
          headers={["Item", "Action", "Quantity", "Time"]}
          data={recentActivities.map((activity) => ({
            Item: activity.item,
            Action: (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.action.includes("Added")
                    ? "bg-green-100 text-green-800"
                    : activity.action.includes("Alert")
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {activity.action}
              </span>
            ),
            Quantity: activity.quantity,
            Time: activity.time,
          }))}
        />

        {/* Low Stock Alerts */}
        <DataTable
          title="Low Stock Alerts - Needs Restock"
          headers={["Product Name", "Current Stock", "Min Stock", "Status"]}
          data={lowStockItems.map((item) => ({
            "Product Name": item.name,
            "Current Stock": (
              <span className="text-red-600 font-semibold">
                {item.currentStock}
              </span>
            ),
            "Min Stock": item.minStock,
            Status: (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                Critical
              </span>
            ),
          }))}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Category Distribution
          </h3>
          <div className="space-y-3">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                    }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${category.value}%`,
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">
                    {category.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Categories</span>
              <span className="font-semibold">{inventoryStats.categories}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Item Value</span>
              <span className="font-semibold">
                {formatCurrency(
                  inventoryStats.totalValue / inventoryStats.totalItems
                )}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Stock Turnover</span>
              <span className="font-semibold">2.4x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inventory Accuracy</span>
              <span className="font-semibold text-green-600">98.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
