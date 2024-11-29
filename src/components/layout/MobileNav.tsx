import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled
} from '@mui/material';
import { X } from 'lucide-react';
import { navItems } from './navItems';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
  '&.active .MuiListItemButton-root': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    borderRadius: 12,
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

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        display: { lg: 'none' },
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: 320,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4,
        }}>
          <img src="/onboardian-logo.svg" alt="Onboardian" style={{ height: 24 }} />
          <IconButton
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'grey.50',
              },
            }}
          >
            <X />
          </IconButton>
        </Box>

        <List>
          {navItems.map(({ path, label, icon: Icon, hasNotification }) => (
            <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
              <StyledNavLink to={path} onClick={onClose}>
                <ListItemButton
                  sx={{
                    py: 1.5,
                    px: 2,
                    position: 'relative',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.grey[50],
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
      </Box>
    </Drawer>
  );
};