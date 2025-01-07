const { Command, CommandType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');

new Command({
  name: 'serverinfo',
  description: 'Get information about this server!',
  type: [CommandType.SLASH],

  run: async (ctx) => {
    try{
      const {guild} = ctx;
      const { members } = guild;
      const { name, ownerId, createdTimestamp, memberCount } = guild
      const icon = guild.iconURL() || ''
      const roles = guild.roles.cache.size;
      const emojis = guild.emojis.cache.size;
      const id = guild.id;
      const boostCount = guild.premiumSubscriptionCount || 'N/A';
  
  
      const embed = new EmbedBuilder()
      .setColor(0x8269c2)
      .setThumbnail(icon)
      .setAuthor({name: name})
      .setFooter({ text: `ID: ${id}`})
      .setTimestamp()
      .setTitle(`<:xannounce:1276188470250832014> 𝚂𝙴𝚁𝚅𝙴𝚁 𝙸𝙽𝙵𝙾 <:xannounce:1276188470250832014>`)
      .setDescription(`«═══✧ ✦ ✧ ✦ ✧═══»`)
      .addFields([
        { name: '<:xtriangle_medium:1276262944836947999> Server Owner:', value: `<:xtriangle_small:1276263767872770108> <@${ownerId}>`, inline: false },
        { name: '<:xtriangle_medium:1276262944836947999> Member Count:', value: `<:xtriangle_small:1276263767872770108> ${memberCount}`, inline: true },
        { name: '<:xtriangle_medium:1276262944836947999> Boost Count:', value: `<:xtriangle_small:1276263767872770108> ${boostCount}`, inline: true },
      ])
      .addFields([
        { name: '<:xtriangle_medium:1276262944836947999> Date Created:', value: `<:xtriangle_small:1276263767872770108> <t:${parseInt(createdTimestamp / 1000)}:R>`, inline: false },
        { name: '<:xtriangle_medium:1276262944836947999> Role Count:', value: `<:xtriangle_small:1276263767872770108> ${roles}`, inline: true },
        { name: '<:xtriangle_medium:1276262944836947999> Emote Count:', value: `<:xtriangle_small:1276263767872770108> ${emojis}`, inline: true },
      ]);

      await ctx.reply({ embeds: [embed] });
    } catch (error) {
      // Handle any errors that occur
      console.error('⚠️ Error handling document:', error);
      await ctx.reply('⚠️ Error occurred while fetching server information.');
    }
  }
})