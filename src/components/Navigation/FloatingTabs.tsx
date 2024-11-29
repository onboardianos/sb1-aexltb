import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Tooltip, Zoom } from '@mui/material';
import { LayoutDashboard, TrendingUp, MessageSquare, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  {
    path: '/development',
    label: 'Development Analytics',
    icon: LayoutDashboard,
    gradient: 'linear-gradient(to right, #00498B, #00AAE9)',
  },
  {
    path: '/performance',
    label: 'Performance Analytics',
    icon: TrendingUp,
    gradient: 'linear-gradient(to right, #0094D4, #00B5FF)',
  },
  {
    path: '/communication',
    label: 'Communication Analytics',
    icon: MessageSquare,
    gradient: 'linear-gradient(to right, #10B981, #34D399)',
  },
  {
    path: '/engagement',
    label: 'Engagement Analytics',
    icon: Activity,
    gradient: 'linear-gradient(to right, #C80407, #FF1A1D)',
  },
];

export const FloatingTabs: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        zIndex: 1000,
      }}
    >
      {tabs.map(({ path, label, icon: Icon, gradient }) => (
        <Tooltip
          key={path}
          title={label}
          placement="left"
          TransitionComponent={Zoom}
          arrow
        >
          <NavLink
            to={path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: isActive ? gradient : '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: isActive ? '#fff' : '#4B5563',
              transition: 'all 0.2s ease-in-out',
            })}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={24} />
            </motion.div>
          </NavLink>
        </Tooltip>
      ))}
    </Box>
  );
};