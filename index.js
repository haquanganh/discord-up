const Eris = require('eris');
require('dotenv').config();
require('./keep_alive.js');

const bot = new Eris(process.env.TOKEN, {
  intents: ['guildMessages', 'guilds'],
});

bot.on('error', (err) => {
  console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord
