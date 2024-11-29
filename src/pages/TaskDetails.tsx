import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { TaskHeader } from '../components/Tasks/TaskDetails/TaskHeader';
import { TaskInstructions } from '../components/Tasks/TaskDetails/TaskInstructions';
import { TaskResources } from '../components/Tasks/TaskDetails/TaskResources';
import { TaskActions } from '../components/Tasks/TaskDetails/TaskActions';
import { SAMPLE_TASKS } from '../data/sampleTasks';

export const TaskDetails: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const task = SAMPLE_TASKS.find(t => t.id === taskId);

  useEffect(() => {
    if (task) {
      document.title = `${task.title} - Tasks`;
    }
  }, [task]);

  if (!task) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}>
        <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom>
            Task Not Found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            The task you're looking for doesn't exist or has been removed.
          </Typography>
        </Box>
      </Box>
    );
  }

  const handleComplete = () => {
    // In a real app, this would make an API call
    console.log('Task completed:', task.id);
    navigate('/tasks');
  };

  const handleAccept = () => {
    // In a real app, this would make an API call
    console.log('Task accepted:', task.id);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto', p: 3 }}>
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 4, pb: 12 }}>
            <TaskHeader 
              task={task}
              onBack={() => navigate('/tasks')}
            />

            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
              gap: 4,
            }}>
              <Box>
                <TaskInstructions 
                  instructions={task.description.split('\n')}
                />
              </Box>

              <Box>
                <TaskResources task={task} />
              </Box>
            </Box>
          </Box>

          <TaskActions
            task={task}
            onComplete={handleComplete}
            onAccept={handleAccept}
          />
        </Paper>
      </Box>
    </Box>
  );
};