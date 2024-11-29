import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme
} from '@mui/material';
import { Bell, MessageSquare, Calendar, Award } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: {
    id: string;
    type: 'message' | 'task' | 'training' | 'system';
    title: string;
    description: string;
    createdAt: string;
    isRead: boolean;
  };
  onRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
}) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare size={20} />;
      case 'task':
        return <Calendar size={20} />;
      case 'training':
        return <Award size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const getIconColor = () => {
    switch (notification.type) {
      case 'message':
        return theme.palette.primary.main;
      case 'task':
        return theme.palette.success.main;
      case 'training':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  return (
    <ListItem 
      disablePadding 
      sx={{ 
        backgroundColor: notification.isRead ? 'transparent' : 'action.hover',
      }}
    >
      <ListItemButton
        onClick={() => onRead(notification.id)}
        sx={{
          py: 2,
          px: 3,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <ListItemIcon 
          sx={{ 
            minWidth: 40,
            color: getIconColor(),
          }}
        >
          {getIcon()}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="subtitle2" gutterBottom>
              {notification.title}
            </Typography>
          }
          secondary={
            <Box component="span" sx={{ display: 'block' }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 0.5 }}
              >
                {notification.description}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.disabled"
              >
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};