const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');
const levelSchema = require('../../../schemas/level.js');
const moneySchema = require('../../../schemas/money.js');
const crimeSchema = require('../../../schemas/crimeSchema.js');
const xpRankPosition = require('../../../utils/xpRankPosition.js')
const starRankPosition = require('../../../utils/starRankPosition.js');
const crimeRankPosition = require('../../../utils/crimeRankPosition.js');

new Command({
  name: 'rank',
  description: 'Check someone\'s rank in the server!',
  type: [CommandType.SLASH],
  arguments: [
    new Argument({
      name: 'user',
      description: 'Member for rank check!',
      type: ArgumentType.USER,
      required: false
    }),
  ],

  run: async (ctx) => {
    const user = ctx.arguments.getUser(`user`) || ctx.user;
		const member = await ctx.guild.members.fetch(user.id);
    const { guild } = ctx
    const starData = await moneySchema.findOne({ Guild: guild.id, User: member.id });
    const xpData = await levelSchema.findOne({ Guild: guild.id, User: member.id });
    const icon = user.displayAvatarURL({ format: 'gif' || 'png', size: 512 });
    const xpRank = await xpRankPosition(user.id, ctx.guild.id);
    const starRank = await starRankPosition(user.id, ctx.guild.id);
    const crimeData = await crimeSchema.findOne({ Guild: guild.id, User: member.id });
    const crimeRank = await crimeRankPosition(user.id, ctx.guild.id);
  
      if (!xpData) return await ctx.interaction.reply({ content: 'This user does not have any data yet!', ephemeral: true });
      if (!starData) return await ctx.interaction.reply({ content: 'This user does not have any data yet!', ephemeral: true });
      
      const Required = xpData.Level * xpData.Level * 30
  
      const rankEmbed = new EmbedBuilder()
      .setColor(0x8269c2)
      .setTitle(`<:announce:1276188470250832014> 𝚁𝙰𝙽𝙺 <:announce:1276188470250832014>`)
      .setAuthor({ name: user.displayName })
      .setThumbnail(icon)
      .setFooter({
        text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`,
        iconURL: ctx.guild.iconURL()
      })
      .setDescription(' ')
      .addFields(
        { name: '𝚇𝙿', value: '«═══✧ ✦ ✧═══»', inline: false },
        { name: '<:triangle_medium:1276262944836947999> Level:', value: `<:triangle_small:1276263767872770108> ${xpData.Level}`, inline: true },
        { name: '<:triangle_medium:1276262944836947999> Rank:', value: `<:triangle_small:1276263767872770108> ${xpRank}`, inline: true }, 
        { name: ' ', value: ' ', inline: false },
        { name: '<:triangle_medium:1276262944836947999> Current XP:', value: `<:triangle_small:1276263767872770108> ${xpData.XP}`, inline: true }, 
        { name: '<:triangle_medium:1276262944836947999> Next Level:', value: `<:triangle_small:1276263767872770108> ${Required}`, inline: true },
        { name: '𝙿𝙸𝚇-𝚂𝚃𝙰𝚁𝚂', value: '«═══✧ ✦ ✧═══»', inline: false },
        { name: '<:triangle_medium:1276262944836947999> Pix-Stars:', value: `<:triangle_small:1276263767872770108> ${starData.Money}`, inline: true },
        { name: '<:triangle_medium:1276262944836947999> Rank:', value: `<:triangle_small:1276263767872770108> ${starRank}`, inline: true },
      );

      if (crimeData) {
        rankEmbed.addFields(
          { name: '𝙲𝚁𝙸𝙼𝙴', value: '«═══✧ ✦ ✧═══»', inline: false },
          { name: '<:triangle_medium:1276262944836947999> Crimes:', value: `<:triangle_small:1276263767872770108> ${crimeData.Crime}`, inline: true },
          { name: '<:triangle_medium:1276262944836947999> Rank:', value: `<:triangle_small:1276263767872770108> ${crimeRank}`, inline: true },
        )
      }
  
      await ctx.interaction.reply({embeds: [rankEmbed]})
  }
})