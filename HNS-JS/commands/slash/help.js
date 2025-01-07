const { Command, CommandType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');

//TODO: This whole command.

new Command({
  name: 'help',
  description: 'Get help about Cornelius!',
  type: [CommandType.SLASH],

  run: async (ctx) => {
    const icon = ctx.guild.iconURL() || ''
    
    const helpEmbed = new EmberBuilder()
    .setColor(0x8269c2)
    .setAuthor({ name: ctx.user.displayName, iconURL: ctx.user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp()
    .setFooter({
      text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`, // Footer text
      iconURL: icon // Optional: Server icon URL
    }) 
    .setThumbnail(`https://i.ibb.co/jDCnxc2/image-20-scaled-37x-pngcrushed.png`)
    .setTitle(`Hello ${ctx.user.username}! My name is Cornelius! Here's everything you need to get started!`)
    .setDescription(``)
		await ctx.reply({embed: helpEmbed});
  }
})