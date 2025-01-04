# discord.py framework
import discord

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')

    async def on_message(self, message):
        print(f'Message from {message.author}: {message.content}')

    @discord.app_commands.command(name="hide", description="Hides and waits for you to find it")
    async def hide(interaction: discord.Interaction):
        await interaction.response.send_message("Im going to hide!")
    
intents = discord.Intents.default() #specifies what events the bot listens to, in this case it loads the default set of intents
intents.message_content = True # enables access to the content of messages

client = MyClient(intents=intents)
client.run('token')


