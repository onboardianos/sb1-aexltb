import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Task } from '../../../types/tasks';

interface TaskActionsProps {
  task: Task;
  onComplete: () => void;
  onAccept: () => void;
}

export const TaskActions: React.FC<TaskActionsProps> = ({ task, onComplete, onAccept }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (task.isCompleted) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          py: 2,
          px: 3,
          zIndex: 10,
        }}
      >
        <Box sx={{ maxWidth: 'lg', mx: 'auto', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {task.status !== 'accepted' && (
            <Button
              onClick={onAccept}
              variant="outlined"
              color="primary"
            >
              Accept Task
            </Button>
          )}
          <Button
            onClick={() => setShowConfirmModal(true)}
            variant="contained"
            color="primary"
            startIcon={<CheckCircle size={20} />}
          >
            Mark as Complete
          </Button>
        </Box>
      </Box>

      <Dialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Task Completion</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
            <AlertTriangle color="error" size={24} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Are you sure you want to mark this task as complete?
              </Typography>
              <Typography color="text.secondary">
                This action cannot be undone. Please ensure you have completed all required steps.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onComplete();
              setShowConfirmModal(false);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};