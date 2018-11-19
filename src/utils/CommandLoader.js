// Node Modules
const fs = require('fs')

async function CommandLoader(Strive, logger) {
  // Command Loader
  fs.readdir('./src/cmds', async (err, files) => {
    try {
      if (err) {
        logger.error(err)
      }

      if (!Strive.commands) Strive.commands = new Map()

      await files.forEach(file => {
        try {
          const cmd = require(`../cmds/${file}`)
          logger.info(`Command: ${cmd.name}`)
          Strive.commands.set(cmd.name, cmd.func)
        } catch (err) {
          logger.error(err)
        }
      })
    } catch (err) {
      logger.error(err)
    }
  })
}

module.exports = CommandLoader
