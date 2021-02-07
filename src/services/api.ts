import axios from 'axios';

const api = axios.create({
  baseURL: __DEV__
    ? 'http://10.0.3.2:3333'
    : 'https://api.gobarber.mundotech.dev',
});

export default api;
