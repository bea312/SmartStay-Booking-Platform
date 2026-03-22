import axios, { AxiosInstance, AxiosError } from 'axios';

// @ts-ignore
const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
// @ts-ignore
const API_HOST = import.meta.env.VITE_RAPID_API_HOST;
// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_KEY) {
  console.error('Missing VITE_RAPID_API_KEY in .env file');
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
      error.message = 'Rate limit exceeded. Please try again later.';
    } else if (error.code === 'ECONNABORTED') {
      error.message = 'Request timed out. Please try again.';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
