import React, { useState, useEffect } from 'react';
import { MessageActivity } from '../components/Communication/MessageActivity';
import { MessageTrends } from '../components/Communication/MessageTrends';
import { ChannelEngagement } from '../components/Communication/ChannelEngagement';
import { DateRangeSelector } from '../components/Filters/DateRangeSelector';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { DateRangeFilter } from '../types/analytics';
import { MessageMetric, MessageTrend, ChannelEngagement as ChannelEngagementType } from '../types/communication';
import { format, subDays } from 'date-fns';

// Sample data - In a real application, this would come from an API
const messageMetrics: MessageMetric[] = [
  {
    id: '1',
    channel: 'one-to-one',
    messageCount: 245,
    viewRate: 92,
    trend: 5,
    previousCount: 233,
  },
  {
    id: '2',
    channel: 'group',
    messageCount: 178,
    viewRate: 87,
    trend: -2,
    previousCount: 182,
  },
  {
    id: '3',
    channel: 'cross-department',
    messageCount: 134,
    viewRate: 85,
    trend: 8,
    previousCount: 124,
  },
];

const generateTrendData = (): MessageTrend[] => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: format(subDays(new Date(), i), 'MMM dd'),
    'one-to-one': Math.floor(Math.random() * 50) + 20,
    'group': Math.floor(Math.random() * 40) + 15,
    'cross-department': Math.floor(Math.random() * 30) + 10,
  })).reverse();
};

const channelEngagementData: ChannelEngagementType[] = [
  {
    channel: '1:1 Chats',
    activeUsers: 45,
    averageResponseTime: 5,
    messagesSent: 245,
  },
  {
    channel: 'Group Chats',
    activeUsers: 32,
    averageResponseTime: 8,
    messagesSent: 178,
  },
  {
    channel: 'Cross-Department',
    activeUsers: 28,
    averageResponseTime: 12,
    messagesSent: 134,
  },
];

export const CommunicationDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRangeFilter>('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [trendData, setTrendData] = useState<MessageTrend[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setTrendData(generateTrendData());
      setIsLoading(false);
    };

    fetchData();
  }, [dateRange]);

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Communication Analytics</h1>
            <div className="h-6 w-px bg-gray-300" />
            <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner className="h-64" />
        ) : (
          <div className="space-y-4">
            <MessageActivity metrics={messageMetrics} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MessageTrends data={trendData} />
              <ChannelEngagement data={channelEngagementData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}