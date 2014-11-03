/**
 * Models setups up routers for Express
 */

/**
 * External Modules
 */
var Waterline = require('waterline');

/**
 * Internal Modules
 */
var util = require('./utilities');

/**
 * Load and setup any models from a directory
 *
 * @param    {Object}    sol    Sol Instance
 */
function Models(sol) {
  sol.log.silly('Setting up models from ' + sol.paths.models);
  var models = util.loadModules(sol.paths.models, 'Model');

  for (var model in models) {
    if (models.hasOwnProperty(model)) {
      /**
       * Extend Waterline Collection
       */
      models[model] = Waterline.Collection.extend(models[model]);
      sol.log.silly('Loaded ' + model);
    }
  }

  return models;
}

module.exports = Models;
