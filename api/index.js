import axios from 'axios';
import auth from './auth';
// import user from './user';
import { getAccessToken } from '@/utils/auth';
import doctor from './doctor';
import report from './report';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  function (config) {
    const accessToken = getAccessToken();

    config.baseURL = BASE_URL;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.log('Error >>', error);
    return Promise.reject(error);
  }
);

export default {
  auth: auth(axios, '/admin'),
  // user: user(axios, '/user'),
  doctor: doctor(axios, '/doctor'),
  report: report(axios, '/report'),
};
