import { format, subDays } from 'date-fns';
import { DateRangeFilter } from '../types/analytics';

export const getDateRangeStart = (range: DateRangeFilter): Date => {
  const now = new Date();
  switch (range) {
    case '7d':
      return subDays(now, 7);
    case '30d':
      return subDays(now, 30);
    case '90d':
      return subDays(now, 90);
    default:
      return new Date(0); // Beginning of time for 'all'
  }
};