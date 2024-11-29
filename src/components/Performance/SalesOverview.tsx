import React from 'react';
import { SalesMetric } from '../../types/performance';
import { TrendingUp, TrendingDown, Car } from 'lucide-react';
import clsx from 'clsx';

interface SalesOverviewProps {
  metrics: SalesMetric[];
}

export const SalesOverview: React.FC<SalesOverviewProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Sales Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-blue-500" />
                <span className="font-medium capitalize">{metric.type} Units</span>
              </div>
              {metric.trend > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Units Sold</span>
                <span className="font-semibold">{metric.units}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Price</span>
                <span className="font-semibold">
                  ${metric.averagePrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">vs Previous</span>
                <span className={clsx(
                  'font-semibold',
                  metric.trend > 0 ? 'text-green-500' : 'text-red-500'
                )}>
                  {metric.trend > 0 ? '+' : ''}{metric.trend}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};