import discord
from discord.ext import commands
from discord import app_commands

client = discord.Client()

@client.event
async def on_ready():
    print("We hae logged in as {0.user}".format(client))
    print("hello grubby :3")


@client.event
async def on_message(message):
    if message.author == client.user:
        return
    
    if message.content.startswith('!'):
        await message.channel.send('Hello')

client.run('token')




