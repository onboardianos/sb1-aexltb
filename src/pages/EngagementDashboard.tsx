import React, { useState, useEffect } from 'react';
import { EngagementOverview } from '../components/Engagement/EngagementOverview';
import { ResourceMetrics } from '../components/Engagement/ResourceMetrics';
import { SocialEngagement } from '../components/Engagement/SocialEngagement';
import { DateRangeSelector } from '../components/Filters/DateRangeSelector';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { DateRangeFilter } from '../types/analytics';
import { EngagementMetric, ResourceMetric, SocialMetric } from '../types/engagement';
import { format, subDays } from 'date-fns';

// Updated sample data with refined metric names
const engagementMetrics: EngagementMetric[] = [
  {
    id: '1',
    name: 'Performance Review',
    value: 85,
    previousValue: 78,
    trend: 9,
    type: 'performance',
  },
  {
    id: '2',
    name: 'Resource Utilization',
    value: 234,
    previousValue: 210,
    trend: 11,
    type: 'resources',
  },
  {
    id: '3',
    name: 'Platform Activity',
    value: 156,
    previousValue: 162,
    trend: -4,
    type: 'social',
  },
];

const resourceData: ResourceMetric[] = [
  {
    id: '1',
    resourceType: 'Training Materials',
    searchCount: 45,
    accessCount: 38,
    timeSpent: 12,
    trend: 5,
  },
  {
    id: '2',
    resourceType: 'Documentation',
    searchCount: 32,
    accessCount: 28,
    timeSpent: 8,
    trend: 3,
  },
  {
    id: '3',
    resourceType: 'Learning Modules',
    searchCount: 28,
    accessCount: 22,
    timeSpent: 6,
    trend: 7,
  },
];

const generateSocialData = (): SocialMetric[] => {
  const types: ('likes' | 'comments' | 'posts')[] = ['likes', 'comments', 'posts'];
  return Array.from({ length: 21 }, (_, i) => {
    const date = format(subDays(new Date(), 20 - i), 'MMM dd');
    return types.map(type => ({
      id: `${type}-${i}`,
      type,
      count: Math.floor(Math.random() * 50) + (type === 'likes' ? 30 : type === 'comments' ? 20 : 10),
      date,
    }));
  }).flat();
};

export const EngagementDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRangeFilter>('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [socialData, setSocialData] = useState<SocialMetric[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSocialData(generateSocialData());
      setIsLoading(false);
    };

    fetchData();
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Engagement Analytics</h1>
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      {isLoading ? (
        <LoadingSpinner className="h-64" />
      ) : (
        <div className="space-y-6">
          <EngagementOverview metrics={engagementMetrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceMetrics data={resourceData} />
            <SocialEngagement data={socialData} />
          </div>
        </div>
      )}
    </div>
  );
};