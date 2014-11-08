/**
 * Config Factory
 */

/**
 * Dependencies
 */
var fs = require('fs');
var _ = require('lodash');
var path = require('path');

/**
 * Configu loader
 *
 * @param     {Object}    sol   Sol Instance
 *
 * @return    {Object}
 */
module.exports.load = function(sol, override) {
  var dir = path.resolve(sol.paths.config);

  if (typeof sol.env === 'undefined') {
    sol.env = 'production';
  }

  var config = {};
  var list = fs.readdirSync(dir);

  list.forEach(function(file) {
    // Only match js files
    file = file.match(/(.*)\.js|(env)/);
    if (file && file[0] === 'env') {
      config.env = require(dir + '/env/' + sol.env);
    } else if (file) {
      config[file[1]] = require(dir + '/' + file[1]);
    }

  });

  return _.defaults(override || {},  config);
};
