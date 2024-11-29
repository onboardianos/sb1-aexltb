import React from 'react';
import { CalendarDays } from 'lucide-react';
import { DateRangeFilter } from '../../types/analytics';
import { Select } from '../UI/Select';

interface DateRangeSelectorProps {
  selectedRange: DateRangeFilter;
  onRangeChange: (range: DateRangeFilter) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  const ranges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'all', label: 'All Time' },
  ];

  return (
    <Select
      value={selectedRange}
      onChange={(value) => onRangeChange(value as DateRangeFilter)}
      options={ranges}
      icon={CalendarDays}
    />
  );
};