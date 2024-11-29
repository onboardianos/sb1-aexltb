import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { X, LayoutDashboard, TrendingUp, MessageSquare, Activity } from 'lucide-react';

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

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: 320,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="/logo.svg" alt="Logo" style={{ height: 24 }} />
        <IconButton onClick={onClose} size="large">
          <X />
        </IconButton>
      </Box>

      <List sx={{ px: 2 }}>
        {navItems.map(({ path, label, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <NavLink
              to={path}
              onClick={onClose}
              style={{ width: '100%', textDecoration: 'none' }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    color: isActive ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};