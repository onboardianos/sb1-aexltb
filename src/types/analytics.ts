export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  target: number;
}

export interface TrainingMetric {
  moduleId: string;
  moduleName: string;
  completionRate: number;
  averageScore: number;
  timeSpent: number;
  department: string;
}

export interface DealershipKPI {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  department: string;
}

export interface CorrelationData {
  metric1: string;
  metric2: string;
  correlation: number;
  strength: 'strong' | 'moderate' | 'weak';
  direction: 'positive' | 'negative';
}

export type DateRangeFilter = '7d' | '30d' | '90d' | 'all';
export type DepartmentFilter = 'all' | 'sales' | 'service' | 'training';