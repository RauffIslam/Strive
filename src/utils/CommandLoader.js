// Node Modules
const fs = require('fs')

async function CommandLoader (Strive, logger) {
  // Command Loader
  fs.readdir('./src/cmds', async (err, files) => {
    try {
      if (err) {
        return logger.LogToConsole({
          type: 'error',
          message: err,
          color: 'red'
        })
      }

      if (!Strive.commands) Strive.commands = new Map()

      await files.forEach(file => {
        try {
          const cmd = require(`../cmds/${file}`)
          logger.LogToConsole({
            type: 'normal',
            message: `Command: ${cmd.name}`,
            color: 'green'
          })
          Strive.commands.set(cmd.name, cmd.func)
        } catch (e) {
          logger.LogToConsole({
            type: 'Error',
            message: e,
            color: 'red'
          })
        }
      })
    } catch (e) {
      await logger.LogToConsole({
        type: 'Error',
        message: e,
        color: 'red'
      })
    }
  })
}

module.exports = CommandLoader
