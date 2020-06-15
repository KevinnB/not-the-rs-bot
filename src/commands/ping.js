module.exports = {
	name: 'ping',
	description: 'A Simple ping / pong interaction',
	execute(message, args) {
		message.reply('pong');
	},
};