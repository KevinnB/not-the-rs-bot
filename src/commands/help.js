const Discord = require('discord.js');

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['!h'],
  usage: '!help',
  cooldown: 5,
  execute(message, args) {
    const helpReply = new Discord.MessageEmbed()
      .setTitle('Commands')
      .setDescription('A list of all commands avaliable.')
      .setAuthor('not-the-rs-bot', 'https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setColor('#46bdf0')
      .addFields(
        {
          name: `${process.env.prefix}ping`,
          value: 'Replies with pong as required.',
        },
        {
          name: `${process.env.prefix}rsn <rsn>`,
          value: 'Assigns your RSN to your discord account.',
        },
        {
          name: `${process.env.prefix}lookup <rsn>`,
          value: 'Looks up user on the high scores.',
        }
      );

    message.reply(helpReply);
  },
};
