/**
 * Controllers setups up routers for Express
 */

/**
 * External Dependencies
 */
var _ = require('lodash');

/**
 * Internal Dependencies
 */
var util = require('./utilities');

/**
 * Loads any controllers in a directory
 *
 * @param     {Object}    sol    Sol instance
 *
* @return    {Object}
 */
function Controllers(sol) {
  sol.log.silly('Setting up controllers from ' + sol.paths.controllers);

  // If controllers are already loaded then just return them
  if (sol.controllers) {
    return sol.controllers;
  }

  // Load everything form the controllers directory
  var controllers = util.loadModules(sol.paths.controllers, 'Controller');

  for (var name in controllers) {
    if (controllers.hasOwnProperty(name)) {

      /**
       * Pass Sol to the controller and get an object of actions back
       *
       * @type    {Object}
       */
      var controller = controllers[name](sol);
      sol.log.silly('Loaded ' + name);

      /**
       * Bind sol instance to this context for each action
       */
      for (var action in controller) {
        if (controller.hasOwnProperty(action) &&
            _.isFunction(controller[action])) {
          controller[action] = _.bind(controller[action], this);
        }
      }
    }
  }

  return controllers;
}

module.exports = Controllers;
