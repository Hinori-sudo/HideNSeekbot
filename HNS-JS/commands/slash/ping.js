const { Command, CommandType } = require('gcommands');

new Command({
  name: 'ping',
  description: 'Check Cornelius\' ping!',
  type: [CommandType.SLASH],
  run: async (ctx) => {
    try {
      // Acknowledge the interaction
      await ctx.interaction.deferReply();

      // Fetch the reply to measure latency
      const reply = await ctx.interaction.fetchReply();

      // Calculate ping
      const ping = reply.createdTimestamp - ctx.createdTimestamp;

      // Edit the reply to include the ping
      await ctx.interaction.editReply(`<:xtriangle_small:1276263767872770108> Bot latency: ${ping}ms | <:xtriangle_small:1276263767872770108> API Latency: ${ctx.client.ws.ping}ms`);
    } catch (error) {
      console.error('Error executing ping command:', error);

      // If the interaction has already been responded to or deferred, use editReply
      if (ctx.interaction.deferred || ctx.interaction.replied) {
        await ctx.interaction.editReply('⚠️ Error occurred while processing the command.');
      } else {
        // Otherwise, reply to the interaction
        await ctx.interaction.reply('⚠️ Error occurred while processing the command.');
      }
    }
  }
})