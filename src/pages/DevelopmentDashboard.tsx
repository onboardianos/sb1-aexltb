import React, { useState, useEffect } from 'react';
import { ContributionProgress } from '../components/Development/ContributionProgress';
import { RepetitionChart } from '../components/Development/RepetitionChart';
import { ProgressionStats } from '../components/Development/ProgressionStats';
import { SkillProgress } from '../components/Development/SkillProgress';
import { ConsistencyMetrics } from '../components/Development/ConsistencyMetrics';
import { InitiativeTracker } from '../components/Development/InitiativeTracker';
import { DateRangeSelector } from '../components/Filters/DateRangeSelector';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { DateRangeFilter } from '../types/analytics';
import { ContributionMetric, RepetitionMetric, ProgressionMetric } from '../types/development';

// Sample data
const contributionMetrics: ContributionMetric[] = [
  {
    id: '1',
    name: 'Video Completion',
    value: 85,
    target: 100,
    unit: '%',
    trend: 5,
  },
  {
    id: '2',
    name: 'Logins',
    value: 12,
    target: 15,
    unit: 'per week',
    trend: 2,
  },
  {
    id: '3',
    name: 'Test Reviews',
    value: 8,
    target: 10,
    unit: 'reviews',
    trend: -1,
  },
];

const skillMetrics = [
  {
    skillName: 'Sales Process',
    progress: 75,
    target: 90,
    status: 'on-pace' as const,
  },
  {
    skillName: 'Product Knowledge',
    progress: 95,
    target: 85,
    status: 'ahead' as const,
  },
  {
    skillName: 'Customer Service',
    progress: 60,
    target: 80,
    status: 'off-pace' as const,
  },
];

const consistencyData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
  rate: Math.floor(Math.random() * 30) + 70,
  target: 85,
}));

const initiatives = [
  {
    id: '1',
    name: 'Complete Sales Training',
    progress: 100,
    status: 'completed' as const,
    dueDate: '2024-03-15',
  },
  {
    id: '2',
    name: 'Product Certification',
    progress: 65,
    status: 'in-progress' as const,
    dueDate: '2024-03-30',
  },
  {
    id: '3',
    name: 'Customer Service Workshop',
    progress: 0,
    status: 'not-started' as const,
    dueDate: '2024-04-15',
  },
];

const repetitionData: RepetitionMetric[] = Array.from({ length: 7 }, (_, i) => ({
  id: `rep-${i}`,
  type: ['simulation', 'feedback', 'test'][Math.floor(Math.random() * 3)] as 'simulation' | 'feedback' | 'test',
  count: Math.floor(Math.random() * 5) + 1,
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

const progressionData: ProgressionMetric[] = Array.from({ length: 10 }, (_, i) => ({
  id: `prog-${i}`,
  sessionId: `S${String(i + 1).padStart(3, '0')}`,
  status: Math.random() > 0.3 ? 'passed' : 'failed',
  score: Math.floor(Math.random() * 30) + 70,
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

export const DevelopmentDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRangeFilter>('30d');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchData();
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Development Analytics</h1>
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      {isLoading ? (
        <LoadingSpinner className="h-64" />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {skillMetrics.map((metric) => (
              <SkillProgress key={metric.skillName} {...metric} />
            ))}
          </div>

          <ContributionProgress metrics={contributionMetrics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConsistencyMetrics data={consistencyData} />
            <InitiativeTracker initiatives={initiatives} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RepetitionChart data={repetitionData} />
            <ProgressionStats metrics={progressionData} />
          </div>
        </div>
      )}
    </div>
  );
};