const { sample } = require('lodash');
const { question } = require('readline-sync');
const api = require('../util/api');
const { ENTER_TOKEN, INVALID_TOKEN } = require('../util/constants');

module.exports = async token => {
  token = token || question(ENTER_TOKEN);
  const themes = ['dark', 'light'];
  const locales = ['ja', 'zh-TW', 'ko', 'zh-CN', 'de', 'lt', 'lv', 'fi', 'se'];
  while (true) {
    const locale = sample(locales);
    const theme = sample(themes);
    try {
      await api(token).patch('/users/@me/settings', { locale, theme });
      console.log(`Looping theme ${theme} locale ${locale}`);
    } catch (err) {
      if (err.response.status === 401) return console.log(INVALID_TOKEN);
    }
  }
};
