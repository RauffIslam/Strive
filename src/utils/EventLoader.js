// Node Modules
const fs = require('fs')

async function EventLoader (Strive, logger) {
  // Event Loader
  fs.readdir('./src/events', async (err, files) => {
    try {
      if (err) {
        return logger.LogToConsole({
          type: 'error',
          message: err,
          color: 'red'
        })
      }
      logger.LogToConsole({
        type: 'normal',
        message: 'Attempting to load events',
        color: 'green'
      })
      await files.forEach(file => {
        try {
          const event = require(`../events/${file}`)
          logger.LogToConsole({
            type: 'normal',
            message: `Event: ${event.name}`,
            color: 'green'
          })
          Strive.on(event.name, async (attrib) => {
            try {
              event.func(attrib, Strive, logger)
            } catch (e) {
              logger.LogToConsole({
                type: 'error',
                message: e,
                color: 'red'
              })
            }
          })
        } catch (e) {
          logger.LogToConsole({
            type: 'error',
            message: e,
            color: 'red'
          })
        }
      })
    } catch (e) {
      logger.LogToConsole({
        type: 'error',
        message: e,
        color: 'red'
      })
    }
  })
}

module.exports = EventLoader
