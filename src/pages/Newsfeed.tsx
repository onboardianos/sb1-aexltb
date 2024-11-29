import React, { useState } from 'react';
import { CreatePostButton } from '../components/Newsfeed/CreatePostButton';
import { PostModal } from '../components/Newsfeed/PostModal';
import { Post } from '../components/Newsfeed/Post';
import { CommentList } from '../components/Newsfeed/CommentList';
import { CommentInput } from '../components/Newsfeed/CommentInput';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SAMPLE_POSTS } from '../data/samplePosts';

export const Newsfeed: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);

  const handleCreatePost = (content: string, images?: File[], video?: File) => {
    const newPost = {
      id: String(Date.now()),
      author: {
        name: 'Nikita Harris',
        role: 'Sales Manager',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    setExpandedComments(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`https://yourapp.com/posts/${postId}`);
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1,
        };
      }
      return post;
    }));
  };

  return (
    <ErrorBoundary>
      <div className="max-w-2xl mx-auto py-6">
        <CreatePostButton onClick={() => setIsPostModalOpen(true)} />
        
        <PostModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={handleCreatePost}
        />
        
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id}>
              <Post
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
              
              {expandedComments.includes(post.id) && (
                <div className="bg-white rounded-b-lg shadow-sm px-6 pb-6 -mt-6 border-t">
                  <CommentList
                    comments={post.comments}
                    onLike={(commentId) => {
                      setPosts(posts.map(p => {
                        if (p.id === post.id) {
                          return {
                            ...p,
                            comments: p.comments.map(c => {
                              if (c.id === commentId) {
                                return {
                                  ...c,
                                  likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                                  isLiked: !c.isLiked,
                                };
                              }
                              return c;
                            }),
                          };
                        }
                        return p;
                      }));
                    }}
                  />
                  <CommentInput
                    onSubmit={(content) => {
                      const newComment = {
                        id: String(Date.now()),
                        author: {
                          name: 'Nikita Harris',
                          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                        },
                        content,
                        createdAt: new Date().toISOString(),
                        likes: 0,
                        isLiked: false,
                      };
                      
                      setPosts(posts.map(p => {
                        if (p.id === post.id) {
                          return {
                            ...p,
                            comments: [...p.comments, newComment],
                          };
                        }
                        return p;
                      }));
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
};