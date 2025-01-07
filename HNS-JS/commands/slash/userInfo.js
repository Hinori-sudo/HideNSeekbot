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

      // Define roles to exclude (replace these with actual role IDs you want to exclude)
      const rolesToExclude = new Set([
        '1279589654055620719', //ruined counting
        '1275196854723940394', //red
        '1275197753609289891', //orange
        '1275197837692637254', //yellow
        '1275197907494113301', //lime
        '1275197947960623226', //green
        '1275198003111661711', //teal
        '1275198037991620678', //turqiouse
        '1275198226852479046', //blue
        '1275198293709688963', //purple
        '1275198373409980458', //magenta
        '1275198410378580008', //pink
        '1269795741786836993', //deep red
        '1269795891473158311', //red
        '1269795964399652905', //light red
        '1269796050806509588', //pale red
        '1269796097379930284', //brown
        '1269796199230214215', //orange
        '1269796327047430195', //light orange
        '1269796380776333395', //pale orange
        '1269796446631231569', //dark yellow
        '1269796504097394710', //yellow
        '1269796544651989053', //light yellow
        '1269796602583715921', //pale yellow
        '1269797052120961044', //dark green
        '1269797104751087646', //green
        '1269797154248069193', //light green
        '1269797225731457158', //pale green
        '1269797847809921065', //dark turqiouse
        '1269798059550703616', //turqiouse
        '1269798121399914607', //light turqiouse
        '1269798270805217311', //pale turqiouse
        '1269798756015149217', //dark blue
        '1269798797714919496', //blue
        '1269798851699802174', //light blue
        '1269798892099207198', //pale blue
        '1269798947560357988', //dark purple
        '1269799061939028110', //purple
        '1269799103143870594', //light purple
        '1269799235885334599', //pale purple
        '1269800066349011004', //dark pink
        '1269800117930819618', //pink
        '1269800163858317342', //light pink
        '1269800223496994948', //pale pink
        '1269828419747844259', //black
        '1269828467781013534', //dark grey
        '1269828489679212607', //light grey
        '1269828515621109801', //white
        '1275097910400516116', //bill
        '1275097751310303273', //mill
      ]);

      // Get all roles, excluding the specified roles
      const roles = member.roles.cache.filter(role => !rolesToExclude.has(role.id));

      // Get the highest role from the filtered roles
      const highestRole = roles.size > 0 ? roles.sort((a, b) => b.position - a.position).first() : 'No roles';
      

      const embed = new EmbedBuilder()
      .setColor(0x8269c2)
      .setTitle(`<:xannounce:1276188470250832014> 𝚄𝚂𝙴𝚁 𝙸𝙽𝙵𝙾 <:xannounce:1276188470250832014>`)
      .setAuthor({ name: user.displayName })
      .setDescription('**«═══✧ ✦ ✧ ✦ ✧═══»**')
      .setThumbnail(icon)
      .addFields(
        { name: '<:xtriangle_medium:1276262944836947999> Username:', value: `<:xtriangle_small:1276263767872770108> ${escapedUsername}`, inline: true }, 
        { name: '<:xtriangle_medium:1276262944836947999> User @:', value: `<:xtriangle_small:1276263767872770108> <@${user.id}>`, inline: true },
        { name: '<:xtriangle_medium:1276262944836947999> User ID:', value: `<:xtriangle_small:1276263767872770108> ${user.id}`, inline: false },
        { name: '<:xtriangle_medium:1276262944836947999> Created:', value: `<:xtriangle_small:1276263767872770108> <t:${parseInt(user.createdAt / 1000)}:R>`, inline: true },
        { name: '<:xtriangle_medium:1276262944836947999> Joined:', value: `<:xtriangle_small:1276263767872770108> <t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true },
        { name: '<:xtriangle_medium:1276262944836947999> Highest role:', value: `<:xtriangle_small:1276263767872770108> ${highestRole}`, inline: false },
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