import { Task } from '../types/tasks';
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const SAMPLE_TASKS: Task[] = [
  {
    id: 'resource-testing',
    type: 'Training',
    title: 'Resource Testing Task',
    description: `1. Watch the Introduction Video
2. Review the Company Handbook
3. Listen to the CEO Message
4. Visit the Company Website`,
    dueDate: addDays(today, 1).toISOString(),
    status: 'today',
    isCompleted: false,
    priority: 'high',
    assignedTo: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32',
    },
    businessGroupId: 'bg1',
    siteId: 'site1',
    resources: [
      {
        id: 'video-1',
        type: 'video',
        title: 'Introduction Video',
        url: 'https://www.onboardian.com/intro.mp4',
      },
      {
        id: 'doc-1',
        type: 'document',
        title: 'Company Handbook',
        url: 'https://www.onboardian.com/handbook.pdf',
      },
      {
        id: 'audio-1',
        type: 'audio',
        title: 'CEO Message',
        url: 'https://www.onboardian.com/message.mp3',
      },
      {
        id: 'link-1',
        type: 'link',
        title: 'Company Website',
        url: 'https://www.onboardian.com',
      },
    ],
    comments: [],
    createdAt: subDays(today, 1).toISOString(),
    updatedAt: subDays(today, 1).toISOString(),
  },
  // Add more sample tasks as needed...
];