/**
 * Sol loader
 */

/**
 * Third Party Modules
 */
var _ = require('lodash');

/**
 * Internal Modules
 */
var Controllers = require('./lib/Controllers');
var Models = require('./lib/Models');
var Config = require('./lib/Config');
var Http = require('./lib/Http');
var Paths = require('./lib/Paths');

/**
 * Sol Contstructor
 */
function Sol() {
  this.appPath = __dirname;
}

/**
 * Load any configuration
 *
 * @param  {Object} overrideConfig optional configuration overide
 */
Sol.prototype.run = function(overrideConfig) {
  /**
   * Interal reference for semantics
   *
   * @type    {this}
   */
  var sol = this;

  /**
   * Load Application Absolute Paths
   * @type {Paths}
   */
  sol.paths = new Paths(sol);

  /**
   * Optional override for testing
   */
  if (typeof overrideConfig === 'undefined') {
    overrideConfig = {};
  }

  /**
   * Extra Config from config directory
   *
   * @type    {Object}
   */
  sol.config = _.extend(
    overrideConfig,
    Config.load(sol)
  );

  /**
   * Load controllers directory
   *
   * @type    {Object}
   */
  sol.controllers = new Controllers(sol);

  /**
   * Load models directory
   *
   * @type    {Object}
   */
  sol.models = new Models(sol);

  /**
   * Start Express
   */
  Http.listen(sol);

};

/**
 * Default create new app instance
 *
 * @type    {Sol}
 */
module.exports = new Sol();

/**
 * Expose Constructor
 *
 * @type    {Function}
 */
module.exports.Sol = Sol;
