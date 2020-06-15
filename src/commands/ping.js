module.exports = {
    name: 'ping',
	description: 'A Simple ping / pong interaction',
	aliases: ['!p'],
	usage: '!ping',
	cooldown: 5,
	async execute(message, { users }, args) {
        try {
            message.reply('pong');

        } catch (e) {
            console.error(e);
        }
	},
};