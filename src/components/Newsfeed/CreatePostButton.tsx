import React from 'react';

interface CreatePostButtonProps {
  onClick: () => void;
}

export const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 cursor-pointer" onClick={onClick}>
      <div className="flex items-center space-x-3">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div 
          className="flex-1 px-4 py-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          Share your thoughts...
        </div>
      </div>
    </div>
  );
};