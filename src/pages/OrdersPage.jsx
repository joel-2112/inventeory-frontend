import React, { useState, useEffect } from 'react';
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
  Satellite
} from 'lucide-react';
import { ordersData } from '../mockdata/ordersData';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeline, setSelectedTimeline] = useState('active'); // active, completed, all
  const [viewMode, setViewMode] = useState('timeline'); // timeline, workflow, analytics
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [intelligenceMode, setIntelligenceMode] = useState(true);

  useEffect(() => {
    setOrders(ordersData);
    setFilteredOrders(ordersData);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    if (selectedTimeline !== 'all') {
      if (selectedTimeline === 'active') {
        filtered = filtered.filter(order => !['delivered', 'cancelled'].includes(order.status));
      } else if (selectedTimeline === 'completed') {
        filtered = filtered.filter(order => ['delivered', 'cancelled'].includes(order.status));
      }
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, selectedStatus, selectedTimeline]);

  const getStatusConfig = (status) => {
    const config = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
      'confirmed': { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Confirmed' },
      'processing': { color: 'bg-purple-100 text-purple-800', icon: Workflow, label: 'Processing' },
      'shipped': { color: 'bg-cyan-100 text-cyan-800', icon: Truck, label: 'Shipped' },
      'delivered': { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: X, label: 'Cancelled' }
    };
    return config[status] || config.pending;
  };

  const StatusBadge = ({ status }) => {
    const { color, icon: Icon, label } = getStatusConfig(status);
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${color}`}>
        <Icon className="w-3 h-3" />
        <span>{label}</span>
      </div>
    );
  };

  const TimelineView = () => (
    <div className="space-y-6">
      {filteredOrders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Order Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-mono text-sm text-gray-900">{order.id}</span>
              </div>
              <StatusBadge status={order.status} />
              {intelligenceMode && order.priority === 'high' && (
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
                    <div className="font-medium text-gray-900">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.quantity}x {item.name}</span>
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
                  <span className="text-sm font-medium text-gray-900">Order Journey</span>
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
                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((stage, index) => {
                      const isCompleted = getStageIndex(order.status) >= index;
                      const isCurrent = getStageIndex(order.status) === index;
                      
                      return (
                        <div key={stage} className="text-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                            isCompleted 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-400'
                          } ${isCurrent ? 'ring-2 ring-blue-300' : ''}`}>
                            {getStageIcon(stage, isCompleted)}
                          </div>
                          <div className={`text-xs ${
                            isCompleted ? 'text-blue-600 font-medium' : 'text-gray-500'
                          }`}>
                            {stage.charAt(0).toUpperCase() + stage.slice(1)}
                          </div>
                          {intelligenceMode && isCurrent && order.estimatedDelivery && (
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
                    <div className={`text-sm font-medium ${
                      order.riskScore < 30 ? 'text-green-600' :
                      order.riskScore < 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {order.riskScore}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">SLA Compliance</div>
                    <div className="text-sm font-medium text-green-600">94%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Customer Value</div>
                    <div className="text-sm font-medium text-blue-600">High</div>
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
    const stages = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    return stages.indexOf(status);
  };

  const getStageIcon = (stage, isCompleted) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      processing: <Workflow className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <Package className="w-4 h-4" />
    };
    return icons[stage];
  };

  const AnalyticsView = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Active Orders', value: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length, icon: Workflow, trend: '+12%' },
          { label: 'Avg Delivery Time', value: '2.3 days', icon: Clock, trend: '-0.5 days' },
          { label: 'SLA Compliance', value: '96.7%', icon: CheckCircle, trend: '+2.1%' },
          { label: 'Revenue Today', value: '$12.4K', icon: DollarSign, trend: '+8.3%' }
        ].map((stat, index) => (
          <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
            <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-light text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-green-600 mt-1">{stat.trend}</div>
          </div>
        ))}
      </div>
      
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
        <p className="text-gray-600">Real-time order analytics and predictive insights</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Intelligence Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-light text-gray-900">Order Intelligence</h1>
                  <p className="text-sm text-gray-500">AI-powered order tracking & management</p>
                </div>
              </div>
              
              <button
                onClick={() => setIntelligenceMode(!intelligenceMode)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                  intelligenceMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>AI Mode {intelligenceMode ? 'On' : 'Off'}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
                <Plus className="w-4 h-4" />
                <span>New Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-8">
            {[
              { key: 'timeline', icon: Layers, label: 'Timeline' },
              { key: 'workflow', icon: Workflow, label: 'Workflow' },
              { key: 'analytics', icon: BarChart3, label: 'Analytics' }
            ].map((view) => (
              <button
                key={view.key}
                onClick={() => setViewMode(view.key)}
                className={`py-4 border-b-2 transition-colors ${
                  viewMode === view.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
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
      <div className="max-w-7xl mx-auto px-6 py-6">
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
            {filteredOrders.length} orders • {orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length} active
          </p>
          {intelligenceMode && (
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-red-500" />
                <span>{orders.filter(o => o.priority === 'high').length} high priority</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-yellow-500" />
                <span>{orders.filter(o => o.riskScore > 70).length} need attention</span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic View Renderer */}
        {viewMode === 'timeline' && <TimelineView />}
        {viewMode === 'analytics' && <AnalyticsView />}

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedTimeline('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;