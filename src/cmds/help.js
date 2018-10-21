// Node Modules
const fs = require('fs')

// Config File
const config = require('../priv/config.json')

module.exports = {
  func: async (msg, args, Strive, logger) => {
    try {
      var cmds = []
      var names = []

      fs.readdir('./src/cmds', async (err, files) => {
        if (err) {
          return logger.LogToConsole({
            type: 'error',
            message: err,
            color: 'red'
          })
        }

        await files.forEach(file => {
          var cmd = require(`./${file}`)
          if (!cmd.help.hidden) {
            if (Array.isArray(cmd.help.usage)) {
              var uses = []
              cmd.help.usage.forEach(use => {
                uses.push(use)
              })
              cmds.push({
                name: cmd.name,
                description: cmd.help.description,
                usage: uses.join('\n')
              })
            } else {
              cmds.push({
                name: cmd.name,
                description: cmd.help.description,
                usage: cmd.help.usage
              })
            }
            names.push(cmd.name)
          }
        })

        if (!args.length) {
          msg.channel.createMessage({
            embed: {
              title: 'List of commands',
              description: `${names.join('\n')}`,
              color: 0x36393E
            }
          })
        } else {
          cmds.forEach(cmd => {
            if (cmd.name === args[0]) {
              msg.channel.createMessage({
                embed: {
                  title: cmd.name,
                  description: cmd.description,
                  color: 0x36393E,
                  fields: [{
                    name: 'Usage',
                    value: cmd.usage
                  }]
                }
              })
            }
          })
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
  name: 'help',
  help: {
    description: 'Check if the bot is alive',
    usage: [`${config.prefix}help`, `${config.prefix}help <command>`]
  }
}
