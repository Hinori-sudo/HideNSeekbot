import discord
from discord.ext import commands
from dotenv import load_dotenv
from pymongo import MongoClient
import os
load_dotenv()

# Make sure to define intents
intents = discord.Intents.default()
intents.message_content = True  # This is required to read the content of messages

# Use commands.Bot instead of discord.Client for command handling
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✅ Logged in as {bot.user}")
    print("Hello grubby :3")

def connect():
    try:
        print("Connecting to database...")

        client = MongoClient(os.getenv('MONGO_TOKEN'))  # Set your MongoDB URI in your environment variable
        
        db_name = 'Discord-Bot'
        db = client[db_name]

        print("✅ Database connected!")

    except Exception as error:
        print(f"Error: {error}")
        print("❌ Database did not connect!")

connect()

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return
    
    # Custom on_message behavior (optional, if you want to handle it manually)
    if message.content.startswith('1'):
        await message.channel.send('Hello')
    
    # Ensure commands are still processed
    await bot.process_commands(message)

@bot.command()
async def hello(ctx):
    await ctx.send('Hello there!')

@bot.command()
async def hide(ctx):
    await ctx.send("Im going to hide, give me some time and come find me!!")

@bot.command()
async def seek(ctx):
    await ctx.send("GO AND HIDE NOW OR ILL KILL YOU RAHHHHHHHHHHHHHH :3")

bot.run(os.getenv("BOT_TOKEN"))
