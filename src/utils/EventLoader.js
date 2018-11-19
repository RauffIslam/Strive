// Node Modules
const fs = require('fs')

async function EventLoader(Strive, logger, db) {
  // Event Loader
  fs.readdir('./src/events', async (err, files) => {
    try {
      if (err) {
        return logger.error(err)
      }
      logger.info('Loading Events')
      await files.forEach(file => {
        try {
          const event = require(`../events/${file}`)
          logger.info(`Event: ${event.name}`)
          Strive.on(event.name, async attrib => {
            try {
              event.func(attrib, Strive, logger, db)
            } catch (err) {
              logger.error(err)
            }
          })
        } catch (err) {
          logger.error(err)
        }
      })
    } catch (err) {
      logger.error(err)
    }
  })
}

module.exports = EventLoader
