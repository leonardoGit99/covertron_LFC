import axios from 'axios';
import { baseLocalURLDirectClient } from './api.config';

const api = axios.create({
  baseURL: baseLocalURLDirectClient, // directo al backend
  withCredentials: false, // no necesito cookies
})

export default api;