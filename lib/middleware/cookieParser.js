/**
 * Express CookieParser Middleware
 */
function CookieParser(sol) {
  sol.log.silly('Setting up CookieParser middleware');

  /**
   * Reference to specific logger config
   *
   * @type    {Object}
   */
  var config = sol.config.http.middleware.cookieParser || {};

  /**
   * Reference to session config
   *
   * @type    {Object}
   */
  var session = sol.config.session;

  /**
   * Express CookieParser
   *
   * https://github.com/expressjs/compression
   *
   * @type    {Cookie Parser}
   */
  var cookieParser = require('cookie-parser');

  return cookieParser(session.secret, config);
}

module.exports = CookieParser;
