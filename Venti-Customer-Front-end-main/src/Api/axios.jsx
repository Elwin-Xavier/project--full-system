import axios from 'axios'
import { getToken } from '../utils/helpers';

export const baseURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_APP_HOST_URL_LIVE
    : import.meta.env.VITE_APP_HOST_URL_LIVE

const instance = axios.create({ baseURL })

instance.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;
  // config.headers.["X-permissions"]
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response.status ? error.response.status : null;
    if (status === 401) {
      // localStorage.clear('user');
      window.location.href = '/signin'
    }
    return Promise.reject(error);
  });
export default instance