const { isArray } = require('lodash');
const { question } = require('readline-sync');
const api = require('../util/api');
const { ENTER_TOKEN, INVALID_TOKEN } = require('../util/constants');

module.exports = async token => {
  token = token || question(ENTER_TOKEN);
  let d;
  try {
    const res = await api(token).get('/users/@me/guilds');
    d = isArray(res.data) ? res.data : [];
    d = d.filter(({ owner }) => !owner);
    if (!d.length) return console.log('No servers to leave.');
  } catch (err) {
    if (err.response.status === 401) return console.log(INVALID_TOKEN);
  }
  for (const g of d) {
    try {
      await api(token).delete(`/users/@me/guilds/${g.id}`);
      console.log(`Left server: ${g.name}`);
    } catch {}
  }
  return console.info(`Left ${d.length} servers.`);
};
