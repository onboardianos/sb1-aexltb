import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { format } from 'date-fns';

interface ConsistencyData {
  date: string;
  rate: number;
  target: number;
}

interface ConsistencyMetricsProps {
  data: ConsistencyData[];
}

export const ConsistencyMetrics: React.FC<ConsistencyMetricsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold mb-4">Consistency Rates</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => format(new Date(value), 'MMM d')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
              formatter={(value: number) => [`${value}%`, 'Rate']}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#00498B"
              strokeWidth={2}
              dot={{ fill: '#00498B' }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#C80407"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span className="text-sm text-gray-600">Actual Rate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border-2 border-alert rounded-full" />
          <span className="text-sm text-gray-600">Target Rate</span>
        </div>
      </div>
    </div>
  );
};