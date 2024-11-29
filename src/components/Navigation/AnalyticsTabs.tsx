import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, MessageSquare, Activity } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';

const tabs = [
  {
    path: '/development',
    label: 'Development Analytics',
    icon: LayoutDashboard,
    color: 'from-primary-light to-primary',
  },
  {
    path: '/performance',
    label: 'Performance Analytics',
    icon: TrendingUp,
    color: 'from-secondary-light to-secondary',
  },
  {
    path: '/communication',
    label: 'Communication Analytics',
    icon: MessageSquare,
    color: 'from-success-light to-success',
  },
  {
    path: '/engagement',
    label: 'Engagement Analytics',
    icon: Activity,
    color: 'from-alert-light to-alert',
  },
];

export const AnalyticsTabs: React.FC = () => {
  return (
    <Tooltip.Provider>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-4">
        {tabs.map(({ path, label, icon: Icon, color }) => (
          <Tooltip.Root key={path}>
            <Tooltip.Trigger asChild>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  clsx(
                    'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
                    'hover:scale-110 hover:shadow-lg',
                    {
                      [`bg-gradient-to-br ${color} text-white shadow-md`]: isActive,
                      'bg-white text-gray-600 hover:text-primary': !isActive,
                    }
                  )
                }
              >
                <Icon className="w-6 h-6" />
              </NavLink>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="left"
                className="bg-gray-900 text-white px-3 py-1.5 rounded text-sm"
                sideOffset={5}
              >
                {label}
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
};