import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  MessageSquare,
  Calendar,
  PlayCircle,
  Award,
  Bell,
  Grid,
  Users,
  BookOpen,
  LineChart,
  LogOut
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  {
    path: '/home',
    label: 'Home',
    icon: Home,
  },
  {
    path: '/messenger',
    label: 'Messenger',
    icon: MessageSquare,
  },
  {
    path: '/tasks',
    label: 'Tasks',
    icon: Calendar,
  },
  {
    path: '/my-videos',
    label: 'My Videos',
    icon: PlayCircle,
  },
  {
    path: '/trainings',
    label: 'Trainings',
    icon: Award,
  },
  {
    path: '/notifications',
    label: 'Notifications',
    icon: Bell,
  },
  {
    path: '/widgets',
    label: 'Widgets',
    icon: Grid,
  },
  {
    path: '/internal-directory',
    label: 'Internal Directory',
    icon: Users,
  },
  {
    path: '/resource-center',
    label: 'Resource Center',
    icon: BookOpen,
  },
  {
    path: '/success-tracking',
    label: 'Success Tracking',
    icon: LineChart,
  },
];

export const SideNav: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-[269px] bg-white shadow-lg hidden lg:block">
      <div className="p-6">
        <div className="mb-8">
          <img src="/onboardian-logo.svg" alt="Onboardian" className="h-6" />
        </div>
        <nav className="space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-3 rounded-full text-sm font-medium transition-colors',
                  {
                    'bg-[#E6F0FC] text-[#00498B]': isActive,
                    'text-[#595959] hover:bg-gray-50': !isActive,
                  }
                )
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            className="flex items-center px-4 py-3 rounded-full text-sm font-medium text-[#595959] hover:bg-gray-50 w-full"
            onClick={() => {/* Handle logout */}}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};