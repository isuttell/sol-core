/**
 * Setup ORM
 */

/**
 * External Modules
 */
var Waterline = require('waterline');

/**
 * Setup the ORM
 *
 * @param    {Object}      sol         Sol Instance
 * @param    {Function}    callback
 */
function Orm(sol, callback) {
  sol.log.silly('Setting up ORM');

  /**
   * Start with an empty config and build from there
   *
   * @type    {Object}
   */
  var config = {};

  /**
   * Load Adapters
   *
   * @type    {Object}
   */
  config.adapters = {};

  /**
   * Load Connections
   *
   * @type    {Object}
   */
  config.connections = {};

  for (var connection in sol.config.connections) {
    if (sol.config.connections.hasOwnProperty(connection)) {
      var adapter =  sol.config.connections[connection].adapter;
      config.adapters[connection] = require(adapter);

      config.connections[connection] =  sol.config.connections[connection];
      config.connections[connection].adapter = connection;

      sol.log.silly('Loaded ORM connection ' + connection);
    }
  }

  config.defaults = {
    migrate: 'safe'
  };

  /**
   * Create Watelerine instance
   *
   * @type    {Waterline}
   */
  var orm = new Waterline();

  /**
   * Load Collections into IRM
   */
  for (var model in sol.models) {
    if (sol.models.hasOwnProperty(model)) {
      orm.loadCollection(sol.models[model]);
      sol.log.silly('Loaded ORM model %s', model);
    }
  }

  /**
   * Inititalize Waterline
   */
  orm.initialize(config, callback);
}

module.exports = Orm;
