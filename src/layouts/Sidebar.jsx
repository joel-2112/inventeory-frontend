import React, { useState, useEffect } from 'react';
import { 
  Package, 
  X,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, activePath, menuItems }) => {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Initialize expanded state for menus with subItems
  useEffect(() => {
    const initialExpandedState = {};
    menuItems.forEach(item => {
      if (item.subItems) {
        // Check if any sub-item is active and expand the parent
        const hasActiveSubItem = item.subItems.some(subItem => 
          subItem.path === activePath
        );
        initialExpandedState[item.path] = hasActiveSubItem;
      }
    });
    setExpandedMenus(initialExpandedState);
  }, [activePath, menuItems]);

  // Toggle expand/collapse for menus with subItems
  const toggleMenu = (path) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Check if a menu item is active
  const isItemActive = (item) => {
    if (item.path === activePath) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === activePath);
    }
    return false;
  };

  // Check if a sub-item is active
  const isSubItemActive = (subItemPath) => {
    return subItemPath === activePath;
  };

  // Handle menu item click
  const handleMenuItemClick = (item, event) => {
    if (item.subItems) {
      event.preventDefault();
      toggleMenu(item.path);
    } else {
      navigate(item.path);
      // Close sidebar on mobile after selection
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  // Handle sub-item click
  const handleSubItemClick = (path) => {
    navigate(path);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
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
        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = isItemActive(item);
            const isExpanded = expandedMenus[item.path];
            
            return (
              <div key={index}>
                {/* Main menu item */}
                <button
                  onClick={(e) => handleMenuItemClick(item, e)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.subItems && (
                    <div className={`transform transition-transform duration-200 ${
                      isExpanded ? 'rotate-0' : '-rotate-90'
                    }`}>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                  )}
                </button>
                
                {/* Sub-items with smooth animation */}
                {item.subItems && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => {
                        const isSubActive = isSubItemActive(subItem.path);
                        return (
                          <button
                            key={subIndex}
                            onClick={() => handleSubItemClick(subItem.path)}
                            className={`
                              w-full text-left block py-2 px-3 text-sm rounded-lg transition-colors duration-200
                              ${isSubActive
                                ? 'bg-blue-100 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }
                            `}
                          >
                            {subItem.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;