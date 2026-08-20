import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Navbar from './components/Navbar';
import Particles from './components/Particles';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Domains from './pages/Domains';
import Quiz from './pages/Quiz';
import Roadmap from './pages/Roadmap';
import SkillGap from './pages/SkillGap';
import Internships from './pages/Internships';
import Hackathons from './pages/Hackathons';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Particles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/domains" element={<ProtectedRoute><Domains /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
          <Route path="/skills" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
          <Route path="/internships" element={<ProtectedRoute><Internships /></ProtectedRoute>} />
          <Route path="/hackathons" element={<ProtectedRoute><Hackathons /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
