import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

interface CustomTooltipProps extends Omit<TooltipProps, 'children'> {
  children: React.ReactElement;
}

export const Tooltip: React.FC<CustomTooltipProps> = ({ children, ...props }) => {
  return (
    <MuiTooltip
      arrow
      enterDelay={200}
      leaveDelay={0}
      {...props}
      sx={{
        '& .MuiTooltip-tooltip': {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          fontSize: '0.875rem',
          padding: '8px 12px',
          borderRadius: '6px',
        },
        '& .MuiTooltip-arrow': {
          color: 'rgba(0, 0, 0, 0.85)',
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiTooltip>
  );
};