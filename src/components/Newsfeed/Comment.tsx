import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp } from 'lucide-react';

interface CommentProps {
  comment: {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
    likes: number;
    isLiked: boolean;
  };
  onLike: (id: string) => void;
}

export const Comment: React.FC<CommentProps> = ({ comment, onLike }) => {
  return (
    <div className="flex space-x-3 group animate-fade-in">
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg px-4 py-2">
          <div className="font-medium">{comment.author.name}</div>
          <p className="text-gray-600">{comment.content}</p>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-sm">
          <button
            onClick={() => onLike(comment.id)}
            className={`font-medium transition-colors ${
              comment.isLiked ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center space-x-1">
              <ThumbsUp className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </span>
          </button>
          <span className="text-gray-500">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          {comment.likes > 0 && (
            <div className="flex items-center text-gray-500">
              <ThumbsUp className="w-4 h-4 text-primary fill-current mr-1" />
              {comment.likes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};