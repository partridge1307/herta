const fs = require('fs');

module.exports = (client) => {
  const eventFiles = fs.readdirSync(`${__dirname}/../events`).filter((f) => f.endsWith('.js'));
  eventFiles.forEach((e) => {
    const event = require(`${__dirname}/../events/${e}`);
    !event.config.once
      ? client.on(event.config.name, (...args) => event.execute(client, ...args))
      : client.once(event.config.name, (...args) => event.execute(client, ...args));
  });
};
