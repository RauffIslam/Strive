// Node Modules
const util = require('util')
const vm = require('vm')

// Config File
const config = require('../priv/config.json')

module.exports = {
  func: async (msg, args, Strive, logger) => {
    try {
      var clean = (code) => {
        return code.replace('```js', '').replace('```', '')
      }

      var code = clean(args.join(' '))
      var token = new RegExp(config.token, 'g')

      if (msg.author.id === config.ownerID) {
        var context = {
          Strive,
          config,
          msg,
          logger
        }
        var evaled = vm.runInNewContext(code, context)
      }

      var func = evaled
      if (typeof func !== 'string') {
        func = util.inspect(func)
      }

      let output = `\`\`\`js\n${func.replace(token, 'Secret')}\n\`\`\``
      let input = `\`\`\`js\n${code}\n\`\`\``

      msg.channel.createMessage({
        embed: {
          color: 0x36393E,
          fields: [{
            name: ':inbox_tray: Input:',
            value: input
          }, {
            name: ':outbox_tray: Output:',
            value: output
          }]
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
  name: 'eval',
  help: {
    description: 'Check if the bot is alive',
    usage: `${config.prefix}eval`,
    hidden: true
  }
}
