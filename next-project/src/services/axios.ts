// import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'
import { baseLocalURL, /* jsonHeaders */ } from './api.config'



const api = axios.create({
  baseURL: baseLocalURL,
  withCredentials: true
})


api.interceptors.request.use(config => {
  return config;
});



// To add toke to header in each request
/* if (!(config.headers && config.headers["Content-Type"] === "multipart/form-data")) {
    config.headers = {
      ...config.headers,
      ...jsonHeaders
    };
  }

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }

  return config
}) */

export default api