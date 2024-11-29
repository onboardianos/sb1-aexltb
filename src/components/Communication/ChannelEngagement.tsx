import React from 'react';
import { ChannelEngagement as ChannelEngagementType } from '../../types/communication';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Clock, Users } from 'lucide-react';

interface ChannelEngagementProps {
  data: ChannelEngagementType[];
}

export const ChannelEngagement: React.FC<ChannelEngagementProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-base font-semibold mb-4">Channel Engagement</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary to-primary-light rounded-lg text-white">
          <Users className="w-6 h-6" />
          <div>
            <div className="text-xs opacity-90">Total Active Users</div>
            <div className="text-xl font-bold">
              {data.reduce((sum, channel) => sum + channel.activeUsers, 0)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-secondary to-secondary-light rounded-lg text-white">
          <Clock className="w-6 h-6" />
          <div>
            <div className="text-xs opacity-90">Avg Response Time</div>
            <div className="text-xl font-bold">
              {Math.round(
                data.reduce((sum, channel) => sum + channel.averageResponseTime, 0) / data.length
              )}m
            </div>
          </div>
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="messagesSent" name="Messages Sent" fill="#00498B" />
            <Bar dataKey="activeUsers" name="Active Users" fill="#0094D4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};