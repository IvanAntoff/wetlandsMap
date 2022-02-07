import * as axios from 'axios';
export const axiosInstance = axios.default.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
});