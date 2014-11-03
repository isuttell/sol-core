/**
 * Express Logger Middleware
 */
function Logger(sol) {
  sol.log.silly('Setting up logging middleware');

  /**
   * Reference to specific logger config
   *
   * @type    {[type]}
   */
  var config = sol.config.http.middleware.logger;

  /**
   * Setup express Logger
   *
   * @type    {Morgan}
   */
  var logger = require('morgan');

  return logger(config.format);
}

module.exports = Logger;
