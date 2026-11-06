import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Domains from './pages/Domains';
import Quiz from './pages/Quiz';
import RoadmapsList from './pages/RoadmapsList';
import RoadmapDetail from './pages/RoadmapDetail';
import Resources from './pages/Resources';
import SkillGap from './pages/SkillGap';
import Internships from './pages/Internships';
import Hackathons from './pages/Hackathons';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/domains" element={<ProtectedRoute><Domains /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/roadmaps" element={<RoadmapsList />} />
              <Route path="/roadmaps/:slug" element={<RoadmapDetail />} />
              <Route path="/roadmap" element={<RoadmapsList />} />
              <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
              <Route path="/skills" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
              <Route path="/internships" element={<ProtectedRoute><Internships /></ProtectedRoute>} />
              <Route path="/hackathons" element={<ProtectedRoute><Hackathons /></ProtectedRoute>} />
              <Route path="/resume-analyzer" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
