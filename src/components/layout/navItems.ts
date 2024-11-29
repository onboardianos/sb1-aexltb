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

export const navItems = [
  {
    path: '/home',
    label: 'Home',
    icon: Home,
  },
  {
    path: '/messenger',
    label: 'Messenger',
    icon: MessageSquare,
    hasNotification: true,
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
    hasNotification: true,
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