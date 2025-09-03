const Eris = require('eris');
require('dotenv').config();
require('./keep_alive.js');
const { exec } = require('child_process');

const bot = new Eris(process.env.TOKEN);

bot.on('error', (err) => {
  console.error(err); // or your preferred logger
});

bot.on('ready', () => {
  console.log('Bot connected!');
});

// function to send Telegram via curl
const sendTelegram = (text) => {
  const cmd = `curl -s -X POST https://api.telegram.org/bot${
    process.env.TELEGRAM_TOKEN
  }/sendMessage -d chat_id=${
    process.env.TELEGRAM_CHAT_ID
  } -d text="${text.replace(/"/g, '\\"')}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Telegram error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Telegram stderr: ${stderr}`);
    }
    // console.log(`✅ Telegram response: ${stdout}`);
  });
};

bot.on('messageCreate', async (msg) => {
  // ignore messages from bots
  if (msg.author.bot) return;

  // Example: notify when someone mentions you
  const text = `[${msg.channel.guild?.name ?? 'DM'} #${
    msg.channel.name || 'Direct'
  }] ${msg.author.username}: ${msg.content}`;

  sendTelegram(text);
});

bot.connect(); // Get the bot to connect to Discord
