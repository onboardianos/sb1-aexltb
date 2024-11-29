import React from 'react';
import { Comment } from './Comment';

interface CommentListProps {
  comments: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    isLiked: boolean;
  }>;
  onLike: (id: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, onLike }) => {
  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onLike={onLike} />
      ))}
    </div>
  );
};