import React from 'react';
import { AlertTriangle, AlertCircle, Clock, Zap } from 'lucide-react';

const UrgencyBadge = ({ urgency, showIcon = true }) => {
  const config = {
    critical: {
      color: 'bg-red-500/20 text-red-700 border-red-300',
      icon: Zap,
      label: 'Critical'
    },
    high: {
      color: 'bg-orange-500/20 text-orange-700 border-orange-300',
      icon: AlertCircle,
      label: 'High'
    },
    medium: {
      color: 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
      icon: AlertTriangle,
      label: 'Medium'
    },
    low: {
      color: 'bg-blue-500/20 text-blue-700 border-blue-300',
      icon: Clock,
      label: 'Low'
    }
  };

  const { color, icon: Icon, label } = config[urgency] || config.low;

  return (
    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full border ${color} text-sm font-medium`}>
      {showIcon && <Icon size={14} />}
      <span>{label}</span>
    </div>
  );
};

export default UrgencyBadge;