import React from 'react';
import { SocialActivity } from '../../types/engagement';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface SocialEngagementProps {
  data: SocialActivity[];
}

export const SocialEngagement: React.FC<SocialEngagementProps> = ({ data }) => {
  const processedData = data.reduce((acc: any[], curr) => {
    const existingDate = acc.find(item => item.date === curr.date);
    if (existingDate) {
      existingDate[curr.type] = curr.count;
    } else {
      acc.push({
        date: curr.date,
        [curr.type]: curr.count,
      });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold mb-6">Social Engagement</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <ThumbsUp className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-600">Total Likes</div>
            <div className="text-lg font-semibold">
              {data.filter(item => item.type === 'likes').reduce((sum, item) => sum + item.count, 0)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <MessageSquare className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-600">Comments</div>
            <div className="text-lg font-semibold">
              {data.filter(item => item.type === 'comments').reduce((sum, item) => sum + item.count, 0)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Share2 className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-600">Posts</div>
            <div className="text-lg font-semibold">
              {data.filter(item => item.type === 'posts').reduce((sum, item) => sum + item.count, 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="likes" name="Likes" stroke="#00498B" strokeWidth={2} />
            <Line type="monotone" dataKey="comments" name="Comments" stroke="#0094D4" strokeWidth={2} />
            <Line type="monotone" dataKey="posts" name="Posts" stroke="#00AAE9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};