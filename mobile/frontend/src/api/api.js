import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// ============================================================================
// CONFIGURATION & BASE URL RESOLUTION
// ============================================================================

const PROD_API_URL = 'https://career-navigator-2cwd.onrender.com';
const FALLBACK_LAN_IP = '10.125.163.151';

/**
 * Dynamically extract host IP from all available Expo runtime manifests
 */
export const getDetectedPackagerHost = () => {
  try {
    const candidates = [
      Constants?.expoConfig?.hostUri,
      Constants?.manifest2?.extra?.expoClient?.hostUri,
      Constants?.manifest2?.extra?.expoGo?.packagerOpts?.host,
      Constants?.manifest?.debuggerHost,
    ];

    for (const cand of candidates) {
      if (typeof cand === 'string' && cand.trim().length > 0) {
        const cleanHost = cand.split(':')[0].trim();
        if (cleanHost && cleanHost !== 'localhost' && cleanHost !== '127.0.0.1') {
          return cleanHost;
        }
      }
    }

    // Try linkingUri (e.g. exp://192.168.1.19:8081)
    if (typeof Constants?.linkingUri === 'string') {
      const match = Constants.linkingUri.match(/exp:\/\/([^:/]+)/);
      if (match && match[1] && match[1] !== 'localhost' && match[1] !== '127.0.0.1') {
        return match[1];
      }
    }
  } catch (err) {
    // Non-fatal, fallback to default
  }
  return null;
};

/**
 * Resolves the active API base URL with prioritized fallbacks
 */
export const getBaseURL = () => {
  // 1. Explicit environment variable override
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL.replace(/\/+$/, '');
  }

  // 2. Production build
  if (process.env.NODE_ENV === 'production' && !__DEV__) {
    return PROD_API_URL;
  }

  // 3. Mobile physical device or simulator
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const detectedIp = getDetectedPackagerHost();
    const ip = detectedIp || FALLBACK_LAN_IP;
    return `http://${ip}:5000`;
  }

  // 4. Default for local web development
  return 'http://localhost:5000';
};

const isProductionTarget = () => {
  const url = getBaseURL();
  return url.includes('onrender.com') || (process.env.NODE_ENV === 'production' && !__DEV__);
};

// Render cold starts can take ~25-35s; local LAN requests should timeout faster (15s)
const DEFAULT_TIMEOUT = isProductionTarget() ? 45000 : 15000;

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: DEFAULT_TIMEOUT,
});

// ============================================================================
// REQUEST INTERCEPTOR: Dynamic URL Refresh & Auth Token
// ============================================================================

api.interceptors.request.use(
  async (config) => {
    config.metadata = { startTime: Date.now() };

    // Dynamically refresh baseURL in development so IP changes apply without bundle reload
    if (!config.url?.startsWith('http://') && !config.url?.startsWith('https://')) {
      config.baseURL = getBaseURL();
      // Ensure timeout matches the target environment
      config.timeout = isProductionTarget() ? 45000 : 15000;
    }

    // Attach JWT Token if present
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      if (__DEV__) console.warn('[API Auth] Failed to read token from AsyncStorage:', e.message);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================================
// RESPONSE INTERCEPTOR: Safe Idempotent Retries & Diagnostic Logging
// ============================================================================

const MAX_SAFE_RETRIES = 2; // Up to 3 attempts total

api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      const duration = Date.now() - (response.config.metadata?.startTime || Date.now());
      // Log slow responses (> 3s)
      if (duration > 3000) {
        console.log(`[API Slow] ${response.config.method?.toUpperCase()} ${response.config.url} took ${duration}ms`);
      }
    }
    return response;
  },
  async (error) => {
    const config = error.config;
    const duration = config?.metadata?.startTime ? Date.now() - config.metadata.startTime : 0;
    const method = config?.method?.toUpperCase() || 'GET';
    const url = (config?.baseURL || '') + (config?.url || '');

    // 1. Determine error category
    let errorCategory = 'UNKNOWN';
    const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
    const isNetwork = error.message === 'Network Error' || !error.response;
    const is5xx = error.response && error.response.status >= 500 && error.response.status <= 504;

    if (isTimeout) errorCategory = 'TIMEOUT';
    else if (isNetwork) errorCategory = 'NETWORK_OFFLINE_OR_UNREACHABLE';
    else if (is5xx) errorCategory = 'SERVER_ERROR';
    else if (error.response?.status === 401 || error.response?.status === 403) errorCategory = 'AUTHENTICATION_REQUIRED';
    else if (error.response?.status === 404) errorCategory = 'NOT_FOUND';

    // 2. Safe Retry Policy: ONLY retry idempotent GET requests that experienced transient network/timeout/5xx errors
    const isIdempotentMethod = method === 'GET' || method === 'HEAD' || method === 'OPTIONS';
    const isRetryableError = isNetwork || isTimeout || is5xx;
    const currentRetry = config?._retryCount || 0;

    if (config && isIdempotentMethod && isRetryableError && currentRetry < MAX_SAFE_RETRIES) {
      config._retryCount = currentRetry + 1;
      const backoffDelay = Math.pow(2, currentRetry) * 1000 + Math.floor(Math.random() * 300);

      if (__DEV__) {
        console.log(
          `[API Retry] ${method} ${config.url} (${errorCategory}). Retrying attempt ${config._retryCount}/${MAX_SAFE_RETRIES} in ${backoffDelay}ms...`
        );
      }

      await new Promise((res) => setTimeout(res, backoffDelay));
      return api(config);
    }

    // 3. Diagnostic Logging for final failed requests (development only, no secrets)
    if (__DEV__) {
      console.warn(
        `[API Error] ${method} ${url} | Category: ${errorCategory} | Duration: ${duration}ms | Status: ${error.response?.status || 'No Response'} | Msg: ${error.message}`
      );
    }

    // Attach structured diagnostic details to the error object for UI consumers
    error.diagnostic = {
      method,
      url,
      category: errorCategory,
      duration,
      status: error.response?.status || null,
      isNetworkError: isNetwork,
      isTimeout,
    };

    return Promise.reject(error);
  }
);

// ============================================================================
// HEALTH CHECK UTILITY
// ============================================================================

/**
 * Checks if the backend API is alive and reachable.
 * Returns { ok: boolean, status: string, latency: number, error?: string }
 */
export const checkBackendHealth = async () => {
  const startTime = Date.now();
  try {
    let res;
    try {
      res = await api.get('/health', { timeout: 8000 });
    } catch (e) {
      // If /health returns 404 (e.g. older production deployment), fall back to root /
      if (e.response?.status === 404) {
        res = await api.get('/', { timeout: 8000 });
      } else {
        throw e;
      }
    }

    return {
      ok: true,
      status: res.data?.status || 'online',
      database: res.data?.database || 'connected',
      latency: Date.now() - startTime,
    };
  } catch (err) {
    return {
      ok: false,
      status: 'unreachable',
      latency: Date.now() - startTime,
      error: err.diagnostic?.category || err.message,
    };
  }
};

export const API_URL = getBaseURL();
export default api;
