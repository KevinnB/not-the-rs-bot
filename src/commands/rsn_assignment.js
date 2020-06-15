const { constants, hiscores } = require('osrs-api');

const USER_NOT_FOUND = 'there was an error trying to execute that command! Could not find rsn on highscores.'


module.exports = {
  name: 'rsn',
  description: 'A assignment of rsn -> discord user',
  aliases: [],
  usage: '!rsn',
  cooldown: 5,
  async execute(message, { users }, args) {
    try {
      if (args.length === 0) {
        message.reply(
          'there was an error trying to execute that command! Username must be specified.'
        );
        return;
      }

      const username = args[0];

      try {
        const user = await hiscores.getPlayer({ name: username });
        if (!user.name) {
            message.reply(USER_NOT_FOUND);
            return;
        }

        await users.set(message.author.id, { name: user.name });
        console.log(`rsn ${user.name} set for user`, message.author.id);
      } catch (e) {
        if (e.response.status === 404) {
          message.reply(USER_NOT_FOUND);
          return;
        }
        throw e;
      }
    } catch (e) {
      console.error(e);
      message.reply('there was an error trying to execute that command!');
    }
  },
};
