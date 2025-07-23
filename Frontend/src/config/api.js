// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`,
  },
  
  // Spam detection endpoints
  SPAM_DETECTION: {
    ANALYZE_CALL: `${API_BASE_URL}/api/spam-detection/analyze-call`,
    ANALYZE_EMAIL: `${API_BASE_URL}/api/spam-detection/analyze-email`,
    HISTORY: `${API_BASE_URL}/api/spam-detection/history`,
    HISTORY_BY_ID: (id) => `${API_BASE_URL}/api/spam-detection/history/${id}`,
    GET_SPAM_COUNT: `${API_BASE_URL}/api/spam-detection/getspamcount`,
  },
  
  // Token endpoints
  TOKEN: {
    GET_DETAILS: `${API_BASE_URL}/api/token/gettokendetails`,
  },
  
  // Report endpoints
  REPORT: {
    DOWNLOAD: (scanId) => `${API_BASE_URL}/api/report/download/${scanId}`,
    VIEW: (scanId) => `${API_BASE_URL}/api/report/view/${scanId}`,
    GENERATE: (scanId) => `${API_BASE_URL}/api/report/generate/${scanId}`,
  }
};

export default API_BASE_URL;
