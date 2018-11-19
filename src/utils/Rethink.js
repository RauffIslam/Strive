// Node Modules
const r = require('rethinkdb')

// Config
const config = require('../priv/config.json')

// Logger
const logger = require('./logger')

// Connect to DB
r.connect(
  { host: config.db.host, port: config.db.port, db: 'Strive' },
  async (err, conn) => {
    if (err) logger.error(err)
    // Hack connection onto rethink so it can be used across files
    r.connection = conn
    logger.log('Connected to RethinkDB')
  }
)

module.exports = r
