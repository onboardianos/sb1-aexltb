import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

interface ProgressProps {
  value: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error';
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  label, 
  color = 'primary' 
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value}%
          </Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        color={color}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      />
    </Box>
  );
};