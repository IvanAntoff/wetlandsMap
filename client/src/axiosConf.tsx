const axios = require('axios');
export const axiosInstance = axios.create({
  credentials: 'include',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});