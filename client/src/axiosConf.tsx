const axios = require('axios');
export const axiosInstance = axios.create({
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": false,
      "Sec-Fetch-Site": "cross-site"
    },
});