var _ = require('lodash');

/**
 * Express Session Middleware
 *
 * @param    {Sol}    sol    Sol Instance
 */
function Session(sol) {
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
    var RedisStore = require('connect-redis')(session);
    config.store = new RedisStore(config.redis);
  }

  return session(config);
}

module.exports = Session;
