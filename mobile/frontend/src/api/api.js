import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Dynamic host resolution for physical mobile devices running Expo Go
// Automatically extracts host IP from Expo packager, falling back to current Wi-Fi LAN IP
const FALLBACK_LAN_IP = '192.168.1.19';

const getBaseURL = () => {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const hostUri = Constants?.expoConfig?.hostUri || Constants?.manifest2?.extra?.expoClient?.hostUri;
    const detectedIp = hostUri ? hostUri.split(':')[0] : null;
    const ip = detectedIp || FALLBACK_LAN_IP;
    return `http://${ip}:5000`;
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
