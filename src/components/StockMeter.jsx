import React from 'react';

const StockMeter = ({ current, min, max, size = "medium" }) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const dangerThreshold = (min / max) * 100;
  
  const sizes = {
    small: { width: 80, height: 8 },
    medium: { width: 120, height: 12 },
    large: { width: 160, height: 16 }
  };

  const { width, height } = sizes[size];

  const getColor = () => {
    if (current === 0) return 'bg-red-500';
    if (current <= min) return 'bg-orange-500';
    if (percentage <= dangerThreshold * 1.5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center space-x-3">
      <div 
        className="relative bg-gray-200 rounded-full overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Danger zone indicator */}
        <div 
          className="absolute left-0 top-0 h-full bg-red-200 opacity-30"
          style={{ width: `${dangerThreshold}%` }}
        ></div>
        
        {/* Current stock level */}
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Min stock indicator line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-red-500"
          style={{ left: `${dangerThreshold}%` }}
        ></div>
      </div>
      
      <div className="text-sm font-medium text-gray-700 min-w-12">
        {current}/{max}
      </div>
    </div>
  );
};

export default StockMeter;