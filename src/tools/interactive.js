const fs = require('fs');
const { question, keyInYN } = require('readline-sync');
const { ENTER_TOKEN } = require('../util/constants');

module.exports = async () => {
  const token = question(ENTER_TOKEN);
  const tools = [];
  const closeDMs = keyInYN('Do you want to close all DMs?');
  if (closeDMs) tools.push(require('./delete-channels'));
  const unfriend = keyInYN('Do you want to unfriend all friends?');
  if (unfriend) tools.push(require('./delete-relationships'));
  const leaveGuilds = keyInYN('Do you want to leave all servers?');
  if (leaveGuilds) tools.push(require('./delete-guilds'));
  const loop = keyInYN('Do you want to loop themes & locale?');
  if (loop) tools.push(require('./patch-settings'));
  tools.forEach(tool => tool(token));
};
