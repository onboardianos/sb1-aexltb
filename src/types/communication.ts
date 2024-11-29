import { DateRangeFilter } from './analytics';

export interface MessageMetric {
  id: string;
  channel: 'one-to-one' | 'group' | 'cross-department';
  messageCount: number;
  viewRate: number;
  trend: number;
  previousCount: number;
}

export interface MessageTrend {
  date: string;
  'one-to-one': number;
  'group': number;
  'cross-department': number;
}

export interface ChannelEngagement {
  channel: string;
  activeUsers: number;
  averageResponseTime: number;
  messagesSent: number;
}