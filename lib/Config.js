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

  var dir = path.resolve(sol.paths.config);

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

  return _.extend(config, sol.config);
}

module.exports = Config;
