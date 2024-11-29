import React from 'react';
import { Box, Typography, LinearProgress, Tooltip } from '@mui/material';
import { Battery, BatteryFull, BatteryLow, BatteryMedium } from 'lucide-react';

interface SkillProgressProps {
  skillName: string;
  progress: number;
  target: number;
  status: 'on-pace' | 'off-pace' | 'ahead';
}

export const SkillProgress: React.FC<SkillProgressProps> = ({
  skillName,
  progress,
  target,
  status
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'ahead':
        return <BatteryFull className="w-5 h-5" color="success" />;
      case 'on-pace':
        return <BatteryMedium className="w-5 h-5" color="primary" />;
      case 'off-pace':
        return <BatteryLow className="w-5 h-5" color="error" />;
      default:
        return <Battery className="w-5 h-5" color="action" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'ahead':
        return 'success';
      case 'on-pace':
        return 'primary';
      case 'off-pace':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        p: 2,
        boxShadow: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          {skillName}
        </Typography>
        <Tooltip 
          title={status.replace('-', ' ').charAt(0).toUpperCase() + status.slice(1)}
          arrow
        >
          <Box>{getStatusIcon()}</Box>
        </Tooltip>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        color={getStatusColor()}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'grey.100',
          mb: 1,
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {progress}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Target: {target}%
        </Typography>
      </Box>
    </Box>
  );
};