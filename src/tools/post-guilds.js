const { clamp } = require('lodash');
const { question } = require('readline-sync');
const api = require('../util/api');
const { ENTER_TOKEN, INVALID_TOKEN } = require('../util/constants');

module.exports = async token => {
  token = token || question(ENTER_TOKEN);
  let amount = question('Enter the amount of servers to create (max 99):') || 1;
  amount = clamp(amount, 1, 99);
  const name = question('Enter the server name:') || 'Nuked';
  for (let i = 0; i < amount; i++) {
    try {
      await api(token).post('/guilds', {
        name,
        region: 'europe',
        icon: null,
        channels: null,
      });
      console.log(`Created server with name ${name} [${i + 1}]`);
    } catch (err) {
      if (err.response.status === 401) return console.log(INVALID_TOKEN);
    }
  }
  return console.info(`Created ${amount} servers.`);
};
