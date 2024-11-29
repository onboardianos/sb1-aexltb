import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { CorrelationData } from '../../types/analytics';

interface CorrelationInsightsProps {
  correlations: CorrelationData[];
}

export const CorrelationInsights: React.FC<CorrelationInsightsProps> = ({ correlations }) => {
  const getCorrelationColor = (strength: string, direction: string) => {
    if (direction === 'positive') {
      return 'text-green-500';
    }
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">Correlation Insights</h3>
      </div>
      <div className="space-y-4">
        {correlations.map((correlation, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>{correlation.metric1}</span>
                <ArrowRight className="w-4 h-4" />
                <span>{correlation.metric2}</span>
              </div>
              <span
                className={`font-medium ${getCorrelationColor(
                  correlation.strength,
                  correlation.direction
                )}`}
              >
                {(correlation.correlation * 100).toFixed(1)}% {correlation.direction}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {correlation.strength.charAt(0).toUpperCase() + correlation.strength.slice(1)} correlation
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};