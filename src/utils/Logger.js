'use strict'

const EventEmitter = require('events')

/**
 * Logger Framework
 */

class Logger extends EventEmitter {
  /**
   * @arg {Object} [Options] Logger options
   * @arg {Boolean} [Options.colored=True]
   */

  constructor (Options) {
    super()

    if (Options) {
      this.colored = Options.colored
    } else {
      this.colored = true
    }
  }

  /**
   * Log to Console
   * @arg {Object} [Log] Log Object
   * @arg {String} [Log.type='normal'] Type of log
   * @arg {String} [Log.message] Message to log
   * @arg {String} [Log.color='green'] Color of the message
   */

  LogToConsole (Log) {
    if (typeof Log !== 'object') {
      throw new Error('Incorrect Log Format')
    } else {
      console.log(`${Log.type}: ${Log.message}`)
    }
  }

  /**
   * Log to Discord
   * @arg {Client} [Strive] Client
   * @arg {Object} [Log] Log
   * @arg {String} [Log.location] Channel id for the log to go to
   * @arg {String} [Log.type='normal'] Type of log
   * @arg {String} [Log.message] Message to log
   * @arg {String} [Log.color='green'] Color of the message
   */

  LogToDiscord (Strive, Log) {
    if (typeof Log !== 'object') {
      throw new Error('Incorrect Log Format')
    } else {
      Strive.createMessage(Log.location, {
        embed: {
          title: `${Log.type} Log`,
          description: `\`\`\`js\n${Log.message}\`\`\``,
          author: {
            name: Strive.user.username,
            icon_url: Strive.user.avatarURL
          },
          color: 0x36393E
        }
      })
    }
  }
}

module.exports = Logger
