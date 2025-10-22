import { 
  Package, 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  FileText,
  Truck,
  X,
  ChevronDown
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/', active: true },
    { icon: <Package size={20} />, label: 'Inventory', path: '/inventory', subItems: [
      { label: 'All Products', path: '/inventory' },
      { label: 'Categories', path: '/inventory/categories' },
      { label: 'Low Stock', path: '/inventory/low-stock' },
    ]},
    { icon: <Truck size={20} />, label: 'Suppliers', path: '/suppliers' },
    { icon: <Users size={20} />, label: 'Customers', path: '/customers' },
    { icon: <FileText size={20} />, label: 'Orders', path: '/orders' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30
        w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">StockMaster</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-colors
                  ${item.active 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.subItems && (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>
              
              {/* Sub-items */}
              {item.subItems && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.path}
                      className="block py-2 px-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900">Need help?</p>
            <p className="text-xs text-blue-700 mt-1">Check our documentation</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;