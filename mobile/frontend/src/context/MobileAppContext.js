import React, { createContext, useContext, useState, useEffect } from 'react';
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
      // Profile
      const profRes = await api.get('/profile').catch(() => null);
      if (profRes?.data) {
        setProfile(profRes.data);
        if (profRes.data.selectedDomain) {
          setSelectedDomain(profRes.data.selectedDomain);
        }
      }

      // Roadmap
      const roadRes = await api.get('/roadmap').catch(() => null);
      if (roadRes?.data?.roadmapData) {
        setRoadmap(roadRes.data.roadmapData);
      }

      // Saved Internships
      const internRes = await api.get('/internships').catch(() => null);
      if (Array.isArray(internRes?.data)) {
        setSavedInternships(internRes.data);
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
  };

  const saveProfileData = async (updatedFields) => {
    const res = await api.post('/profile', updatedFields);
    if (res.data) {
      setProfile(res.data);
      if (res.data.selectedDomain) {
        setSelectedDomain(res.data.selectedDomain);
      }
      return res.data;
    }
  };

  const saveDomainSelection = async (domainObjOrId) => {
    const domainId = typeof domainObjOrId === 'string' ? domainObjOrId : domainObjOrId.id;
    setSelectedDomain(domainObjOrId);
    await api.post('/profile', { selectedDomain: domainId }).catch(() => null);
  };

  const saveRoadmapProgress = async (completedWeeks) => {
    const updatedData = { ...(roadmap || {}), completedWeeks };
    setRoadmap(updatedData);
    await api.post('/roadmap/save', { roadmapData: updatedData }).catch(() => null);
  };

  const bookmarkInternship = async (internship) => {
    const isSaved = savedInternships.some(item => item._id === internship._id || item.title === internship.title);
    if (isSaved) {
      // Remove
      const itemToDelete = savedInternships.find(item => item.title === internship.title || item._id === internship._id);
      if (itemToDelete?._id) {
        await api.delete(`/internships/${itemToDelete._id}`).catch(() => null);
      }
      setSavedInternships(prev => prev.filter(i => i.title !== internship.title));
    } else {
      // Add
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
      }}
    >
      {children}
    </MobileAppContext.Provider>
  );
};

export const useMobileApp = () => useContext(MobileAppContext);
