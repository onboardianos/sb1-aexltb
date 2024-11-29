import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { format, isSameDay, isAfter, isBefore, startOfDay } from 'date-fns';
import { Calendar } from '../components/Tasks/Calendar';
import { TaskList } from '../components/Tasks/TaskList';
import type { TaskStatus } from '../types/tasks';
import { SAMPLE_TASKS } from '../data/sampleTasks';

export const Tasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TaskStatus>('today');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const today = startOfDay(new Date());

  const filteredTasks = useMemo(() => {
    return SAMPLE_TASKS.filter(task => {
      const taskDate = startOfDay(new Date(task.dueDate));

      switch (activeTab) {
        case 'today':
          // Show incomplete tasks that are either overdue or due today
          if (task.isCompleted) return false;
          return isBefore(taskDate, today) || isSameDay(taskDate, today);
        case 'completed':
          // Show completed tasks regardless of due date
          return task.isCompleted;
        case 'upcoming':
          // Show incomplete tasks with future due dates
          if (task.isCompleted) return false;
          return isAfter(taskDate, today);
        case 'selected-date':
          // Show all tasks for the selected date
          return isSameDay(taskDate, selectedDate);
        default:
          return false;
      }
    }).sort((a, b) => {
      if (activeTab === 'today') {
        // Sort overdue tasks first
        const aDate = new Date(a.dueDate);
        const bDate = new Date(b.dueDate);
        if (isBefore(aDate, today) && !isBefore(bDate, today)) return -1;
        if (!isBefore(aDate, today) && isBefore(bDate, today)) return 1;
      }
      // Default sort by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [activeTab, selectedDate, today]);

  const taskCounts = useMemo(() => {
    return {
      today: SAMPLE_TASKS.filter(task => 
        !task.isCompleted && (
          isBefore(new Date(task.dueDate), today) || 
          isSameDay(new Date(task.dueDate), today)
        )
      ).length,
      completed: SAMPLE_TASKS.filter(task => task.isCompleted).length,
      upcoming: SAMPLE_TASKS.filter(task => 
        !task.isCompleted && isAfter(new Date(task.dueDate), today)
      ).length,
      selectedDate: SAMPLE_TASKS.filter(task =>
        isSameDay(new Date(task.dueDate), selectedDate)
      ).length,
    };
  }, [today, selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setActiveTab('selected-date');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <span>Home</span>
        <span>/</span>
        <span className="text-gray-900">Tasks</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <div className="text-sm text-gray-600">
          {format(selectedDate, 'MMMM d, yyyy')}
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('today')}
          className={clsx(
            'px-6 py-2 rounded-full text-sm font-medium transition-colors',
            activeTab === 'today'
              ? 'bg-success text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          )}
        >
          Today's tasks ({taskCounts.today})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={clsx(
            'px-6 py-2 rounded-full text-sm font-medium transition-colors',
            activeTab === 'completed'
              ? 'bg-success text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          )}
        >
          Completed ({taskCounts.completed})
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={clsx(
            'px-6 py-2 rounded-full text-sm font-medium transition-colors',
            activeTab === 'upcoming'
              ? 'bg-success text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          )}
        >
          Upcoming ({taskCounts.upcoming})
        </button>
        {activeTab === 'selected-date' && (
          <button
            className="bg-success text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            {format(selectedDate, 'MMM d')} ({taskCounts.selectedDate})
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {activeTab === 'today' && filteredTasks.length > 0 && (
            <>
              {/* Overdue Tasks Section */}
              {filteredTasks.some(task => isBefore(new Date(task.dueDate), today)) && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Overdue Tasks</h3>
                  <div className="bg-white rounded-lg shadow-sm">
                    <TaskList 
                      tasks={filteredTasks.filter(task => 
                        isBefore(new Date(task.dueDate), today)
                      )} 
                    />
                  </div>
                </div>
              )}

              {/* Today's Tasks Section */}
              {filteredTasks.some(task => isSameDay(new Date(task.dueDate), today)) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Tasks Due Today</h3>
                  <div className="bg-white rounded-lg shadow-sm">
                    <TaskList 
                      tasks={filteredTasks.filter(task => 
                        isSameDay(new Date(task.dueDate), today)
                      )} 
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab !== 'today' && (
            <div className="bg-white rounded-lg shadow-sm">
              <TaskList tasks={filteredTasks} />
            </div>
          )}

          {filteredTasks.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500">No tasks found</p>
            </div>
          )}
        </div>

        <div className="col-span-1">
          <Calendar 
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};