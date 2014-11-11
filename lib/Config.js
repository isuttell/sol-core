/**
 * Config Factory
 */

/**
 * Dependencies
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

/**
 * Configu loader
 *
 * @param     {Object}    sol   Sol Instance
 *
 * @return    {Object}
 */
function Config(sol) {
  if (typeof sol.env === 'undefined') {
    sol.env = 'production';
  }

  // Load Base Config
  var config = loadDir(sol.paths.config);

  // Load any environment specific config
  var env = loadDir(sol.paths.config + '/' + sol.env);

  // Merge everything together
  return _.extend(config, env, sol.config);
}

/**
 * Loads *.js files from dir into an object
 *
 * @param  {String} dir directory to search
 *
 * @return {Object}
 */
function loadDir(dir) {
  // Resolve any relative paths
  dir = path.resolve(dir);

  // Start empty
  var config = {};

  // Does the directory exist?
  if (!fs.existsSync(dir)) { return config; }

  // Read the dir
  var list = fs.readdirSync(dir);

  list.forEach(function(file) {
    // Only load js files
    file = file.match(/(.*)\.js/);
    if (file) {
      config[file[1]] = require(dir + '/' + file[1]);
    }
  });

  return config;
}

/**
 * Expose Config
 *
 * @type {Function}
 */
module.exports = Config;

/**
 * Expose so we can test
 *
 * @type {Function}
 */
module.exports.loadDir = loadDir;
