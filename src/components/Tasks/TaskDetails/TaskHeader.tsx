import React from 'react';
import { Box, Typography, Chip, Avatar, IconButton } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Task } from '../../../types/tasks';

interface TaskHeaderProps {
  task: Task;
  onBack: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ task, onBack }) => {
  const getStatusChip = () => {
    if (task.isCompleted) {
      return (
        <Chip
          label="Completed"
          color="success"
          sx={{ fontWeight: 500 }}
        />
      );
    }

    if (task.status === 'overdue') {
      const daysOverdue = differenceInDays(new Date(), new Date(task.dueDate));
      return (
        <Chip
          label={`Overdue by ${daysOverdue} days`}
          color="error"
          sx={{ fontWeight: 500 }}
        />
      );
    }

    return (
      <Chip
        label={`Due ${format(new Date(task.dueDate), 'MMM d, yyyy')}`}
        color="primary"
        variant="outlined"
        sx={{ fontWeight: 500 }}
      />
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <IconButton 
        onClick={onBack}
        sx={{ 
          mb: 2,
          color: 'text.secondary',
          '&:hover': {
            color: 'text.primary',
            bgcolor: 'action.hover',
          },
        }}
      >
        <ArrowLeft />
      </IconButton>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Chip
          label={task.type}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
        {getStatusChip()}
      </Box>

      <Typography variant="h4" sx={{ mb: 3 }}>
        {task.title}
      </Typography>

      {task.assignedTo && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={task.assignedTo.avatar}
              alt={task.assignedTo.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 12,
                height: 12,
                bgcolor: 'success.main',
                borderRadius: '50%',
                border: 2,
                borderColor: 'background.paper',
              }}
            />
          </Box>
          <Box>
            <Typography color="text.secondary" variant="body2">
              Assigned to
            </Typography>
            <Typography fontWeight={500}>
              {task.assignedTo.name}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};