var path = require('path');

/**
 * Location of critical app folders
 * @param  {Object} sol Sol instance
 */
module.exports = function Paths(sol) {
  this.app = sol.appPath;
  this.config = path.resolve(this.app + '/../config');
  this.views = path.resolve(this.app + '/../views');
  this.api = path.resolve(this.app + '/../api');
  this.load = path.resolve(this.app + '/load');
  this.controllers = path.resolve(this.api + '/controllers');
  this.models = path.resolve(this.api + '/models');
  this.tmp = path.resolve(this.app + '/../.tmp');
};
