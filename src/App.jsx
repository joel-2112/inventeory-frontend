import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TestPage from "./pages/TestPage";
import {
  Home,
  Package,
  Truck,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";
import AllProducts from "./pages/AllProducts";
import CategoriesPage from "./pages/CatagoriesPage";
import LowStockPage from "./pages/LowStockPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/HomePage";

// Define menu structure here to share between components
const menuItems = [
  { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
  {
    icon: <Package size={20} />,
    label: "Inventory",
    path: "/inventory",
    subItems: [
      { label: "All Products", path: "/inventory" },
      { label: "Categories", path: "/inventory/categories" },
      { label: "Low Stock", path: "/inventory/low-stock" },
    ],
  },
  { icon: <Truck size={20} />, label: "Suppliers", path: "/suppliers" },
  { icon: <Users size={20} />, label: "Customers", path: "/customers" },
  { icon: <ShoppingCart size={20} />, label: "Orders", path: "/orders" },
  { icon: <BarChart3 size={20} />, label: "Analytics", path: "/analytics" },
  { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
];

// Component for routes that should be inside MainLayout
function MainLayoutRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  const handlePathChange = (path) => {
    navigate(path);
  };

  return (
    <MainLayout
      activePath={activePath}
      menuItems={menuItems}
      onPathChange={handlePathChange}
    >
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Inventory Routes */}
        <Route
          path="/inventory"
          element={
            <AllProducts
              title="All Products"
              description="Manage your complete product inventory. View, edit, and organize all your products in one place."
            />
          }
        />
        <Route
          path="/inventory/categories"
          element={
            <CategoriesPage
              title="Categories"
              description="Organize your products into categories for better inventory management and reporting."
            />
          }
        />
        <Route
          path="/inventory/low-stock"
          element={
            <LowStockPage
              title="Low Stock Alerts"
              description="Monitor products that are running low and need restocking to avoid stockouts."
            />
          }
        />

        {/* Other Routes */}
        <Route
          path="/suppliers"
          element={
            <TestPage
              title="Suppliers"
              description="Manage your supplier relationships, contact information, and order history."
            />
          }
        />
        <Route
          path="/customers"
          element={
            <TestPage
              title="Customers"
              description="View and manage customer information, order history, and preferences."
            />
          }
        />
        <Route
          path="/orders"
          element={
            <TestPage
              title="Orders"
              description="Track and manage all incoming and outgoing orders with real-time status updates."
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <TestPage
              title="Analytics"
              description="Gain insights into your inventory performance, sales trends, and business metrics."
            />
          }
        />
        <Route
          path="/settings"
          element={
            <TestPage
              title="Settings"
              description="Configure your inventory management system preferences and user settings."
            />
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Page Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The page you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          }
        />
      </Routes>
    </MainLayout>
  );
}

// Main App component with Router
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - outside MainLayout */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes - inside MainLayout */}
        <Route path="/*" element={<MainLayoutRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;