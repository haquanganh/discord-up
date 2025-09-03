const Eris = require('eris');
require('dotenv').config();
require('./keep_alive.js');

const bot = new Eris(process.env.TOKEN);

bot.on('error', (err) => {
  console.error(err); // or your preferred logger
});

bot.on('ready', () => {
  console.log('Bot connected!');
});

bot.on('messageCreate', async (msg) => {
  // ignore messages from bots
  if (msg.author.bot) return;

  // Example: notify when someone mentions you
  // forward to Telegram
  const text = `[${msg.channel.guild?.name ?? 'DM'} #${
    msg.channel.name || 'Direct'
  }] ${msg.author.username}: ${msg.content}`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    }
  );
});

bot.connect(); // Get the bot to connect to Discord
