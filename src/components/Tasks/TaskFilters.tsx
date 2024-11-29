import React from 'react';
import { Calendar, List } from 'lucide-react';
import type { TaskFilters as TaskFiltersType } from '../../types/tasks';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
  currentView: 'list' | 'calendar';
  onViewChange: (view: 'list' | 'calendar') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-white rounded-lg border p-1">
        <button
          onClick={() => onViewChange('list')}
          className={`p-2 rounded ${
            currentView === 'list'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange('calendar')}
          className={`p-2 rounded ${
            currentView === 'calendar'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Calendar className="w-5 h-5" />
        </button>
      </div>

      <select
        value={filters.siteId}
        onChange={(e) => onFiltersChange({ ...filters, siteId: e.target.value })}
        className="form-select rounded-lg border-gray-300"
      >
        <option value="">All Sites</option>
        <option value="site1">Site 1</option>
        <option value="site2">Site 2</option>
      </select>
    </div>
  );
};