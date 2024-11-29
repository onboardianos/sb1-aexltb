import { DateRangeFilter } from './analytics';

export interface ContributionMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
}

export interface RepetitionMetric {
  id: string;
  type: 'simulation' | 'feedback' | 'test';
  count: number;
  date: string;
}

export interface ProgressionMetric {
  id: string;
  sessionId: string;
  status: 'passed' | 'failed';
  score: number;
  date: string;
}

export interface DevelopmentStats {
  videoCompletion: number;
  loginCount: number;
  testReviews: number;
  simulationTakes: number;
  averageScore: number;
  passRate: number;
}