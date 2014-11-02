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
  var controllers = util.loadModules(sol.paths.controllers, 'Controller');

  for (var name in controllers) {
    if (controllers.hasOwnProperty(name)) {

      /**
       * Pass Sol to the controller and get an object of actions back
       *
       * @type    {Object}
       */
      var controller = controllers[name](sol);

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
