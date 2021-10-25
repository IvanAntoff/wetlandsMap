const axios = require('axios');
export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
});