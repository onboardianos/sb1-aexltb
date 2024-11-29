import React from 'react';
import { EngagementMetric } from '../../types/engagement';
import { TrendingUp, TrendingDown, Activity, Search, Users } from 'lucide-react';
import clsx from 'clsx';

interface EngagementOverviewProps {
  metrics: EngagementMetric[];
}

export const EngagementOverview: React.FC<EngagementOverviewProps> = ({ metrics }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return Activity;
      case 'resources':
        return Search;
      case 'social':
        return Users;
      default:
        return Activity;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => {
        const Icon = getIcon(metric.type);
        const isPositive = metric.trend > 0;

        return (
          <div
            key={metric.id}
            className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-gray-900">{metric.name}</h3>
              </div>
              {isPositive ? (
                <TrendingUp className="w-5 h-5 text-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-alert" />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2">
                <span className={clsx(
                  'text-sm font-medium',
                  isPositive ? 'text-success' : 'text-alert'
                )}>
                  {isPositive ? '+' : ''}{metric.trend}%
                </span>
                <span className="text-sm text-gray-500">vs previous</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};