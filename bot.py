import discord
from discord.ext import commands

# Make sure to define intents
intents = discord.Intents.default()
intents.message_content = True  # This is required to read the content of messages

# Use commands.Bot instead of discord.Client for command handling
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"We have logged in as {bot.user}")
    print("Hello grubby :3")

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    # Custom on_message behavior (optional, if you want to handle it manually)
    if message.content.startswith('!'):
        await message.channel.send('Hello')
    
    # Ensure commands are still processed
    await bot.process_commands(message)

@bot.command()
async def hello(ctx):
    await ctx.send('Hello there!')

bot.run('your_token_here')



