import React from 'react';
import { MessageTrend } from '../../types/communication';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface MessageTrendsProps {
  data: MessageTrend[];
}

export const MessageTrends: React.FC<MessageTrendsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-base font-semibold mb-4">Message Trends</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="one-to-one"
              name="1:1 Chats"
              stroke="#00498B"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="group"
              name="Group Chats"
              stroke="#0094D4"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="cross-department"
              name="Cross-Department"
              stroke="#00AAE9"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};