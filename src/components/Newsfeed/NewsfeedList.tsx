import React, { useState } from 'react';
import { Post as PostType, CreatePostInput } from '../../types/newsfeed';
import { Post } from './Post';
import { CreatePostButton } from './CreatePostButton';
import { PostModal } from './PostModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Stack, Button } from '@mui/material';

interface NewsfeedListProps {
  posts: PostType[];
  onCreatePost: (post: CreatePostInput) => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => Promise<void>;
  onShare: (postId: string) => void;
  isSubmitting?: boolean;
  isSubmittingComment?: boolean;
  hasNewPosts?: boolean;
  onLoadNewPosts?: () => void;
}

export const NewsfeedList: React.FC<NewsfeedListProps> = ({
  posts,
  onCreatePost,
  onLike,
  onComment,
  onShare,
  isSubmitting,
  isSubmittingComment,
  hasNewPosts,
  onLoadNewPosts,
}) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <Stack spacing={2}>
        <CreatePostButton onClick={() => setIsPostModalOpen(true)} />

        <AnimatePresence>
          {hasNewPosts && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={onLoadNewPosts}
                sx={{ borderRadius: 2 }}
              >
                New posts available
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Stack spacing={2}>
          <AnimatePresence initial={false}>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Post
                  post={post}
                  onLike={onLike}
                  onComment={onComment}
                  onShare={onShare}
                  isSubmittingComment={isSubmittingComment}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </Stack>

      <PostModal
        open={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={onCreatePost}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};