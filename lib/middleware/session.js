var _ = require('lodash');

/**
 * Express Session Middleware
 *
 * @param    {Sol}    sol    Sol Instance
 */
function Session(sol) {
  sol.log.silly('Setting up session middleware');
  /**
   * Setup express Session
   *
   * @type    {Express Session}
   */
  var session = require('express-session');

  /**
   * Create internal copy of sessions
   *
   * @type    {Object}
   */
  var config = _.clone(sol.config.session, true);

  /**
   * Setup Store for various adapters
   */
  if (typeof config.adapter === 'string' && config.adapter === 'redis') {
    sol.log.silly('Setting up Redis as the session store');
    var RedisStore = require('connect-redis')(session);
    config.store = new RedisStore(config.redis);
  }

  return session(config);
}

module.exports = Session;
