const { GClient, Plugins, Command, Component } = require('gcommands');
const { GatewayIntentBits, Partials } = require('discord.js');
const { join } = require('path');
require('dotenv').config();
import("mongoose");
const mongoose = require('mongoose');

Command.setDefaults({
	cooldown: '10s',
});

// Set the default onError function for components
Component.setDefaults({
    onError: (ctx, error) => {
        return ctx.reply('Oh no! Something went wrong!')
    }
});

// Search for plugins in node_modules (folder names starting with gcommands-plugin-) or plugins folder
Plugins.search(__dirname);

const client = new GClient({
    // Register the directories where your commands/components/listeners will be located.
    dirs: [
        join(__dirname, 'commands'),
        join(__dirname, 'components'),
        join(__dirname, 'listeners')
    ],
    // Enable message support
    messageSupport: true,
    // Set the prefix for message commands
    messagePrefix: 'n.',
    // Set the guild where you will be developing your bot. This is useful because guild slash commands update instantly.
    devGuildId: process.env.devGuildId,
    // Set the intents you will be using (https://discordjs.guide/popular-topics/intents.html#gateway-intents)
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMembers,      
        GatewayIntentBits.GuildMessageReactions,
      ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.User, Partials.Reaction]
});

//Connects mongoDB
(async function connect() {
    mongoose.set('strictQuery', false);
    try {
        console.log(`🔄 Connecting database...`);

        await mongoose.connect(process.env.MONGO_TOKEN,);
    } catch (error) {
        console.log(`Error ${error}`);
        console.log("⚠️ Database did not connect!");
    }
})();
 
//Logs mongoDB connect
mongoose.connection.once("open", () => {
    console.log("✅ Database connected successfully!");
});

// Login to the discord API
client.login(process.env.BOT_TOKEN,).catch(console.error);