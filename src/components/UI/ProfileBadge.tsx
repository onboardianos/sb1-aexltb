import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface ProfileBadgeProps {
  name: string;
  imageUrl: string;
  size?: 'small' | 'medium' | 'large';
}

export const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  name,
  imageUrl,
  size = 'medium',
}) => {
  const avatarSizes = {
    small: 32,
    medium: 40,
    large: 48,
  };

  const textSizes = {
    small: 'body2',
    medium: 'body1',
    large: 'h6',
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar
        src={imageUrl}
        alt={name}
        sx={{
          width: avatarSizes[size],
          height: avatarSizes[size],
          border: 2,
          borderColor: 'background.paper',
        }}
      />
      <Typography variant={textSizes[size]} fontWeight="medium" color="text.primary">
        {name}
      </Typography>
    </Box>
  );
};