const fs = require('fs');
const Discord = require('discord.js'); // https://discord.js.org/#/
const dotenv = require('dotenv').config(); // https://www.npmjs.com/package/dotenv

if (dotenv.error) {
  throw dotenv.error;
}

// Setup Bot Client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map((key) => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

// Setup Bot Listeners
client.once('ready', () => {
  console.log('Ready!');
});
client.on('message', (message) => {
  try {
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) {
      return;
    }
    const args = message.content.slice(process.env.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!client.commands.has(command)) {
      message.reply('there was an error trying to execute that command!');
      return;
    }

    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  } catch (e) {
    console.log(e);
  }
});

// Bot Login to Server
client.login(process.env.TOKEN);
