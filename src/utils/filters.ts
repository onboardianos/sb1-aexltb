import { DealershipKPI, TrainingMetric, DepartmentFilter } from '../types/analytics';

export const filterByDepartment = <T extends { department: string }>(
  items: T[],
  department: DepartmentFilter
): T[] => {
  return department === 'all' ? items : items.filter((item) => item.department === department);
};