const { ActivityType } = require('discord.js');

const activityOptions = [
  { name: 'in Simulated Universe', type: ActivityType.Playing },
  { name: "Astral's spaceship to prevent March 7th", type: ActivityType.Competing },
  { name: 'my puppet', type: ActivityType.Watching },
];

module.exports = {
  config: {
    name: 'ready',
    once: true,
  },
  async execute(client) {
    console.log(`${client.user.tag} is logged on ${client.guilds.cache.size} servers`);

    const channel = await client.channels.fetch('1074331354935873537');
    channel.send(`Live on ${client.guilds.cache.size} servers`);

    client.user.setPresence({
      activities: [
        { name: "Astral's spaceship to prevent March 7th", type: ActivityType.Competing },
      ],
      status: 'dnd',
    });

    setInterval(async () => {
      const option = Math.floor(Math.random() * activityOptions.length);

      await client.user.setPresence({
        activities: [
          {
            name: activityOptions[option].name,
            type: activityOptions[option].type,
          },
        ],
        status: 'dnd',
      });
    }, 600 * 1000);
  },
};
