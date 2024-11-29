export type TaskStatus = 'today' | 'completed' | 'upcoming' | 'selected-date';

export type TaskType = 'Training' | 'Policy Review' | 'Core Values' | 'Onboarding';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
  };
  businessGroupId: string;
  siteId: string;
  resources?: {
    id: string;
    type: 'video' | 'document' | 'link';
    title: string;
    url: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  status: TaskStatus;
  type?: TaskType;
  siteId?: string;
  businessGroupId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}