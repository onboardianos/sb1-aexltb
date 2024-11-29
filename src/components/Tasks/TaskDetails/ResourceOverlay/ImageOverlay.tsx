import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageOverlayProps {
  resource: {
    title: string;
    url: string;
  };
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({ resource }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6">{resource.title}</Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handleZoomOut} size="small">
            <ZoomOut />
          </IconButton>
          <IconButton onClick={handleZoomIn} size="small">
            <ZoomIn />
          </IconButton>
          <IconButton 
            component="a"
            href={resource.url}
            download
            size="small"
          >
            <Download />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        flex: 1, 
        bgcolor: 'common.black',
        overflow: 'auto',
        p: 3,
      }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease-in-out',
            transform: `scale(${scale})`,
          }}
        >
          <Box
            component="img"
            src={resource.url}
            alt={resource.title}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};