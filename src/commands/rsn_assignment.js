const { hiscores } = require('osrs-api');

const { HELPER } = require('../configuration');

const logger = HELPER.logger;
const ERROR = HELPER.ERROR;
const generateError = HELPER.generateError;

module.exports = {
  name: 'rsn',
  description: 'A assignment of rsn -> discord user',
  aliases: [],
  usage: '!rsn',
  cooldown: 5,
  async execute(message, { users }, args) {
    try {
      if (args.length === 0) {
        message.reply(generateError(ERROR.USERNAME_NOT_PROVIDED));
        return;
      }

      const username = args[0];

      try {
        logger.log(`Fetching ${username} from osrs highscores.`);
        const user = await hiscores.getPlayer({ name: username });
        if (!user.name) {
          logger.error(`${username} not found in osrs highscores.`);
          message.reply(generateError(ERROR.USER_NOT_FOUND));
          return;
        }

        logger.log(`rsn ${user.name} set for user`, message.author.id);
        await users.set(message.author.id, { name: user.name });
      } catch (e) {
        if (e.response.status === 404) {
          message.reply(generateError(ERROR.USER_NOT_FOUND));
          return;
        }
        throw e;
      }
    } catch (e) {
      logger.error(e);
      message.reply(generateError(ERROR.BASE));
    }
  },
};
