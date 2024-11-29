import React from 'react';
import { Dialog, DialogContent, Box, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import { VideoOverlay } from './VideoOverlay';
import { DocumentOverlay } from './DocumentOverlay';
import { ImageOverlay } from './ImageOverlay';
import { AudioOverlay } from './AudioOverlay';
import { LinkOverlay } from './LinkOverlay';

interface ResourceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    type: string;
    title: string;
    url: string;
  };
}

export const ResourceOverlay: React.FC<ResourceOverlayProps> = ({
  isOpen,
  onClose,
  resource,
}) => {
  const renderContent = () => {
    switch (resource.type) {
      case 'video':
        return <VideoOverlay resource={resource} />;
      case 'document':
        return <DocumentOverlay resource={resource} />;
      case 'image':
        return <ImageOverlay resource={resource} />;
      case 'audio':
        return <AudioOverlay resource={resource} />;
      case 'link':
        return <LinkOverlay resource={resource} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          height: '85vh',
          m: 2,
          borderRadius: 3,
        },
      }}
    >
      <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          size="large"
          sx={{
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <X />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, height: '100%' }}>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};