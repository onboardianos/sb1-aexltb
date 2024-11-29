import React from 'react';
import { X } from 'lucide-react';
import { CreatePost } from './CreatePost';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, images?: File[], video?: File) => void;
}

export const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Create Post</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-4">
            <CreatePost 
              onSubmit={(content, images, video) => {
                onSubmit(content, images, video);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};