import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../Contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401 && error.response.data?.code === 'token.expired') {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { 'plataform-education.refreshToken': refreshToken } = parseCookies();
          const response = await api.post('/refresh', { refreshToken });
          const { token } = response.data;
      
          setCookie(null, 'plataform-education.token', token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
          setCookie(null, 'plataform-education.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
      
          api.defaults.headers['Authorization'] = `Bearer ${token}`;
      
          failedRequestsQueue.forEach((request) => request.onSuccess(token));
          failedRequestsQueue = [];
        } catch (err) {
          failedRequestsQueue.forEach((request) => request.onFailure(err));
          failedRequestsQueue = [];
          if (typeof window !== 'undefined') {
            signOut();
          }
        } finally {
          isRefreshing = false;
        }
      }
      
    }

    if (typeof window !== 'undefined') {
      signOut();
    } else {
      return Promise.reject(new AuthTokenError());
    }

    return Promise.reject(error);
  }
);

export { api };