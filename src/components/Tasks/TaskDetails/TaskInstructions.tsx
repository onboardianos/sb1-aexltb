import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ListChecks } from 'lucide-react';

interface TaskInstructionsProps {
  instructions: string[];
}

export const TaskInstructions: React.FC<TaskInstructionsProps> = ({ instructions }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 2 }}>
          <ListChecks color="primary" size={20} />
        </Box>
        <Typography variant="h6">Instructions</Typography>
      </Box>

      <Paper sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 3 }}>
        <Box component="ol" sx={{ 
          listStyle: 'none', 
          m: 0, 
          p: 0,
          '& > li': { 
            mb: 3,
            '&:last-child': {
              mb: 0,
            },
          },
        }}>
          {instructions.map((instruction, index) => (
            <Box
              component="li"
              key={index}
              sx={{ position: 'relative', pl: 5 }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 24,
                  height: 24,
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {index + 1}
              </Box>
              <Typography color="text.secondary">
                {instruction}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};