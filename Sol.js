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
var Controllers = require(__dirname + '/lib/Controllers');
var Models = require(__dirname + '/lib/Models');
var Config = require(__dirname + '/lib/Config');
var Http = require(__dirname + '/lib/Http');
var Paths = require(__dirname + '/lib/Paths');

/**
 * Sol Contstructor
 */
function Sol() {
  /**
   * Save the current working directory so we always know where we are
   *
   * @type {String}
   */
  this.appPath = process.cwd();
}

/**
 * Load any configuration
 *
 * @param  {Object} override (optional) configuration overide
 */
Sol.prototype.setup = function(override) {
  /**
   * If sol is given then we override exisiting options
   * otherwise we reference this. This is used mostly
   * for testing
   *
   * @type    {this}
   */
  var sol = this;

  /**
   * Load Application Absolute Paths
   * @type {Paths}
   */
  sol.paths = override.paths || new Paths(sol);

  /**
   * Extra Config from config directory
   *
   * @type    {Object}
   */
  sol.config = _.extend(
    override.config || {},
    Config.load(sol)
  );

  /**
   * Load controllers directory
   *
   * @type    {Object}
   */
  sol.controllers = override.controllers || new Controllers(sol);

  /**
   * Load models directory
   *
   * @type    {Object}
   */
  sol.models = override.models || new Models(sol);

  /**
   * Return this for chaining
   */
  return this;
};

/**
 * Start listening
 *
 * @param     {Sol}    sol    sol instance
 */
Sol.prototype.listen = function(sol) {
  /**
   * Takes a sol instance or uses this for chaining
   * @type {Sol}
   */
  sol = sol || this;

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
