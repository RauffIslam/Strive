// Node Modules
const Eris = require('eris')
const mongoose = require('mongoose')
require('eris-additions')(Eris)

// Logger
const Logger = require('./utils/Logger')
// Loaders
const EventLoader = require('./utils/EventLoader')
const CommandLoader = require('./utils/CommandLoader')

// Config File
const config = require('./priv/config.json')

// Client + Configuration & Info
const Strive = new Eris.Client(config.token, {
  defaultImageFormat: 'png',
  defaultImageSize: 512,
  getAllUsers: true,
  restMode: true,
  autoreconnect: true
})

// Logger
const logger = new Logger()

// Loaders
EventLoader(Strive, logger)
CommandLoader(Strive, logger)

Strive.once('ready', async () => {
  try {
    // Log once the client is ready
    logger.LogToConsole({
      type: 'normal',
      message: 'Ready!'
    })
    // Set status
    Strive.editStatus('online', {
      name: 's?help for help'
    })
    var db = await mongoose.connect(config.dbURL, { useNewUrlParser: true })
    Strive.db = db.connection.db

    logger.LogToConsole({
      type: 'Normal',
      message: 'Connected to DB',
      color: 'green'
    })
  } catch (e) {
    logger.LogToConsole({
      type: 'error',
      message: e,
      color: 'red'
    })
  }
})

// Strive Declarations
Strive.commands = new Map()
Strive.session = {
  messagesSeen: 0
}

// Connect to Discord
Strive.connect()

module.exports = Strive
