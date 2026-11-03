import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const MobileAppContext = createContext();

export const MobileAppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState({
    degree: '',
    year: '',
    skills: [],
    interests: [],
    goal: '',
    selectedDomain: '',
  });
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [savedInternships, setSavedInternships] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  // CareerCaffe-inspired feature states
  const [roadmapsCatalog, setRoadmapsCatalog] = useState([]);
  const [resources, setResources] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  // Hydrate session on app launch
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          // Verify session with backend
          const meRes = await api.get('/auth/me');
          if (meRes.data) {
            setUser(meRes.data);
            await fetchUserData();
          }
        }
      } catch (err) {
        console.warn('Session hydration notice:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const fetchUserData = async () => {
    try {
      // 1. Profile
      const profRes = await api.get('/profile').catch(() => null);
      if (profRes?.data) {
        setProfile(profRes.data);
        if (profRes.data.selectedDomain) {
          setSelectedDomain(profRes.data.selectedDomain);
        }
      }

      // 2. Roadmap
      const roadRes = await api.get('/roadmap').catch(() => null);
      if (roadRes?.data?.roadmapData) {
        setRoadmap(roadRes.data.roadmapData);
      }

      // 3. Saved Internships (backward compatibility)
      const internRes = await api.get('/internships').catch(() => null);
      if (Array.isArray(internRes?.data)) {
        setSavedInternships(internRes.data);
      }

      // 4. Roadmaps Catalog
      const catRes = await api.get('/roadmaps/catalog').catch(() => null);
      if (Array.isArray(catRes?.data)) {
        setRoadmapsCatalog(catRes.data);
      }

      // 5. Bookmarked Resources
      const bookRes = await api.get('/resources/bookmarked').catch(() => null);
      if (Array.isArray(bookRes?.data)) {
        setBookmarkedResources(bookRes.data);
      }

      // 6. Saved Opportunities
      const savedOppRes = await api.get('/opportunities/saved').catch(() => null);
      if (Array.isArray(savedOppRes?.data)) {
        setSavedOpportunities(savedOppRes.data);
      }

      // 7. Tracked Applications
      const appRes = await api.get('/opportunities/applications').catch(() => null);
      if (Array.isArray(appRes?.data)) {
        setApplications(appRes.data);
      }

      // 8. Dashboard Stats
      const statsRes = await api.get('/dashboard/stats').catch(() => null);
      if (statsRes?.data) {
        setDashboardStats(statsRes.data);
      }

      // 9. Recommendations
      const recRes = await api.get('/recommendations').catch(() => null);
      if (recRes?.data) {
        setRecommendations(recRes.data);
      }
    } catch (err) {
      console.warn('User data fetch notice:', err.message);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.token) {
      const newToken = res.data.token;
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
      setUser(res.data.user || { email });
      await fetchUserData();
      return res.data;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const signup = async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password });
    if (res.data.token) {
      const newToken = res.data.token;
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
      setUser(res.data.user || { name, email });
      await fetchUserData();
      return res.data;
    }
    throw new Error(res.data.message || 'Signup failed');
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setToken(null);
    setUser(null);
    setProfile({ degree: '', year: '', skills: [], interests: [], goal: '', selectedDomain: '' });
    setSelectedDomain(null);
    setSavedInternships([]);
    setRoadmap(null);
    setRoadmapsCatalog([]);
    setBookmarkedResources([]);
    setSavedOpportunities([]);
    setApplications([]);
    setDashboardStats(null);
    setRecommendations(null);
  };

  const saveProfileData = async (updatedFields) => {
    const res = await api.post('/profile', updatedFields);
    if (res.data) {
      setProfile(res.data);
      if (res.data.selectedDomain) {
        setSelectedDomain(res.data.selectedDomain);
      }
      // Refresh recommendations and stats
      api.get('/recommendations').then(r => setRecommendations(r.data)).catch(() => {});
      api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
      return res.data;
    }
  };

  const saveDomainSelection = async (domainObjOrId) => {
    const domainId = typeof domainObjOrId === 'string' ? domainObjOrId : domainObjOrId.id;
    setSelectedDomain(domainObjOrId);
    await api.post('/profile', { selectedDomain: domainId }).catch(() => null);
    api.get('/recommendations').then(r => setRecommendations(r.data)).catch(() => {});
  };

  const saveRoadmapProgress = async (completedWeeks) => {
    const updatedData = { ...(roadmap || {}), completedWeeks };
    setRoadmap(updatedData);
    await api.post('/roadmap/save', { roadmapData: updatedData }).catch(() => null);
  };

  // Structured Roadmap Progress Tracker
  const updateStructuredRoadmapProgress = async (roadmapId, progressPayload) => {
    try {
      const res = await api.post(`/roadmaps/${roadmapId}/progress`, progressPayload);
      // Refresh catalog and dashboard stats
      api.get('/roadmaps/catalog').then(c => setRoadmapsCatalog(c.data)).catch(() => {});
      api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
      return res.data;
    } catch (e) {
      console.warn('Update structured roadmap error:', e.message);
    }
  };

  // Bookmark / Unbookmark Learning Resource
  const toggleBookmarkResource = async (resourceId) => {
    try {
      const res = await api.post(`/resources/${resourceId}/bookmark`);
      const isNowBookmarked = res.data?.isBookmarked;

      setResources(prev => prev.map(r => r._id === resourceId ? { ...r, isBookmarked: isNowBookmarked } : r));

      if (isNowBookmarked) {
        const item = resources.find(r => r._id === resourceId);
        if (item) setBookmarkedResources(prev => [item, ...prev]);
      } else {
        setBookmarkedResources(prev => prev.filter(r => r._id !== resourceId));
      }

      api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
      return res.data;
    } catch (e) {
      console.warn('Toggle bookmark resource error:', e.message);
    }
  };

  // Bookmark / Unbookmark Opportunity
  const toggleSaveOpportunity = async (oppId) => {
    try {
      const res = await api.post(`/opportunities/${oppId}/bookmark`);
      const isNowSaved = res.data?.isSaved;

      setOpportunities(prev => prev.map(o => o._id === oppId ? { ...o, isSaved: isNowSaved } : o));

      if (isNowSaved) {
        const item = opportunities.find(o => o._id === oppId);
        if (item) setSavedOpportunities(prev => [item, ...prev]);
      } else {
        setSavedOpportunities(prev => prev.filter(o => o._id !== oppId));
      }

      api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
      return res.data;
    } catch (e) {
      console.warn('Toggle save opportunity error:', e.message);
    }
  };

  // Application Tracker Actions
  const addApplication = async (appData) => {
    try {
      const res = await api.post('/opportunities/applications', appData);
      if (res.data) {
        setApplications(prev => [res.data, ...prev]);
        api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
        return res.data;
      }
    } catch (e) {
      console.warn('Add application error:', e.message);
      throw e;
    }
  };

  const updateApplication = async (appId, updatedFields) => {
    try {
      const res = await api.put(`/opportunities/applications/${appId}`, updatedFields);
      if (res.data) {
        setApplications(prev => prev.map(a => a._id === appId ? res.data : a));
        api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
        return res.data;
      }
    } catch (e) {
      console.warn('Update application error:', e.message);
      throw e;
    }
  };

  const deleteApplication = async (appId) => {
    try {
      await api.delete(`/opportunities/applications/${appId}`);
      setApplications(prev => prev.filter(a => a._id !== appId));
      api.get('/dashboard/stats').then(s => setDashboardStats(s.data)).catch(() => {});
    } catch (e) {
      console.warn('Delete application error:', e.message);
    }
  };

  // Legacy internship bookmarking support
  const bookmarkInternship = async (internship) => {
    const isSaved = savedInternships.some(item => item._id === internship._id || item.title === internship.title);
    if (isSaved) {
      const itemToDelete = savedInternships.find(item => item.title === internship.title || item._id === internship._id);
      if (itemToDelete?._id) {
        await api.delete(`/internships/${itemToDelete._id}`).catch(() => null);
      }
      setSavedInternships(prev => prev.filter(i => i.title !== internship.title));
    } else {
      const res = await api.post('/internships/save', internship).catch(() => null);
      if (res?.data) {
        setSavedInternships(prev => [...prev, res.data]);
      }
    }
  };

  return (
    <MobileAppContext.Provider
      value={{
        user,
        token,
        profile,
        selectedDomain,
        savedInternships,
        roadmap,
        loading,
        login,
        signup,
        logout,
        saveProfileData,
        saveDomainSelection,
        saveRoadmapProgress,
        bookmarkInternship,
        fetchUserData,
        setRoadmap,
        // CareerCaffe feature states & actions
        roadmapsCatalog,
        resources,
        setResources,
        bookmarkedResources,
        opportunities,
        setOpportunities,
        savedOpportunities,
        applications,
        dashboardStats,
        recommendations,
        updateStructuredRoadmapProgress,
        toggleBookmarkResource,
        toggleSaveOpportunity,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </MobileAppContext.Provider>
  );
};

export const useMobileApp = () => useContext(MobileAppContext);
