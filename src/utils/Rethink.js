// Node Modules
const r = require('rethinkdb')

// Config
const config = require('../priv/config.json')

var connection
r.connect(
  { host: config.db.host, port: config.db.port, db: 'Strive' },
  async (err, conn) => {
    if (err) throw err
    connection = conn
    r.connection = conn
    console.log('Connected')
    r.tableList().run(connection, (err, res) => {
      if (err) throw err
      console.log(res)
    })
  }
)

module.exports = r
