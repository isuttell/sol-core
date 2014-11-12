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
var Router = require(__dirname + '/lib/Router');
var Policies = require(__dirname + '/lib/Policies');
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

  this.env = process.env.NODE_ENV;

  this.port = process.env.PORT;
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
  var sol = _.extend(this, override);

  /**
   * Load Application Absolute Paths
   * @type {Paths}
   */
  sol.paths = new Paths(sol);

  /**
   * Extra Config from config directory
   *
   * @type    {Object}
   */
  sol.config = new Config(sol);

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
  sol.controllers = new Controllers(sol);

  /**
   * Load models directory
   *
   * @type    {Object}
   */
  sol.models = new Models(sol);

  /**
   * Load policies
   *
   * @type    {Object}
   */
  sol.policies = new Policies(sol);

  /**
   * Load routes
   *
   * @type    {Routes}
   */
  sol.routes = new Router(sol);
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
