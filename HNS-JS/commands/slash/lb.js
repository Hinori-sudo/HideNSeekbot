const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');
const levelSchema = require('../../../schemas/level.js');
const moneySchema = require('../../../schemas/money.js');
const crimeSchema = require('../../../schemas/crimeSchema.js');
const pointSchema = require('../../../schemas/activityTournament.js');

new Command({
  name: 'leaderboard',
  description: 'See the server leaderboards!',
  type: [CommandType.SLASH],
  arguments: [
    new Argument({
      name: 'type',
      description: 'Type of leaderboard.',
      choices: [
        { name: 'XP', value: 'xp' },
        { name: 'Pix-Stars', value: 'stars' },
        { name: 'Crime', value: 'crime' },
        { name: 'Tournament Points', value: 'points'}
      ],
      type: ArgumentType.STRING,
      required: true
    }),
  ],

  run: async (ctx) => {
    const { guild, client } = ctx;
    const rankType = ctx.arguments.getString('type');
    await ctx.interaction.deferReply();

    if (rankType === 'xp') {
        // Get top 10 docs in xpData based on XP, Level fields
        const xpData = await levelSchema.find({ Guild: guild.id })
          .sort({
            XP: -1,
            Level: -1,
          })
          .limit(10);

        // Create an embed to send the leaderboard
        const xpEmbed = new EmbedBuilder()
          .setTitle(`<:announce:1276188470250832014> 𝚇𝙿 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 <:announce:1276188470250832014>`)
          .setColor(0x8269c2)
          .setFooter({
            text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`, // Footer text
            iconURL: ctx.guild.iconURL()
          })
          .setTimestamp();

        // If no leaderboard, inform user.
        if (!xpData.length) {
          xpEmbed.setDescription('This server does not have a leaderboard yet!');
        } else {
          // Array consisting of name/level/xp details (string) for each user
          const userDescriptions = [];

          // Iterates through each xpData document to create name/level/xp details for user and pushes them to
          // to userDescriptions array
          for (xpDataDoc of xpData) {
            const { User, XP, Level } = xpDataDoc;
            const member = await client.users.fetch(User);
            userDescriptions.push(`${xpData.indexOf(xpDataDoc) + 1}. ${member.tag} | XP: ${XP} | Level: ${Level}`);
          };

          // Join elements in user descriptions array with \n (new line)
          xpEmbed.setDescription(`\`\`\`${userDescriptions.join('\n')}\`\`\``);
        }

        // Send the leaderboard embed
        await ctx.interaction.editReply({ embeds: [xpEmbed] });
      }

      if (rankType === 'stars') {
        const starData = await moneySchema.find({ Guild: guild.id })
          .sort({
            Money: -1,
          })
          .limit(10)
        
        const starEmbed = new EmbedBuilder()
          .setTitle(`<:announce:1276188470250832014> 𝙿𝙸𝚇-𝚂𝚃𝙰𝚁𝚂 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 <:announce:1276188470250832014>`)
          .setColor(0x8269c2)
          .setFooter({
            text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`, // Footer text
            iconURL: ctx.guild.iconURL()
          })
          .setTimestamp();

        // If no leaderboard, inform user.
        if (!starData.length) {
          starEmbed.setDescription('This server does not have a leaderboard yet!');
        } else {
          // Array consisting of name/level/xp details (string) for each user
          const userDescriptions = [];

          // Iterates through each xpData document to create name/level/xp details for user and pushes them to
          // to userDescriptions array
          for (starDataDoc of starData) {
            const { User, Money } = starDataDoc;
            const member = await client.users.fetch(User);
            userDescriptions.push(`${starData.indexOf(starDataDoc) + 1}. ${member.tag} | Pix-Stars: ${Money}`);
          };

          // Join elements in user descriptions array with \n (new line)
          starEmbed.setDescription(`\`\`\`${userDescriptions.join('\n')}\`\`\``);
        }

        // Send the leaderboard embed
        await ctx.interaction.editReply({ embeds: [starEmbed] });
      }

      if (rankType === 'crime') {
        const crimeData = await crimeSchema.find({ Guild: guild.id })
          .sort({
            Crime: -1,
          })

          const crimeEmbed = new EmbedBuilder()
          .setTitle(`<:announce:1276188470250832014> 𝙲𝚁𝙸𝙼𝙴 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 <:announce:1276188470250832014>`)
          .setColor(0x8269c2)
          .setFooter({
            text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`, // Footer text
            iconURL: ctx.guild.iconURL()
          })
          .setTimestamp();

        // If no leaderboard, inform user.
        if (!crimeData.length) {
          crimeEmbed.setDescription('This server does not have a leaderboard yet!');
        } else {
          // Array consisting of name/level/xp details (string) for each user
          const userDescriptions = [];

          // Iterates through each xpData document to create name/level/xp details for user and pushes them to
          // to userDescriptions array
          for (crimeDataDoc of crimeData) {
            const { User, Crime } = crimeDataDoc;
            const member = await client.users.fetch(User);
            userDescriptions.push(`${crimeData.indexOf(crimeDataDoc) + 1}. ${member.tag} | Crimes: ${Crime}`);
          };

          // Join elements in user descriptions array with \n (new line)
          crimeEmbed.setDescription(`\`\`\`${userDescriptions.join('\n')}\`\`\``);
        }

        // Send the leaderboard embed
        await ctx.interaction.editReply({ embeds: [crimeEmbed] });
    }

    if (rankType === 'points') {
        const pointData = await pointSchema.find({ Guild: guild.id })
          .sort({
            Points: -1,
          })
          .limit(5)

          const pointEmbed = new EmbedBuilder()
          .setTitle(`<:announce:1276188470250832014> 𝙿𝙾𝙸𝙽𝚃 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 <:announce:1276188470250832014>`)
          .setColor(0x8269c2)
          .setFooter({
            text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`, // Footer text
            iconURL: ctx.guild.iconURL()
          })
          .setTimestamp();

        // If no leaderboard, inform user.
        if (!pointData.length) {
          pointEmbed.setDescription('This server does not have a leaderboard yet!');
        } else {
          // Array consisting of name/level/xp details (string) for each user
          const userDescriptions = [];

          // Iterates through each xpData document to create name/level/xp details for user and pushes them to
          // to userDescriptions array
          for (pointDataDoc of pointData) {
            const { User, Points } = pointDataDoc;
            const member = await client.users.fetch(User);
            userDescriptions.push(`${pointData.indexOf(pointDataDoc) + 1}. ${member.tag} | Points: ${Points}`);
          };

          // Join elements in user descriptions array with \n (new line)
          pointEmbed.setDescription(`\`\`\`${userDescriptions.join('\n')}\`\`\``);
        }

        // Send the leaderboard embed
        await ctx.interaction.editReply({ embeds: [pointEmbed] });
    }
  }
})