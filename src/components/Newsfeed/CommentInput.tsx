import React, { useState } from 'react';
import { Box, TextField, Button, Avatar } from '@mui/material';

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        mt: 2,
      }}
    >
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
        alt="Your avatar"
        sx={{ width: 32, height: 32 }}
      />
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          multiline
          maxRows={5}
          fullWidth
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <Button
          type="submit"
          disabled={!content.trim()}
          variant="contained"
          size="small"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            minWidth: 0,
            px: 2,
          }}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};