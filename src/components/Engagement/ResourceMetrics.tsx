import React from 'react';
import { ResourceMetric } from '../../types/engagement';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Clock, Search, BookOpen } from 'lucide-react';

interface ResourceMetricsProps {
  data: ResourceMetric[];
}

export const ResourceMetrics: React.FC<ResourceMetricsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold mb-6">Resource Analytics</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Search className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-600">Resource Searches</div>
            <div className="text-lg font-semibold">
              {data.reduce((sum, item) => sum + item.searchCount, 0)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <BookOpen className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-600">Material Access</div>
            <div className="text-lg font-semibold">
              {data.reduce((sum, item) => sum + item.accessCount, 0)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-600">Time Engaged</div>
            <div className="text-lg font-semibold">
              {Math.round(data.reduce((sum, item) => sum + item.timeSpent, 0))}h
            </div>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="resourceType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="searchCount" name="Search Activity" fill="#00498B" />
            <Bar dataKey="accessCount" name="Access Count" fill="#0094D4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};