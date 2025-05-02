import axios from 'axios';
import { BASE_API_V1_ENDPOINT } from '@/utils/constants/sessions';
import { getUserToken } from '@/utils';

// const token = BASE_TEST_TOKEN;

export const httpV1 = axios.create({
  baseURL: BASE_API_V1_ENDPOINT,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});
// Add a request interceptor to add token to axios request header once user logs in an token is available
httpV1.interceptors.request.use(
  async (config) => {
    // Retrieve the token
    const token = await getUserToken();
    console.log('token', token);
    // If token exists, set the Authorization header
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

export const updateAuthToken = (token: string) => {
  httpV1.defaults.headers.Authorization = token ? `JWT ${token}` : '';
};

export const clearAuthToken = () => {
  httpV1.defaults.headers.common['Authorization'] = '';
};
