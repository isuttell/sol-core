/**
 * Sol loader
 */

/**
 * Third Party Modules
 */
// var _ = require('lodash');

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
 * @param  {Object} options (optional) configuration overide
 */
Sol.prototype.setup = function(options) {
  /**
   * Internal reference to this for semantics
   *
   * @type    {this}
   */
  var sol = this;

  /**
   * Ensure options is set
   *
   */
  options = options || {};

  /**
   * Pull the enviroment from the process and save it to the instance
   * so we can access it throughout the pap
   *
   * @type    {String}
   */
  sol.env = options.env || process.env.NODE_ENV;

  /**
   * Load Application Absolute Paths
   * @type {Paths}
   */
  sol.paths = options.paths || new Paths(sol, options);

  /**
   * Extra Config from config directory
   *
   * @type    {Object}
   */
  sol.config = options.config || Config.load(sol, options);

  /**
   * Setup Logger
   * @type {Log}
   */
  sol.log = new Log(sol, options);

  /**
   * Load controllers directory
   *
   * @type    {Object}
   */
  sol.controllers = new Controllers(sol, options);

  /**
   * Load models directory
   *
   * @type    {Object}
   */
  sol.models =  new Models(sol, options);

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
