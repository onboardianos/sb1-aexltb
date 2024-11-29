import React, { useState, useRef } from 'react';
import { Image, Video } from 'lucide-react';

interface CreatePostProps {
  onSubmit: (content: string, images?: File[], video?: File) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content, images, video || undefined);
    setContent('');
    setImages([]);
    setVideo(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3 mb-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 resize-none border rounded-lg p-3 h-24 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {video && (
          <div className="relative mb-4">
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full rounded-lg"
            />
            <button
              type="button"
              onClick={() => setVideo(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              ref={imageInputRef}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setImages(prev => [...prev, ...files]);
              }}
            />
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Image className="w-5 h-5" />
              <span>Image</span>
            </button>

            <input
              type="file"
              accept="video/*"
              hidden
              ref={videoInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setVideo(file);
              }}
            />
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              disabled={images.length > 0}
            >
              <Video className="w-5 h-5" />
              <span>Video</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};