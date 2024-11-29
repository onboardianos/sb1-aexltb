import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioOverlayProps {
  resource: {
    title: string;
    url: string;
  };
}

export const AudioOverlay: React.FC<AudioOverlayProps> = ({ resource }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">{resource.title}</Typography>
      </Box>

      <Box sx={{ 
        flex: 1, 
        bgcolor: 'grey.50', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 3,
      }}>
        <Box sx={{ 
          width: '100%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          borderRadius: 3,
          p: 3,
          boxShadow: 1,
        }}>
          <audio
            ref={audioRef}
            src={resource.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                height: 8,
                bgcolor: 'grey.100',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${progress}%`,
                  height: '100%',
                  bgcolor: 'primary.main',
                  transition: 'width 0.1s linear',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton
              onClick={togglePlay}
              sx={{
                p: 2,
                bgcolor: 'primary.main',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {isPlaying ? <Pause /> : <Play />}
            </IconButton>

            <IconButton onClick={toggleMute}>
              {isMuted ? <VolumeX /> : <Volume2 />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};