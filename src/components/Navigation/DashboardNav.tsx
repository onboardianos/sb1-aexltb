import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { LayoutDashboard, TrendingUp, MessageSquare, Activity } from 'lucide-react';

const navItems = [
  {
    path: '/development',
    label: 'Development',
    icon: LayoutDashboard,
  },
  {
    path: '/performance',
    label: 'Performance',
    icon: TrendingUp,
  },
  {
    path: '/communication',
    label: 'Communication',
    icon: MessageSquare,
  },
  {
    path: '/engagement',
    label: 'Engagement',
    icon: Activity,
  },
];

export const DashboardNav: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          style={{ textDecoration: 'none' }}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? 'contained' : 'text'}
              startIcon={<Icon size={20} />}
              sx={{
                color: isActive ? 'white' : 'text.secondary',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              {label}
            </Button>
          )}
        </NavLink>
      ))}
    </Box>
  );
};