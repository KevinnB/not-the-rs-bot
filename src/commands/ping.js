const { HELPER } = require('../configuration');

const logger = HELPER.logger;

module.exports = {
  name: 'ping',
  description: 'A Simple ping / pong interaction',
  aliases: [],
  usage: '!ping',
  cooldown: 5,
  async execute(message, { users }, args) {
    try {
      logger.log('pong');
      message.reply('pong');
    } catch (e) {
      console.error(e);
    }
  },
};
