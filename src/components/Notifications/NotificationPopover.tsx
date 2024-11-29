import React from 'react';
import {
  Popover,
  Badge,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import { Bell } from 'lucide-react';
import { NotificationList } from './NotificationList';

interface NotificationPopoverProps {
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

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  notifications,
  onReadAll,
  onRead,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          color: open ? 'primary.main' : 'text.secondary',
          '&:hover': {
            backgroundColor: 'grey.50',
          },
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              right: -3,
              top: 3,
            },
          }}
        >
          <Bell size={20} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
            mt: 1.5,
            boxShadow: theme.shadows[4],
            borderRadius: 2,
          },
        }}
      >
        <NotificationList
          notifications={notifications}
          onReadAll={() => {
            onReadAll();
            handleClose();
          }}
          onRead={(id) => {
            onRead(id);
            handleClose();
          }}
        />
      </Popover>
    </Box>
  );
};