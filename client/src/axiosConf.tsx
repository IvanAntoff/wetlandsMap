const axios = require('axios');
export const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods':'GET,PUT,POST',
    }
});