const fs = require('fs');
const dotenv = require('dotenv');
const { Collection, Partials, Client, GatewayIntentBits } = require('discord.js');

dotenv.config({ path: './config.env' });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    32767,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.stringMenus = new Collection();
client.autoCompletes = new Collection();

module.exports = client;

fs.readdirSync(`${__dirname}/handlers`).forEach((handler) =>
  require(`./handlers/${handler}`)(client)
);

process.on('unhandledRejection', (error) => {
  console.log(`Unhandled promise rejection: ${error}`);
});

client.login(process.env.BOT_TOKEN);
