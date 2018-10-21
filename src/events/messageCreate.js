// Config File
const config = require('../priv/config.json')

// User Schema
const UserSchema = require('../models/Users')

module.exports = {
  func: async (msg, Strive, logger) => {
    try {
      await UserSchema.getUserbyUID(msg.author.id, async (err, user) => {
        if (err) {
          logger.LogToConsole({
            type: 'Error',
            message: err,
            color: 'red'
          })
        }
        if (!user) {
          var newUser = new UserSchema({
            id: msg.author.id,
            blacklisted: false
          })
          UserSchema.addUser(newUser, (err, user) => {
            if (err) {
              logger.LogToConsole({
                type: 'Error',
                message: err,
                color: 'red'
              })
            }
          })
        } else if (!user.blacklisted) {
          if (msg.content.startsWith(config.prefix)) {
            try {
              var name = msg.content.split(' ')[0].slice(2)
              // var cmd = require(`../cmds/${file}`)
              var argsArr = msg.content.split(' ')
              argsArr.shift()
              var args = argsArr
              if (Strive.commands.has(name)) {
                var cmd = Strive.commands.get(name)
                cmd(msg, args, Strive, logger)
              }
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
          }
        }
      })
      Strive.session.messagesSeen += 1
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
  name: 'messageCreate'
}
