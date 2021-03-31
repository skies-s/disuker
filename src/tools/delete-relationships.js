const { isArray } = require('lodash');
const { question } = require('readline-sync');
const api = require('../util/api');
const { ENTER_TOKEN, INVALID_TOKEN } = require('../util/constants');

module.exports = async token => {
  token = token || question(ENTER_TOKEN);
  let d;
  try {
    const res = await api(token).get('/users/@me/relationships');
    d = isArray(res.data) ? res.data : [];
    if (!d.length) return console.log('No friends to unfriend.');
  } catch (err) {
    if (err.response.status === 401) return console.log(INVALID_TOKEN);
  }
  for (const r of d) {
    try {
      await api(token).delete(`/users/@me/relationships/${r.id}`);
      console.log(`Unfriended: ${r.username}`);
    } catch {}
  }
  return console.info(`Unfriended ${d.length} friends.`);
};
