import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactPlayer from 'react-player';

interface VideoOverlayProps {
  resource: {
    title: string;
    url: string;
  };
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({ resource }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">{resource.title}</Typography>
      </Box>

      <Box sx={{ flex: 1, bgcolor: 'common.black', position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <ReactPlayer
            url={resource.url}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};