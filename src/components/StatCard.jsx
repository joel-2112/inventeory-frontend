import React from 'react';

const StatCard = ({ title, value, icon, trend, color = 'blue', loading = false }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${colorClasses[color]} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80">{title}</p>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-2 w-3/4"></div>
          ) : (
            <p className="text-2xl font-bold mt-2">{value}</p>
          )}
          {trend && (
            <div className="text-xs mt-2 opacity-75 flex items-center space-x-1">
              {trend}
            </div>
          )}
        </div>
        <div className="text-3xl opacity-80">
          {loading ? (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          ) : (
            icon
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;