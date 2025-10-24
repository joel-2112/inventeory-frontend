import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  MapPin,
  User,
  DollarSign,
  Calendar,
  BarChart3,
  Zap,
  Workflow,
  Layers,
  ArrowRight,
  Eye,
  Edit3,
  MoreVertical,
  ChevronDown,
  Sparkles,
  Cpu,
  Brain,
  Satellite,
  ArrowLeft,
  Save,
  ShoppingCart,
  CreditCard,
  Mail,
  Phone,
  Home,
  TrendingUp,
} from "lucide-react";
import { ordersData } from "../mockdata/ordersData";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTimeline, setSelectedTimeline] = useState("active");
  const [viewMode, setViewMode] = useState("timeline");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [intelligenceMode, setIntelligenceMode] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: { name: "", email: "", phone: "" },
    items: [{ name: "", quantity: 1, price: 0 }],
    shipping: { address: "", city: "", country: "", method: "standard" },
    priority: "medium",
  });

  useEffect(() => {
    setOrders(ordersData);
    setFilteredOrders(ordersData);
  }, []);

  useEffect(() => {
    let filtered = orders;
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }
    if (selectedTimeline !== "all") {
      if (selectedTimeline === "active") {
        filtered = filtered.filter(
          (order) => !["delivered", "cancelled"].includes(order.status)
        );
      } else if (selectedTimeline === "completed") {
        filtered = filtered.filter((order) =>
          ["delivered", "cancelled"].includes(order.status)
        );
      }
    }
    setFilteredOrders(filtered);
  }, [orders, searchTerm, selectedStatus, selectedTimeline]);

  const getStatusConfig = (status) => {
    const config = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        label: "Pending",
      },
      confirmed: {
        color: "bg-blue-100 text-blue-800",
        icon: CheckCircle,
        label: "Confirmed",
      },
      processing: {
        color: "bg-purple-100 text-purple-800",
        icon: Workflow,
        label: "Processing",
      },
      shipped: {
        color: "bg-cyan-100 text-cyan-800",
        icon: Truck,
        label: "Shipped",
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        label: "Delivered",
      },
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: X,
        label: "Cancelled",
      },
    };
    return config[status] || config.pending;
  };

  const StatusBadge = ({ status }) => {
    const { color, icon: Icon, label } = getStatusConfig(status);
    return (
      <div
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${color}`}
      >
        <Icon className="w-3 h-3" />
        <span>{label}</span>
      </div>
    );
  };

  // Creative Workflow View
  const WorkflowView = () => {
    const workflowStages = {
      pending: orders.filter((o) => o.status === "pending"),
      confirmed: orders.filter((o) => o.status === "confirmed"),
      processing: orders.filter((o) => o.status === "processing"),
      shipped: orders.filter((o) => o.status === "shipped"),
      delivered: orders.filter((o) => o.status === "delivered"),
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Order Workflow Pipeline
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>High Priority</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Object.entries(workflowStages).map(([stage, stageOrders]) => (
            <div key={stage} className="text-center">
              <div className="mb-4">
                <div className="text-2xl font-light text-gray-900">
                  {stageOrders.length}
                </div>
                <div className="text-sm text-gray-600 capitalize">{stage}</div>
              </div>

              <div className="space-y-3">
                {stageOrders.slice(0, 4).map((order) => (
                  <div
                    key={order.id}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all hover:shadow-md ${
                      order.priority === "high"
                        ? "border-red-200 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {order.id}
                      </div>
                      {order.priority === "high" && (
                        <Zap className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {order.customer.name}
                    </div>
                    <div className="text-xs font-medium text-gray-900 mt-1">
                      ${order.total}
                    </div>
                  </div>
                ))}

                {stageOrders.length > 4 && (
                  <div className="text-xs text-gray-500 text-center py-2">
                    +{stageOrders.length - 4} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Advanced Analytics View
  const AnalyticsView = () => {
    const orderTrendsData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Orders",
          data: [65, 78, 90, 81, 96, 105],
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          Filler: true,
        },
      ],
    };

    const statusDistributionData = {
      labels: ["Delivered", "Processing", "Shipped", "Pending"],
      datasets: [
        {
          data: [45, 25, 20, 10],
          backgroundColor: [
            "rgb(34, 197, 94)",
            "rgb(139, 92, 246)",
            "rgb(6, 182, 212)",
            "rgb(245, 158, 11)",
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    };

    const revenueData = {
      labels: ["Electronics", "Furniture", "Clothing", "Accessories"],
      datasets: [
        {
          label: "Revenue ($)",
          data: [12500, 8900, 6200, 3400],
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderRadius: 4,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Revenue",
              value: "$31,400",
              change: "+12.5%",
              icon: DollarSign,
              color: "green",
            },
            {
              label: "Avg Order Value",
              value: "$247",
              change: "+5.2%",
              icon: ShoppingCart,
              color: "blue",
            },
            {
              label: "Conversion Rate",
              value: "3.8%",
              change: "+0.4%",
              icon: TrendingUp,
              color: "purple",
            },
            {
              label: "Customer Satisfaction",
              value: "94%",
              change: "+2.1%",
              icon: CheckCircle,
              color: "green",
            },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 text-${metric.color}-600`} />
                <span
                  className={`text-sm font-medium text-${metric.color}-600`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Trends */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Order Trends
            </h3>
            <Line data={orderTrendsData} options={chartOptions} height={120} />
          </div>

          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Order Status Distribution
            </h3>
            <div className="h-48 flex items-center justify-center">
              <Doughnut data={statusDistributionData} options={chartOptions} />
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Revenue by Category
            </h3>
            <Bar data={revenueData} options={chartOptions} height={80} />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Delivery Performance
            </h4>
            <div className="space-y-3">
              {[
                {
                  label: "On Time Delivery",
                  value: "96%",
                  color: "text-green-600",
                },
                {
                  label: "Avg Delivery Time",
                  value: "2.3 days",
                  color: "text-blue-600",
                },
                {
                  label: "Express Orders",
                  value: "34%",
                  color: "text-purple-600",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-medium ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Customer Insights
            </h4>
            <div className="space-y-3">
              {[
                {
                  label: "Repeat Customers",
                  value: "42%",
                  color: "text-green-600",
                },
                {
                  label: "Avg Customer Value",
                  value: "$1,240",
                  color: "text-blue-600",
                },
                {
                  label: "Support Tickets",
                  value: "12",
                  color: "text-yellow-600",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-medium ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Operational Metrics
            </h4>
            <div className="space-y-3">
              {[
                {
                  label: "Order Accuracy",
                  value: "99.2%",
                  color: "text-green-600",
                },
                { label: "Return Rate", value: "2.1%", color: "text-red-600" },
                {
                  label: "Peak Hours",
                  value: "2-4 PM",
                  color: "text-purple-600",
                },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`text-sm font-medium ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Order Form Component
  const OrderForm = () => {
    const handleAddItem = () => {
      setNewOrder((prev) => ({
        ...prev,
        items: [...prev.items, { name: "", quantity: 1, price: 0 }],
      }));
    };

    const handleRemoveItem = (index) => {
      setNewOrder((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    };

    const handleItemChange = (index, field, value) => {
      const updatedItems = newOrder.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setNewOrder((prev) => ({ ...prev, items: updatedItems }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const total = newOrder.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        ...newOrder,
        total,
        estimatedDelivery: "2024-01-30",
        riskScore: Math.floor(Math.random() * 100),
      };
      setOrders((prev) => [order, ...prev]);
      setShowOrderForm(false);
      setNewOrder({
        customer: { name: "", email: "", phone: "" },
        items: [{ name: "", quantity: 1, price: 0 }],
        shipping: { address: "", city: "", country: "", method: "standard" },
        priority: "medium",
      });
    };

    return (
      <div className="fixed inset-y-0 right-0  bg-white border-l border-gray-200 shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between w-full fixed z-10 p-4 top-0 bg-gray-100 rounded-md border border-gray-50">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowOrderForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div >
                <h2 className="text-lg font-medium text-gray-900">
                  Create New Order
                </h2>
                <p className="text-sm text-gray-600">
                  Add customer and order details
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Customer Information</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newOrder.customer.name}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        customer: { ...prev.customer, name: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newOrder.customer.email}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        customer: { ...prev.customer, email: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newOrder.customer.phone}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        customer: { ...prev.customer, phone: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Order Items</span>
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Item
                </button>
              </div>

              <div className="space-y-4">
                {newOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-end space-x-2 p-3 bg-white rounded border"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(index, "name", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="w-16">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Qty
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        required
                      />
                    </div>
                    <div className="w-20">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                    {newOrder.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mb-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Shipping Information</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={newOrder.shipping.address}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        shipping: { ...prev.shipping, address: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newOrder.shipping.city}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        shipping: { ...prev.shipping, city: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newOrder.shipping.country}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        shipping: { ...prev.shipping, country: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shipping Method
                  </label>
                  <select
                    value={newOrder.shipping.method}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        shipping: { ...prev.shipping, method: e.target.value },
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="overnight">Overnight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newOrder.priority}
                    onChange={(e) =>
                      setNewOrder((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className="flex items-between justify-between p-4 bg-gray-50 ">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Create Order</span>
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Timeline View (from previous implementation)
  const TimelineView = () => (
    <div className="space-y-6">
      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          {/* Order Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-mono text-sm text-gray-900">
                  {order.id}
                </span>
              </div>
              <StatusBadge status={order.status} />
              {intelligenceMode && order.priority === "high" && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  <Zap className="w-3 h-3" />
                  <span>High Priority</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{order.date}</span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Order Intelligence */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer & Items */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {order.customer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customer.email}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{order.items.length - 2} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Intelligence Timeline */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900">
                    Order Journey
                  </span>
                  {intelligenceMode && (
                    <div className="flex items-center space-x-1 text-xs text-blue-600">
                      <Brain className="w-3 h-3" />
                      <span>AI Prediction</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  {/* Timeline Track */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-px h-12 bg-gray-200"></div>

                  <div className="grid grid-cols-4 gap-4 relative z-10">
                    {[
                      "pending",
                      "confirmed",
                      "processing",
                      "shipped",
                      "delivered",
                    ].map((stage, index) => {
                      const isCompleted = getStageIndex(order.status) >= index;
                      const isCurrent = getStageIndex(order.status) === index;

                      return (
                        <div key={stage} className="text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                              isCompleted
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-400"
                            } ${isCurrent ? "ring-2 ring-blue-300" : ""}`}
                          >
                            {getStageIcon(stage, isCompleted)}
                          </div>
                          <div
                            className={`text-xs ${
                              isCompleted
                                ? "text-blue-600 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {stage.charAt(0).toUpperCase() + stage.slice(1)}
                          </div>
                          {intelligenceMode &&
                            isCurrent &&
                            order.estimatedDelivery && (
                              <div className="text-xs text-green-600 mt-1">
                                Est: {order.estimatedDelivery}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Intelligence Metrics */}
            {intelligenceMode && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-500">Risk Score</div>
                    <div
                      className={`text-sm font-medium ${
                        order.riskScore < 30
                          ? "text-green-600"
                          : order.riskScore < 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.riskScore}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">SLA Compliance</div>
                    <div className="text-sm font-medium text-green-600">
                      94%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Customer Value</div>
                    <div className="text-sm font-medium text-blue-600">
                      High
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${order.total}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>{order.items.length} items</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{order.shipping.city}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                  <span>Actions</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const getStageIndex = (status) => {
    const stages = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
    ];
    return stages.indexOf(status);
  };

  const getStageIcon = (stage, isCompleted) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      processing: <Workflow className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <Package className="w-4 h-4" />,
    };
    return icons[stage];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className={`transition-all duration-300`}>
        {/* Intelligence Header */}
        <div className="bg-white border-b border-gray-200">
          <div className={`mx-auto px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-light text-gray-900">
                      Order Intelligence
                    </h1>
                    <p className="text-sm text-gray-500">
                      AI-powered order tracking & management
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIntelligenceMode(!intelligenceMode)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                    intelligenceMode
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>AI Mode {intelligenceMode ? "On" : "Off"}</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className={`mx-auto px-6 `}>
            <div className="flex items-center space-x-8">
              {[
                { key: "timeline", icon: Layers, label: "Timeline" },
                { key: "workflow", icon: Workflow, label: "Workflow" },
                { key: "analytics", icon: BarChart3, label: "Analytics" },
              ].map((view) => (
                <button
                  key={view.key}
                  onClick={() => setViewMode(view.key)}
                  className={`py-4 border-b-2 transition-colors ${
                    viewMode === view.key
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <view.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{view.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`mx-auto px-6 py-6 `}>
          {/* Intelligence Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders, customers, or items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Orders</option>
                <option value="active">Active Only</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 text-sm">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>

              {intelligenceMode && (
                <div className="flex items-center space-x-2 text-xs text-blue-600">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Insights Active</span>
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm">
              {filteredOrders.length} orders •{" "}
              {
                orders.filter(
                  (o) => !["delivered", "cancelled"].includes(o.status)
                ).length
              }{" "}
              active
            </p>
            {intelligenceMode && (
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-red-500" />
                  <span>
                    {orders.filter((o) => o.priority === "high").length} high
                    priority
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-yellow-500" />
                  <span>
                    {orders.filter((o) => o.riskScore > 70).length} need
                    attention
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic View Renderer */}
          {viewMode === "timeline" && <TimelineView />}
          {viewMode === "workflow" && <WorkflowView />}
          {viewMode === "analytics" && <AnalyticsView />}

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("all");
                  setSelectedTimeline("all");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Form - Fixed on the right */}
      {showOrderForm && <OrderForm />}
    </div>
  );
};

export default OrdersPage;
