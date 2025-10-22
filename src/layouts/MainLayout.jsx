import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumb from '../components/Breadcrumb';

const MainLayout = ({ children, activePath, menuItems, onPathChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activePath={activePath}
        menuItems={menuItems}
        onPathChange={onPathChange}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Breadcrumb Navigation - Only show if we have menuItems */}
          {menuItems && (
            <Breadcrumb 
              activePath={activePath} 
              menuItems={menuItems}
              onPathChange={onPathChange}
            />
          )}
          
          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;