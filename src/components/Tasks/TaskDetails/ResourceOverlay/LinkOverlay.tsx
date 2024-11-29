import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ExternalLink } from 'lucide-react';

interface LinkOverlayProps {
  resource: {
    title: string;
    url: string;
  };
  onClose: () => void;
}

export const LinkOverlay: React.FC<LinkOverlayProps> = ({ resource, onClose }) => {
  const handleOpenLink = () => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      p: 3,
    }}>
      <Box sx={{ 
        maxWidth: 400,
        textAlign: 'center',
      }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}>
            <ExternalLink size={32} />
          </Box>
          <Typography variant="h5" gutterBottom>
            {resource.title}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            You're about to visit an external website. Would you like to proceed?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {resource.url}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            onClick={onClose}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            onClick={handleOpenLink}
            variant="contained"
            endIcon={<ExternalLink size={16} />}
          >
            Open Link
          </Button>
        </Box>
      </Box>
    </Box>
  );
};