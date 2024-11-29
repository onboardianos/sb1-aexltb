import React from 'react';
import { Users } from 'lucide-react';
import { DepartmentFilter as DeptFilter } from '../../types/analytics';
import { Select } from '../UI/Select';

interface DepartmentFilterProps {
  selectedDepartment: DeptFilter;
  onDepartmentChange: (department: DeptFilter) => void;
}

export const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  selectedDepartment,
  onDepartmentChange,
}) => {
  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'sales', label: 'Sales' },
    { value: 'service', label: 'Service' },
    { value: 'training', label: 'Training' },
  ];

  return (
    <Select
      value={selectedDepartment}
      onChange={(value) => onDepartmentChange(value as DeptFilter)}
      options={departments}
      icon={Users}
    />
  );
};