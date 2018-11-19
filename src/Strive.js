// Node Modules
const Eris = require('eris')
require('eris-additions')(Eris)

// Logger
const logger = require('./utils/logger')

// Database
const db = require('./utils/Rethink')

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

// Loaders
EventLoader(Strive, logger, db)
CommandLoader(Strive, logger)

Strive.once('ready', async () => {
  try {
    // Log once the client is ready
    logger.info('Ready')
    // Set status
    Strive.editStatus('online', {
      name: 's?help for help'
    })
  } catch (err) {
    logger.error(err)
  }
})

// Strive Declarations
Strive.commands = new Map()

// Connect to Discord
Strive.connect()

module.exports = Strive
