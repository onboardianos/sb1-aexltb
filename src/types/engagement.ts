export interface EngagementMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  trend: number;
  type: 'performance' | 'resources' | 'social';
}

export interface ResourceMetric {
  id: string;
  resourceType: string;
  searchCount: number;
  accessCount: number;
  timeSpent: number;
  trend: number;
}

export interface SocialMetric {
  id: string;
  type: 'likes' | 'comments' | 'posts';
  count: number;
  date: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  progress: number;
  status: 'on-track' | 'off-track' | 'ahead';
}