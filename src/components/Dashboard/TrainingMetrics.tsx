import React from 'react';
import { TrainingMetric } from '../../types/analytics';
import { BookOpen, Clock, Trophy } from 'lucide-react';

interface TrainingMetricsProps {
  metrics: TrainingMetric[];
}

export const TrainingMetrics: React.FC<TrainingMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Training Metrics</h3>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.moduleId} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{metric.moduleName}</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                  <span>{metric.completionRate}%</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                  <span>{metric.averageScore}%</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-500 mr-2" />
                  <span>{metric.timeSpent}h</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}