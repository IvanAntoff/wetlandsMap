const axios = require('axios');
export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "https://humedalesdigitalescuencadelgualeguaychu.com",
      "Access-Control-Allow-Credentials": true,
    },
});