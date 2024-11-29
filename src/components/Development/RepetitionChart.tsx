import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { RepetitionMetric } from '../../types/development';
import { format, parseISO } from 'date-fns';

interface RepetitionChartProps {
  data: RepetitionMetric[];
}

export const RepetitionChart: React.FC<RepetitionChartProps> = ({ data }) => {
  const processedData = data.reduce((acc: any[], curr) => {
    const date = format(parseISO(curr.date), 'MMM dd');
    const existing = acc.find(item => item.date === date);
    
    if (existing) {
      existing[curr.type] = curr.count;
    } else {
      acc.push({
        date,
        [curr.type]: curr.count,
      });
    }
    
    return acc;
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Repetition Activity</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="simulation" fill="#3B82F6" name="Simulations" />
            <Bar dataKey="feedback" fill="#10B981" name="Feedback Reviews" />
            <Bar dataKey="test" fill="#F59E0B" name="Test Attempts" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};