export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    imageUrl: string;
    role: string;
  };
  content: string;
  images?: string[];
  video?: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
  isShared: boolean;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    imageUrl: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface CreatePostInput {
  content: string;
  images?: File[];
  video?: File;
}

export interface CommentError extends Error {
  code: string;
  details?: string;
}