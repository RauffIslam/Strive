// Config File
const config = require('../priv/config.json')

module.exports = {
  func: async (msg, args, Strive, logger) => {
    try {
      const shard = await msg.channel.guild.shard
      const message = await msg.channel.createMessage('Pong!')
      await message.edit({
        content: '',
        embed: {
          title: `\nPong! :ping_pong: `,
          description: `\nBot Ping: ${message.timestamp - msg.timestamp} ms\nApi Ping: ${shard.lastHeartbeatReceived - shard.lastHeartbeatSent}ms`,
          author: {
            name: Strive.user.username,
            icon_url: Strive.user.avatarURL
          },
          color: 0x36393E,
          footer: {
            text: `Requested by ${msg.author.username}#${msg.author.discriminator}`
          }
        }
      })
    } catch (e) {
      await logger.LogToDiscord(Strive, {
        location: msg.channel.id,
        type: 'Error',
        message: e,
        color: 'red'
      })
      await logger.LogToConsole({
        type: 'Error',
        message: e,
        color: 'red'
      })
    }
  },
  name: 'ping',
  help: {
    description: 'Check if the bot is alive',
    usage: `${config.prefix}ping`
  }
}
