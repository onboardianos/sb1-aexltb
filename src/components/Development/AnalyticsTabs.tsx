import React from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
}

interface AnalyticsTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-1 flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={clsx(
            'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            {
              'bg-blue-gradient text-white shadow-sm': activeTab === tab.id,
              'text-gray-600 hover:text-primary hover:bg-gray-50': activeTab !== tab.id,
            }
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};