import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isSameDay, isSameMonth, parseISO } from 'date-fns';
import clsx from 'clsx';
import { SAMPLE_TASKS } from '../../data/sampleTasks';
import type { Task } from '../../types/tasks';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const currentDate = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const getTasksForDate = (date: Date) => {
    return SAMPLE_TASKS.filter(task => isSameDay(parseISO(task.dueDate), date));
  };

  const getTaskIndicators = (date: Date) => {
    const tasks = getTasksForDate(date);
    const indicators = {
      overdue: tasks.some(task => task.status === 'overdue'),
      completed: tasks.some(task => task.isCompleted),
      upcoming: tasks.some(task => !task.isCompleted && task.status !== 'overdue'),
    };
    return indicators;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-1">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => onDateChange(new Date(currentYear, currentMonth - 1))}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => onDateChange(new Date(currentYear, currentMonth + 1))}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-sm font-medium text-gray-600 text-center py-2">
            {day}
          </div>
        ))}

        {previousMonthDays.map(day => (
          <div key={`prev-${day}`} className="h-12" />
        ))}

        {days.map(day => {
          const date = new Date(currentYear, currentMonth, day);
          const isToday = isSameDay(date, currentDate);
          const isSelected = isSameDay(date, selectedDate);
          const isCurrentMonth = isSameMonth(date, selectedDate);
          const indicators = getTaskIndicators(date);

          return (
            <div
              key={day}
              className="h-12 relative"
            >
              <button
                onClick={() => onDateChange(date)}
                className={clsx(
                  'h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors absolute top-0 left-1/2 -translate-x-1/2',
                  {
                    'font-medium': isToday || isSelected,
                    'bg-success text-white': isSelected,
                    'text-gray-900': isToday && !isSelected && isCurrentMonth,
                    'text-gray-400': !isCurrentMonth,
                    'text-gray-600 hover:bg-gray-50': !isToday && !isSelected && isCurrentMonth,
                  }
                )}
              >
                {day}
                {isToday && !isSelected && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-success" />
                )}
              </button>
              
              {/* Task indicators */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
                {indicators.overdue && (
                  <div className="w-1.5 h-1.5 rounded-full bg-alert" />
                )}
                {indicators.completed && (
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                )}
                {indicators.upcoming && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-2">Task Types:</div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-alert" />
            <span className="text-xs text-gray-600">Overdue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs text-gray-600">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-gray-600">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
};