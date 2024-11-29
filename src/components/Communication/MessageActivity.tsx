import React from 'react';
import { MessageMetric } from '../../types/communication';
import { MessageSquare, Users, Building2, TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface MessageActivityProps {
  metrics: MessageMetric[];
}

export const MessageActivity: React.FC<MessageActivityProps> = ({ metrics }) => {
  const getIcon = (channel: string) => {
    switch (channel) {
      case 'one-to-one':
        return MessageSquare;
      case 'group':
        return Users;
      case 'cross-department':
        return Building2;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-base font-semibold mb-4">Message Activity</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = getIcon(metric.channel);
          return (
            <div
              key={metric.id}
              className="border rounded-lg p-3 space-y-2 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="font-medium capitalize text-sm">
                    {metric.channel.replace(/-/g, ' ')}
                  </span>
                </div>
                {metric.trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-alert" />
                )}
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Messages</span>
                  <span className="font-semibold text-sm">{metric.messageCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">View Rate</span>
                  <span className="font-semibold text-sm">{metric.viewRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">vs Previous</span>
                  <span className={clsx(
                    'font-semibold text-sm',
                    metric.trend > 0 ? 'text-success' : 'text-alert'
                  )}>
                    {metric.trend > 0 ? '+' : ''}{metric.trend}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};