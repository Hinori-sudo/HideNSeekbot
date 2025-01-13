const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');

new Command({
  name: 'userinfo',
  description: 'Get info on a server user!',
  type: [CommandType.SLASH],
  arguments: [
    new Argument({
      name: 'user',
      description: 'User! If not, it will use you!',
      type: ArgumentType.USER,
      required: false
    })
  ],

  run: async (ctx) => {
    try{
      const user = ctx.arguments.getUser(`user`) || ctx.user;
      const member = await ctx.guild.members.fetch(user.id);
      const icon = user.displayAvatarURL({ format: 'gif' || 'png', size: 512 });
      const tag = user.tag;
      const escapedUsername = tag.replace(/_/g, '\\_');
      const nickname = member.nickname || 'No nickname';

      // Get all roles, excluding the specified roles
      const roles = member.roles.cache.filter(role => !rolesToExclude.has(role.id));

      // Get the highest role from the filtered roles
      const highestRole = roles.size > 0 ? roles.sort((a, b) => b.position - a.position).first() : 'No roles';
      

      const embed = new EmbedBuilder()
      .setColor(0x8269c2)
      .setTitle(`𝚄𝚂𝙴𝚁 𝙸𝙽𝙵𝙾 `)
      .setAuthor({ name: user.displayName })
      .setDescription('**«═══✧ ✦ ✧ ✦ ✧═══»**')
      .setThumbnail(icon)
      .addFields(
        { name: 'Username:', value: `${escapedUsername}`, inline: true }, 
        { name: 'User @:', value: `<@${user.id}>`, inline: true },
        { name: 'User ID:', value: `${user.id}`, inline: false },
        { name: 'Created:', value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
        { name: 'Joined:', value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `${ctx.guild.name} • Members: ${ctx.guild.memberCount}`, // Footer text
        iconURL: ctx.guild.iconURL() // Optional: Server icon URL
      })

      await ctx.reply({ embeds: [embed] });
    } catch (error) {
      // Handle any errors that occur
      console.error('⚠️ Error handling document:', error);
      await ctx.reply('⚠️ Error occurred while fetching user information.');
    }
  }
})