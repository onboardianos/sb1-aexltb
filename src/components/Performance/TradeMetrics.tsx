import React from 'react';
import { TradeMetric } from '../../types/performance';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { RefreshCw } from 'lucide-react';

interface TradeMetricsProps {
  metric: TradeMetric;
}

export const TradeMetrics: React.FC<TradeMetricsProps> = ({ metric }) => {
  const data = [
    { name: 'Capture Rate', value: metric.captureRate },
    { name: 'Remaining', value: 100 - metric.captureRate },
  ];

  const COLORS = ['#3B82F6', '#E5E7EB'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <RefreshCw className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">Trade-In Performance</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600">Capture Rate</div>
            <div className="text-2xl font-bold">{metric.captureRate}%</div>
            <div className={`text-sm ${metric.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metric.trend > 0 ? '+' : ''}{metric.trend}% vs previous
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600">Average Hold</div>
            <div className="text-2xl font-bold">${metric.averageHold.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};