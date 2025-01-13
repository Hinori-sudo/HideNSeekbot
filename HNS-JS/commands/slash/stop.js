const { Command, CommandType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');

new Command({
  name: 'stop',
  description: 'Stop a game!',
  type: [CommandType.SLASH],

  run: async (ctx) => {

  }
})