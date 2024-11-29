import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';

interface DocumentOverlayProps {
  resource: {
    title: string;
    url: string;
  };
}

export const DocumentOverlay: React.FC<DocumentOverlayProps> = ({ resource }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2));
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
        bgcolor: 'grey.100', 
        overflow: 'auto',
        p: 3,
      }}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            mx: 'auto',
            transition: 'transform 0.2s ease-in-out',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <iframe
            src={resource.url}
            title={resource.title}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 'calc(85vh - 8rem)',
              border: 'none',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};