import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { FolderOpen, ExternalLink, FileText, Video, Link as LinkIcon } from 'lucide-react';
import { ResourceOverlay } from './ResourceOverlay';
import { Task } from '../../../types/tasks';

interface TaskResourcesProps {
  task: Task;
}

export const TaskResources: React.FC<TaskResourcesProps> = ({ task }) => {
  const [selectedResource, setSelectedResource] = useState<Task['resources'][0] | null>(null);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={20} />;
      case 'document':
        return <FileText size={20} />;
      case 'link':
        return <LinkIcon size={20} />;
      default:
        return <ExternalLink size={20} />;
    }
  };

  if (!task.resources?.length) {
    return null;
  }

  return (
    <Box sx={{ position: 'sticky', top: 24 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 2 }}>
          <FolderOpen color="primary" size={20} />
        </Box>
        <Typography variant="h6">Resources to Review</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {task.resources.map((resource) => (
          <Paper
            key={resource.id}
            onClick={() => setSelectedResource(resource)}
            sx={{
              p: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                boxShadow: 2,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                p: 1, 
                borderRadius: 1,
                bgcolor: 'primary.light',
                color: 'primary.main',
              }}>
                {getResourceIcon(resource.type)}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to view resource
                </Typography>
              </Box>
              <ExternalLink size={16} />
            </Box>
          </Paper>
        ))}
      </Box>

      {selectedResource && (
        <ResourceOverlay
          isOpen={true}
          onClose={() => setSelectedResource(null)}
          resource={selectedResource}
        />
      )}
    </Box>
  );
};