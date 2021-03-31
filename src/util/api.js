const axios = require('axios');
const api = axios.create({
  baseURL: 'https://discord.com/api/v8',
});

module.exports = token => {
  api.defaults.headers.common['Authorization'] = token;
  api.defaults.headers.patch['Content-Type'] = 'application/json';
  return api;
};
