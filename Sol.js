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
var Log = require(__dirname + '/lib/Log');

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
   * Define an empty object if it's not supplied
   *
   * @type {Object}
   */
  if (typeof override === 'undefined') {
    override = {};
  }

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
  sol.config = _.defaults(
    override.config || {},
    Config.load(sol, process.env.NODE_ENV)
  );

  /**
   * Setup Logger
   * @type {Log}
   */
  sol.log = new Log(sol);

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
  var express = require('express');
  Http.listen(sol, express);
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
