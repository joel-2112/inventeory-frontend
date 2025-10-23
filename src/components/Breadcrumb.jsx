import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Breadcrumb = ({ activePath, menuItems }) => {
  const navigate = useNavigate();

  // Function to get the breadcrumb items based on active path
  const getBreadcrumbItems = () => {
    const items = [];    
    
    // If we're not on the dashboard, find the active items
    if (activePath !== '/') {
      // Find the main menu item that matches or contains the active path
      for (const item of menuItems) {
        if (item.path === activePath) {
          // Direct match with main menu item
          items.push({ label: item.label, path: item.path });
          break;
        } else if (item.subItems) {
          // Check if any sub-item matches
          const activeSubItem = item.subItems.find(subItem => subItem.path === activePath);
          if (activeSubItem) {
            // Add parent and child
            items.push({ label: item.label, path: item.path });
            items.push({ label: activeSubItem.label, path: activeSubItem.path });
            break;
          }
        }
      }
    }
    
    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  const handleBreadcrumbClick = (path) => {
    if (path !== activePath) {
      navigate(path);
    }
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center space-x-2">
          {index === 0 ? (
            <Home size={16} className="text-gray-400" />
          ) : (
            <ChevronRight size={16} className="text-gray-400" />
          )}
          
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <button 
              onClick={() => handleBreadcrumbClick(item.path)}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;