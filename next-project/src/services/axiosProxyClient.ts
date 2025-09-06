// import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'
import { baseLocalURLProxyClient, /* jsonHeaders */ } from './api.config'



const proxyApi = axios.create({
  baseURL: baseLocalURLProxyClient,
  withCredentials: true
})


proxyApi.interceptors.request.use(config => {
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

export default proxyApi