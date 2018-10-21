// Config File
const config = require('../priv/config.json')

module.exports = {
  func: async (msg, args, Strive, logger) => {
    try {
      var id
      if (msg.mentions.length) {
        id = msg.mentions[0].id
      } else if (args.length) {
        id = args[0]
      } else {
        id = msg.author.id
      }

      Strive.getRESTUser(id).then((u) =>
        msg.channel.createMessage({
          embed: {
            image: {
              url: u.avatarURL
            },
            color: 0x36393E,
            footer: {
              text: `Requested by ${msg.author.username}#${msg.author.discriminator}`
            }
          }
        })
      )
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
  name: 'avatar',
  help: {
    description: 'Get the avatar of any user',
    usage: [`${config.prefix}avatar`, `${config.prefix}avatar <id>`, `${config.prefix}avatar <mention>`]
  }
}
