import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { CheckCircle, Clock } from 'lucide-react';
import { Task } from '../../types/tasks';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const navigate = useNavigate();

  const getTaskTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'Training':
        return 'bg-blue-50 text-blue-700';
      case 'Policy Review':
        return 'bg-purple-50 text-purple-700';
      case 'Core Values':
        return 'bg-green-50 text-green-700';
      case 'Onboarding':
        return 'bg-orange-50 text-orange-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusDisplay = (task: Task) => {
    if (task.isCompleted) {
      return (
        <div className="flex items-center text-success">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Complete</span>
        </div>
      );
    }

    if (task.status === 'overdue') {
      const daysOverdue = differenceInDays(new Date(), new Date(task.dueDate));
      return (
        <span className="text-sm font-medium text-alert">
          Overdue by {daysOverdue} days
        </span>
      );
    }

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Handle accept
        }}
        className="flex items-center text-primary hover:text-primary-dark transition-colors"
      >
        <Clock className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">Accept</span>
      </button>
    );
  };

  return (
    <div className="divide-y divide-gray-100">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1 text-sm text-gray-600">{index + 1}</div>
            
            <div className="col-span-7">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getTaskTypeColor(task.type)
                  )}>
                    {task.type}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  {task.title}
                </h3>
              </div>
            </div>

            <div className="col-span-2">
              <span className={clsx(
                'text-sm',
                task.status === 'overdue' ? 'text-alert' : 'text-gray-600'
              )}>
                {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </span>
            </div>

            <div className="col-span-2 flex justify-end">
              {getStatusDisplay(task)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};