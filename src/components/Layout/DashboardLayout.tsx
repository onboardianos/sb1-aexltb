import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../Navigation/SideNav';
import { TopBar } from '../Navigation/TopBar';
import { FloatingTabs } from '../Navigation/FloatingTabs';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SideNav />
      <div className="lg:pl-[269px]">
        <TopBar />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <FloatingTabs />
      </div>
    </div>
  );
};