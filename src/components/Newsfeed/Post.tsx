import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ThumbsUp,
  MessageSquare,
  Share2,
  MoreVertical
} from 'lucide-react';

interface PostProps {
  post: {
    id: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    content: string;
    images?: string[];
    createdAt: string;
    likes: number;
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
    shares: number;
    isLiked: boolean;
  };
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
}

export const Post: React.FC<PostProps> = ({ post, onLike, onComment, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = post.content.length > 280;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{post.author.role}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <AnimatePresence mode="wait">
          {shouldTruncate && !isExpanded ? (
            <motion.p 
              key="truncated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-600"
            >
              {post.content.slice(0, 280)}
              <span className="text-gray-400 mx-1">...</span>
              <button 
                onClick={() => setIsExpanded(true)}
                className="text-primary hover:text-primary-dark font-medium ml-1"
              >
                Read more
              </button>
            </motion.p>
          ) : (
            <motion.p 
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-600"
            >
              {post.content}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-6">
          <motion.button 
            onClick={() => onLike(post.id)}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center space-x-2 transition-colors ${
              post.isLiked ? 'text-primary' : 'hover:text-gray-700'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </motion.button>

          <motion.button 
            onClick={() => onComment(post.id)}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 hover:text-gray-700"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </motion.button>

          <motion.button 
            onClick={() => onShare(post.id)}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 hover:text-gray-700"
          >
            <Share2 className="w-5 h-5" />
            <span>{post.shares}</span>
          </motion.button>
        </div>
        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
      </div>
    </motion.div>
  );
};