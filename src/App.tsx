import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { MainLayout } from './components/layout/MainLayout';
import { DevelopmentDashboard } from './pages/DevelopmentDashboard';
import { PerformanceDashboard } from './pages/PerformanceDashboard';
import { CommunicationDashboard } from './pages/CommunicationDashboard';
import { EngagementDashboard } from './pages/EngagementDashboard';
import { Newsfeed } from './pages/Newsfeed';
import { Tasks } from './pages/Tasks';
import { TaskDetails } from './pages/TaskDetails';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Newsfeed />} />
            <Route path="/messenger" element={<div>Messenger</div>} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:taskId" element={<TaskDetails />} />
            <Route path="/my-videos" element={<div>My Videos</div>} />
            <Route path="/trainings" element={<div>Trainings</div>} />
            <Route path="/notifications" element={<div>Notifications</div>} />
            <Route path="/widgets" element={<div>Widgets</div>} />
            <Route path="/internal-directory" element={<div>Internal Directory</div>} />
            <Route path="/resource-center" element={<div>Resource Center</div>} />
            <Route path="/success-tracking" element={<div>Success Tracking</div>} />
            <Route path="/development" element={<DevelopmentDashboard />} />
            <Route path="/performance" element={<PerformanceDashboard />} />
            <Route path="/communication" element={<CommunicationDashboard />} />
            <Route path="/engagement" element={<EngagementDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;