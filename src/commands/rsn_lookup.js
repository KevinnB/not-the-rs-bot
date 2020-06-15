const { hiscores } = require('osrs-api');
const Discord = require('discord.js');

const { THEME, HELPER } = require('../configuration');

const logger = HELPER.logger;
const ERROR = HELPER.ERROR;
const generateError = HELPER.generateError;

module.exports = {
  name: 'lookup',
  description: 'A lookup for a users rsn',
  aliases: [],
  usage: '!lookup',
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

        message.reply(createHighScoresCard(user));
        logger.log(`rsn ${user.name} returned`);
      } catch (e) {
        if (e.response.status === 404) {
          logger.error(`${username} not found in osrs highscores.`);

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

function createHighScoresCard(account) {
  const message = new Discord.MessageEmbed()
    .setTitle(account.name)
    .setDescription('User highscores')
    .setAuthor(THEME.BOT_NAME, THEME.IMAGE_URL)
    .setTimestamp()
    .setColor(THEME.MESSAGE_COLOR);

  Object.keys(account).map((key) => {
    if (HELPER.NO_XP_ACCOUNT_FIELDS.indexOf(key) === -1 && account[key].level) {
      message.addField(key, account[key].level);
    }
  });

  return message;
}
