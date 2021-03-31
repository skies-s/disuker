const { isArray } = require('lodash');
const { question } = require('readline-sync');
const api = require('../util/api');
const { ENTER_TOKEN, INVALID_TOKEN } = require('../util/constants');

module.exports = async token => {
  token = token || question(ENTER_TOKEN);
  let d;
  try {
    const res = await api(token).get('/users/@me/channels');
    d = isArray(res.data) ? res.data : [];
  } catch (err) {
    if (err.response.status === 401) return console.log(INVALID_TOKEN);
  }
  for (const c of d) {
    const [u] = c.recipients;
    await api(token).delete(`/channels/${c.id}`);
    console.log(`Closed DM: ${u.username}`);
  }
  return console.info(`Closed ${d.length} DMs.`);
};
