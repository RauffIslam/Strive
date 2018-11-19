// Config File
const config = require('../priv/config.json')

module.exports = {
  func: async (msg, Strive, logger, db) => {
    try {
      var user = {}
      await db
        .table('users')
        .get(msg.author.id)
        .run(db.connection, async (err, res) => {
          if (err) logger.error(err)
          if (!res) {
            db.table('users')
              .insert({
                uid: msg.author.id,
                blacklisted: false
              })
              .run(db.connection, async (err, res) => {
                if (err) logger.error(err)
                logger.info('Created User')
                user.blacklisted = res.blacklisted
              })
          } else {
            user.blacklisted = res.blacklisted
          }
        })
      if (!user.blacklisted) {
        if (msg.content.startsWith(config.prefix)) {
          try {
            var name = msg.content.split(' ')[0].slice(2)
            // var cmd = require(`../cmds/${file}`)
            var argsArr = msg.content.split(' ')
            argsArr.shift()
            var args = argsArr
            if (Strive.commands.has(name)) {
              var cmd = Strive.commands.get(name)
              cmd(msg, args, Strive, logger, db)
            }
          } catch (err) {
            logger.error(err)
          }
        }
      }
    } catch (err) {
      logger.error(err)
    }
  },
  name: 'messageCreate'
}
