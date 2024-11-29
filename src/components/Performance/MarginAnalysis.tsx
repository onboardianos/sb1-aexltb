import React from 'react';
import { MarginMetric } from '../../types/performance';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign } from 'lucide-react';

interface MarginAnalysisProps {
  metrics: MarginMetric[];
}

export const MarginAnalysis: React.FC<MarginAnalysisProps> = ({ metrics }) => {
  const data = metrics.map(metric => ({
    type: metric.type.charAt(0).toUpperCase() + metric.type.slice(1),
    grossProfit: metric.grossProfit,
    pvr: metric.pvr,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="w-6 h-6 text-green-500" />
        <h3 className="text-lg font-semibold">Margin Analysis</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="grossProfit"
              name="Gross Profit"
              fill="#3B82F6"
            />
            <Bar
              yAxisId="right"
              dataKey="pvr"
              name="PVR"
              fill="#10B981"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        {metrics.map(metric => (
          <div key={metric.id} className="border rounded-lg p-4">
            <div className="text-sm text-gray-600 capitalize mb-1">
              {metric.type} Units
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gross Profit</span>
                <span className="font-semibold">
                  ${metric.grossProfit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>PVR</span>
                <span className="font-semibold">
                  ${metric.pvr.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};