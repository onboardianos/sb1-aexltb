import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface CustomButtonProps extends ButtonProps {
  icon?: LucideIcon;
}

export const Button: React.FC<CustomButtonProps> = ({ 
  children, 
  icon: Icon, 
  variant = 'contained',
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      {...props}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        ...props.sx,
      }}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </MuiButton>
  );
};