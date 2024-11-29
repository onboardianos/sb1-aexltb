import React from 'react';
import {
  List,
  Typography,
  Box,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import { NotificationItem } from './NotificationItem';
import { Check } from 'lucide-react';

interface NotificationListProps {
  notifications: Array<{
    id: string;
    type: 'message' | 'task' | 'training' | 'system';
    title: string;
    description: string;
    createdAt: string;
    isRead: boolean;
  }>;
  onReadAll: () => void;
  onRead: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onReadAll,
  onRead,
}) => {
  const theme = useTheme();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (notifications.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No notifications
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="subtitle2">
          {unreadCount} Unread Notifications
        </Typography>
        {unreadCount > 0 && (
          <Button
            size="small"
            startIcon={<Check size={16} />}
            onClick={onReadAll}
            sx={{ textTransform: 'none' }}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      <List disablePadding>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <NotificationItem
              notification={notification}
              onRead={onRead}
            />
            {index < notifications.length - 1 && (
              <Divider component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};