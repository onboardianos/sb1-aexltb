import React from 'react';
import { ProgressionMetric } from '../../types/development';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface ProgressionStatsProps {
  metrics: ProgressionMetric[];
}

export const ProgressionStats: React.FC<ProgressionStatsProps> = ({ metrics }) => {
  const totalSessions = metrics.length;
  const passedSessions = metrics.filter(m => m.status === 'passed').length;
  const averageScore = metrics.reduce((acc, curr) => acc + curr.score, 0) / totalSessions;
  const passRate = (passedSessions / totalSessions) * 100;

  const stats = [
    {
      label: 'Average Score',
      value: `${averageScore.toFixed(1)}%`,
      icon: Trophy,
      color: 'text-yellow-500',
    },
    {
      label: 'Pass Rate',
      value: `${passRate.toFixed(1)}%`,
      icon: Target,
      color: 'text-green-500',
    },
    {
      label: 'Sessions Completed',
      value: totalSessions,
      icon: TrendingUp,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Progression Overview</h3>
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center">
              <Icon className={clsx('w-8 h-8 mx-auto mb-2', stat.color)} />
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6">
        <div className="space-y-4">
          {metrics.slice(-5).map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium">Session {session.sessionId}</div>
                <div className="text-sm text-gray-500">
                  {new Date(session.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold">{session.score}%</div>
                <span
                  className={clsx(
                    'px-2 py-1 rounded text-sm font-medium',
                    session.status === 'passed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  )}
                >
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};