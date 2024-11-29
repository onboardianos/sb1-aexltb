import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import type { Task } from '../../types/tasks';

interface TaskCalendarProps {
  tasks: Task[];
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dayTasks = tasks.filter(
            (task) => format(new Date(task.dueDate), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          return (
            <div
              key={day.toISOString()}
              className={`bg-white p-2 min-h-[100px] ${
                format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                  ? 'bg-blue-50'
                  : ''
              }`}
            >
              <div className="font-medium text-sm text-gray-900">
                {format(day, 'd')}
              </div>
              
              <div className="mt-1 space-y-1">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};