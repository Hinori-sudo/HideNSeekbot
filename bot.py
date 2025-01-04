import discord
from discord import app_commands

class MyClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}!')
        # Sync the commands with Discord
        try:
            await self.tree.sync()
            print(f"Slash commands synced successfully.")
        except Exception as e:
            print(f"Error syncing commands: {e}")

    async def on_message(self, message):
        print(f'Message from {message.author}: {message.content}')

    @app_commands.command(name="hide", description="Hides and waits for you to find it")
    async def hide(self, interaction: discord.Interaction):
        await interaction.response.send_message("I'm going to hide!")

# Set up intents (make sure the bot can read message content)
intents = discord.Intents.default()
intents.message_content = True

# Create an instance of MyClient
client = MyClient(intents=intents)

# Run the bot with your token
client.run('YOUR_BOT_TOKEN')


