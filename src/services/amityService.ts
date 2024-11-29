import { Client, CommunityRepository, FileRepository, PostRepository } from '@amityco/js-sdk';

// Initialize Amity client
const client = Client.createClient(import.meta.env.VITE_AMITY_API_KEY, {
  region: import.meta.env.VITE_AMITY_REGION || 'us'
});

// Connect user to Amity
export const connectUser = async (userId: string, displayName: string) => {
  try {
    const response = await client.login({
      userId,
      displayName
    });
    return response;
  } catch (error) {
    console.error('Error connecting to Amity:', error);
    throw error;
  }
};

// Create a post
export const createPost = async (content: string, fileIds: string[] = []) => {
  try {
    const post = await PostRepository.createPost({
      data: {
        text: content,
        fileIds
      }
    });
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Upload file
export const uploadFile = async (file: File) => {
  try {
    const response = await FileRepository.uploadFile({
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video'
    });
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Query posts
export const queryPosts = async (limit = 20) => {
  try {
    const posts = await PostRepository.queryPosts({
      limit,
      sortBy: 'lastCreated'
    });
    return posts;
  } catch (error) {
    console.error('Error querying posts:', error);
    throw error;
  }
};

// Add comment to post
export const createComment = async (postId: string, content: string) => {
  try {
    const comment = await PostRepository.createComment({
      postId,
      data: {
        text: content
      }
    });
    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// React to post
export const reactToPost = async (postId: string, action: 'like' | 'unlike') => {
  try {
    if (action === 'like') {
      await PostRepository.addReaction(postId, 'like');
    } else {
      await PostRepository.removeReaction(postId, 'like');
    }
  } catch (error) {
    console.error('Error reacting to post:', error);
    throw error;
  }
};

// Query comments for a post
export const queryComments = async (postId: string, limit = 20) => {
  try {
    const comments = await PostRepository.queryComments({
      postId,
      limit,
      sortBy: 'lastCreated'
    });
    return comments;
  } catch (error) {
    console.error('Error querying comments:', error);
    throw error;
  }
};