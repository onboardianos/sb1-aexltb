import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { ContributionMetric } from '../../types/development';
import { Video, LogIn, BookOpen } from 'lucide-react';
import clsx from 'clsx';

interface ContributionProgressProps {
  metrics: ContributionMetric[];
}

export const ContributionProgress: React.FC<ContributionProgressProps> = ({ metrics }) => {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'video completion':
        return Video;
      case 'logins':
        return LogIn;
      case 'test reviews':
        return BookOpen;
      default:
        return Video;
    }
  };

  const data = metrics.map((metric, index) => ({
    name: metric.name,
    value: (metric.value / metric.target) * 100,
    fill: `url(#gradient-${index})`,
  }));

  return (
    <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow">
      <h3 className="text-lg font-semibold mb-6">Contribution Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <defs>
              {metrics.map((_, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00498B" />
                  <stop offset="100%" stopColor="#00AAE9" />
                </linearGradient>
              ))}
            </defs>
            <RadialBar
              minAngle={15}
              background
              clockWise={true}
              dataKey="value"
              cornerRadius={10}
            />
            <Legend />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {metrics.map((metric) => {
          const Icon = getIcon(metric.name);
          return (
            <div key={metric.id} className="text-center">
              <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium text-gray-600">{metric.name}</div>
              <div className="text-lg font-semibold mt-1">
                {metric.value} / {metric.target} {metric.unit}
              </div>
              <div className={clsx(
                'text-sm font-medium mt-1',
                metric.trend > 0 ? 'text-success' : 'text-alert'
              )}>
                {metric.trend > 0 ? '+' : ''}{metric.trend}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};