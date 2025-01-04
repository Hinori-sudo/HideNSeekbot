import discord
from discord.ext import commands
from discord import app_commands

# Use commands.Bot instead of discord.Client
class MyClient(commands.Bot):
    def __init__(self, intents):
        # Initialize with the prefix and intents
        super().__init__(command_prefix="!", intents=intents)

    async def on_ready(self):
        print(f'Logged on as {self.user}!')
        try:
            # Sync commands after the bot is ready
            await self.tree.sync()
            print("Slash commands synced successfully.")
        except Exception as e:
            print(f"Error syncing commands: {e}")

    @app_commands.command(name="hide", description="Hides and waits for you to find it")
    async def hide(self, interaction: discord.Interaction):
        await interaction.response.send_message("I'm going to hide!")

# Set up intents
intents = discord.Intents.default()
intents.message_content = True  # Allows bot to read message content

# Create the bot client instance (using commands.Bot)
client = MyClient(intents=intents)

# Run the bot with your token
client.run('YOUR_BOT_TOKEN')



