import React from 'react';
import { Trophy, Target, Zap } from 'lucide-react';
import clsx from 'clsx';

interface Initiative {
  id: string;
  name: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started';
  dueDate: string;
}

interface InitiativeTrackerProps {
  initiatives: Initiative[];
}

export const InitiativeTracker: React.FC<InitiativeTrackerProps> = ({ initiatives }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Trophy className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <Zap className="w-5 h-5 text-primary" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-primary';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold mb-6">Initiative Tracking</h3>
      <div className="space-y-4">
        {initiatives.map((initiative) => (
          <div key={initiative.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(initiative.status)}
                <span className="font-medium">{initiative.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                Due {new Date(initiative.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'absolute top-0 left-0 h-full transition-all duration-500',
                  getProgressColor(initiative.status)
                )}
                style={{ width: `${initiative.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">{initiative.progress}% Complete</span>
              <span className={clsx(
                'text-sm font-medium capitalize',
                {
                  'text-success': initiative.status === 'completed',
                  'text-primary': initiative.status === 'in-progress',
                  'text-gray-500': initiative.status === 'not-started',
                }
              )}>
                {initiative.status.replace('-', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};