import React from 'react';
import { useLocation } from 'react-router-dom';

const TestPage = ({ title, description }) => {
  const location = useLocation();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Path:</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Coming Features</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Advanced filtering</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Bulk operations</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Export capabilities</span>
            </li>
          </ul>
        </div>

        {/* Actions Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              Add New Item
            </button>
            <button className="w-full text-left p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              View Reports
            </button>
            <button className="w-full text-left p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              Manage Settings
            </button>
          </div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="max-w-md mx-auto">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title} Content</h4>
          <p className="text-gray-600 mb-4">
            This is a placeholder for the {title.toLowerCase()} page content. The actual implementation would include:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• Data tables and lists</li>
            <li>• Search and filter functionality</li>
            <li>• Forms for adding/editing items</li>
            <li>• Detailed analytics and reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestPage;