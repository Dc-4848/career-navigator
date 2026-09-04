import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// PC LAN IPv4 address for physical mobile devices running Expo Go
const PC_LAN_IP = '10.117.214.151';

const getBaseURL = () => {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    // Use host PC LAN IP so physical Android/iOS phones can reach backend
    return `http://${PC_LAN_IP}:5000`;
  }
  return 'http://localhost:5000';
};


const API_URL = getBaseURL();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Interceptor to attach JWT token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Error reading token from AsyncStorage:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { API_URL };
export default api;
