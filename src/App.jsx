import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import CreateJob from './pages/CreateJob';
import Invite from './pages/Invite';
import Comparison from './pages/Comparison';
import CreateInterview from './pages/CreateInterview';
import InterviewResults from './pages/InterviewResults';
import InterviewResultsList from './pages/InterviewResultsList';
import Onboarding from './pages/Onboarding';
import JobMarketplace from './pages/JobMarketplace';
import SeekerDashboard from './pages/SeekerDashboard';
import SeekerOnboarding from './pages/SeekerOnboarding';
import SeekerProfile from './pages/SeekerProfile';
import SeekerInterviewResult from './pages/SeekerInterviewResult';
import SeekerInterviewSchedule from './pages/SeekerInterviewSchedule';
import SeekerInterviewPreparation from './pages/SeekerInterviewPreparation';
import SeekerJobApplication from './pages/SeekerJobApplication';
import SeekerJobDetail from './pages/SeekerJobDetail';
import JobManagement from './pages/JobManagement';
import JobApplicantsDetail from './pages/JobApplicantsDetail';
import CreateAIInterview from './pages/CreateAIInterview';
import SeekerInterviewAccess from './pages/SeekerInterviewAccess';

// Placeholder for remaining pages
const Settings = () => <Dashboard />; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<JobManagement />} />
        <Route path="/jobs/:id" element={<JobApplicantsDetail />} />
        <Route path="/jobs/new" element={<CreateJob />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/interviews/setup" element={<CreateInterview />} />
        <Route path="/interviews" element={<CreateAIInterview />} />
        <Route path="/interviews/agent" element={<Navigate to="/interviews" replace />} />
        <Route path="/results" element={<InterviewResultsList />} />
        <Route path="/results/detail" element={<InterviewResults />} />
        <Route path="/settings" element={<Settings />} />

        {/* Seeker Routes */}
        <Route path="/seeker/onboarding" element={<SeekerOnboarding />} />
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker/marketplace" element={<JobMarketplace />} />
        <Route path="/seeker/job/:id" element={<SeekerJobDetail />} />
        <Route path="/seeker/apply/:id" element={<SeekerJobApplication />} />
        <Route path="/seeker/profile" element={<SeekerProfile />} />
        <Route path="/seeker/results/:id" element={<SeekerInterviewResult />} />
        <Route path="/seeker/schedule" element={<SeekerInterviewSchedule />} />
        <Route path="/seeker/interview/prepare/:id" element={<SeekerInterviewPreparation />} />
        <Route path="/seeker/interview/access" element={<SeekerInterviewAccess />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

