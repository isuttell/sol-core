/**
 * Express Compress Middleware
 */
function Compress(sol) {
  sol.log.silly('Setting up compression middleware');

  /**
   * Reference to specific logger config
   *
   * @type    {[type]}
   */
  var config = sol.config.http.middleware.compress;

  /**
   * Express Compression
   *
   * https://github.com/expressjs/compression
   *
   * @type    {Compression}
   */
  var compression = require('compression');

  return compression(config);
}

module.exports = Compress;
