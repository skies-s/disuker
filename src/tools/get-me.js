const AsciiTable = require('ascii-table');
const { question } = require('readline-sync');
const api = require('../util/api');
const { ENTER_TOKEN, INVALID_TOKEN } = require('../util/constants');

module.exports = async () => {
  const token = question(ENTER_TOKEN);
  let d;
  try {
    const res = await api(token).get('/users/@me');
    d = res.data;
  } catch (err) {
    if (err.response.status === 401) return console.log(INVALID_TOKEN);
  }
  const { data: g } = await api(token).get('/users/@me/guilds');
  const { data: r } = await api(token).get('/users/@me/relationships');
  const table = new AsciiTable();
  table.addRow('ID', d.id);
  table.addRow('Username', d.username);
  table.addRow('Email', d.email);
  if (d.phone) table.addRow('Phone Number', d.phone);
  table.addRow('2FA', d.mfa_enabled ? 'Yes' : 'No');
  table.addRow('Friends', r.length);
  table.addRow('Servers', g.length);
  return console.log(table.toString());
};
