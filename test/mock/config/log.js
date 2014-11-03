/**
 * Log Settings
 *
 * Sol users Winston for logging
 *
 * https://github.com/flatiron/winston
 */

module.exports = {

  /**
   * Default logging level. Valid options include
   *
   * silly, debug, verbose, info, warn, error
   *
   * @type {String}
   */
  level: 'silly',

  /**
   * Winston Transports
   *
   * @type {Array}
   */
  transports: [

    /**
     * Console Transport
     */
    {
      transport: 'Console',
      enabled: true,
      options: {
        silent: true,
        level: 'silly',
        colorize: true,
        timestamp: false
      }
    },

    /**
     * File Transport
     */
     {
      transport: 'File',
      enabled: false,
      options: {
        silent: true,
        colorize: false,
        timestamp: true,
        filename: './logs/sol.log',
        maxsize: 1048576, // 1Mb
        maxFiles: 10
      }
    }
  ]

};
