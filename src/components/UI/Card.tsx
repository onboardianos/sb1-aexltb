import React from 'react';
import { Card as MuiCard, CardProps } from '@mui/material';

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CustomCardProps> = ({ children, ...props }) => {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 3,
        boxShadow: (theme) => `0 1px 3px ${theme.palette.grey[200]}, 0 1px 2px ${theme.palette.grey[300]}`,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: (theme) => `0 4px 6px ${theme.palette.grey[200]}, 0 2px 4px ${theme.palette.grey[300]}`,
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiCard>
  );
};