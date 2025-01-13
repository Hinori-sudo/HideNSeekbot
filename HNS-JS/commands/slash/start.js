const { Command, CommandType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');

new Command({
  name: 'start',
  description: 'Start a game!',
  type: [CommandType.SLASH],

  run: async (ctx) => {

  }
})