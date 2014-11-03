/**
 * Controllers setups up routers for Express
 */

/**
 * Dependencies
 */
var fs = require('fs');
var path = require('path');

/**
 * Loads any matching modules in a directory
 *
 * @param     {String}    dir    path to load from
 * @param     {String}    search (optional) search
 *
* @return    {Object}
 */
module.exports.loadModules = function(dir, search) {
  /**
   * Resolve any relative paths
   *
   * @type    {String}
   */
  dir = path.resolve(dir);

  /**
   * Interal collection of modules loaded
   *
   * @type    {Object}
   */
  var modules = {};

  /**
   * Get a list of items in a directory. This is synchronous since we're
   * only doing this once on application load
   *
   * @type    {Array}
   */
  var list = fs.readdirSync(dir);

  /**
   * The search suffic is optional
   */
  if (typeof search !== 'string') {
    search = '';
  }

  /**
   * Setup the Regex to filter out *.js files and optionall the {search}
   *
   * @type    {RegExp}
   */
  search = new RegExp('(.*' + search + ')\\.js');

  /**
   * Cycle through each item in the directory
   */
  list.forEach(function(module) {

    /**
     * Check to see if with have a match and if we split it apartment
     *
     * @type    {Array}
     */
    module = module.match(search);
    if (module) {
      /**
       * If we find a match try to load and save it. Otherwise log an error but
       * don't crash the application.
       */
      try {
        modules[module[1]] = require(dir + '/' + module[1]);
      } catch (err) {
        console.error('Unable to load ' + dir + '/' + module[1], err);
      }
    }
  });

  return modules;
};

/**
 * Match JS Comments
 *
 * @type    {RegExp}
 */
var jsComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

/**
 * Match function arguments
 *
 * @type    {RegExp}
 */
var functionArguments = /function.*\((.*)\)/;

/**
 * Extract Argument Names
 *
 * @param     {Function}    fn    function to get argument names of
 *
 * @return    {Array}
 */
module.exports.getArgNames = function(fn) {
  if (typeof fn !== 'function') {
    throw 'fn is not a function';
  }

  // Convert to string
  var fnString = fn.toString();

  // Strip comments
  fnString = fnString.replace(jsComments, '');

  // Find args
  var args = fnString.match(functionArguments);

  // Default result
  var params = [];

  // Split arguments into array
  if (args && args[1]) {
    params = args[1].split(',');
  }

  return params.map(function(arg) {
    return arg.trim(); // Trim extra space
  });
};
