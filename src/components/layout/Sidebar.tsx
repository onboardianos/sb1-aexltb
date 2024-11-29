import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  styled
} from '@mui/material';
import { LogOut } from 'lucide-react';
import { navItems } from './navItems';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  '&.active .MuiListItemButton-root': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    borderRadius: 24,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '& .MuiListItemIcon-root': {
      color: 'inherit',
    },
  },
}));

const NotificationDot = styled('span')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: '50%',
  transform: 'translateY(-50%)',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.error.main,
}));

export const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 269,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 269,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <img src="/onboardian-logo.svg" alt="Onboardian" style={{ height: 24 }} />
        </Box>

        <List sx={{ mb: 2 }}>
          {navItems.map(({ path, label, icon: Icon, hasNotification }) => (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <StyledNavLink to={path}>
                <ListItemButton
                  sx={{
                    py: 1.5,
                    px: 2,
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.grey[50],
                      borderRadius: 24,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  />
                  {hasNotification && <NotificationDot />}
                </ListItemButton>
              </StyledNavLink>
            </ListItem>
          ))}
        </List>

        <Box sx={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <Button
            fullWidth
            variant="text"
            color="error"
            startIcon={<LogOut />}
            onClick={() => {/* Handle logout */}}
            sx={{
              justifyContent: 'flex-start',
              px: 2,
              py: 1.5,
              borderRadius: 24,
              color: 'error.main',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.grey[50],
              },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};