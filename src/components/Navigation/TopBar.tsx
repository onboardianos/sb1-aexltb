import React from 'react';
import { Menu } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="lg:hidden">
          <button
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-gray-700">John Doe</div>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </header>
  );
};