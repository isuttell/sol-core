/**
 * External Dependencies
 */
var winston = require('winston');

/**
 * Setup Sol Logger
 *
 * @param     {Object}     sol instance
 */
function Log(sol) {
  /**
   * Winstan Tranports
   *
   * @type {Array}
   */
  var transports = [];

  for (var i = 0; i < sol.config.log.transports.length; i++) {
    /**
     * Local reference to app config
     *
     * @type {Object}
     */
    var config = sol.config.log.transports[i];

    /**
     * Set Default logging level
     */
    if (typeof config.level !== 'string') {
      config.level = sol.config.log.level;
    }

    /**
     * If the transport is enabled create it
     *
     * @type {Winston Transport}
     */
    if (true === config.enabled) {
      var transport = new(winston.transports[config.transport])(config.options);

      transports.push(transport);
    }
  }

  return new winston.Logger({
    transports: transports
  });
}

module.exports = Log;
