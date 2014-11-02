/**
 * Router setups up routers for Express
 */

/**
 * Dependencies
 */
var express = require('express');

// var util = require('../lib/utilities');

/**
 * Construct an Express Router
 *
 * @param  {Sol} sol main app instance
 *
 * @return {express.Router}
 */
function Router(sol) {
  var routesConfig = sol.config.routes;
  var router = express.Router();

  for (var route in routesConfig) {
    if (typeof routesConfig[route] === 'string') {
      route = new Route(sol, route, routesConfig[route]);

      if (route.isValid) {
        router[route.verb](  // Method
          route.uri,         // URI
          route.action       // Controller Function
        );
      }
    }
  }

  return router;
}

module.exports = Router;

/**
 * Parse router and controller information so we can bind to a controller
 *
 * @param    {Object}   sol          Sol instance
 * @param    {String}   route        string in the format of 'GET /project'
 * @param    {String}   controller   string in the format 'IndexController.home'
 */
function Route(sol, route, controller) {
  /**
   * Internal reference to list of controllers
   *
   * @type    {Object}
   */
  var controllers = sol.controllers;

  /**
   * Check to see if this is a valid route to pass to Express
   *
   * @type    {Boolean}
   */
  this.isValid = true;

  /**
   * Save the raw route string
   *
   * @type    {String}
   */
  this.route = route;

  /**
   * Get the name of the controller
   *
   * @type    {String}
   */
  try {
    controller = controller.split('.');
    this.controller = controller[0];
  } catch (error) {
    this.isValid = false;
    console.error(error, this);
  }

  /**
   * Get the name of the function in the controller
   *
   * @type    {String}
   */
  this.actionName = null;
  try {
    this.actionName = controller[1];
  } catch (error) {
    this.isValid = false;
    console.error(error, this);
  }

  /**
   * Look for a valid action in the controller
   *
   * @type    {function}
   */
  this.action = null;
  try {
    this.action = controllers[this.controller](sol)[this.actionName];
  } catch (error) {
    this.isValid = false;
    console.error(error, this);
  }
  if (typeof this.action !== 'function') {
    this.isValid = false;
    console.error('Controller is not a function', this);
  }

  /**
   * Grab the uri of the route
   *
   * @type    {String}
   */
  this.uri = null;
  try {
    route = route.split(' ');
    this.uri = route[1];
  } catch (error) {
    this.isValid = false;
    console.error(error, this);
  }

  /**
   * Get the method to use and fall back to use if we don't recognize anything
   *
   * @type    {String}
   */
  this.verb = null;
  try {
    this.verb = route[0].toLowerCase();
    if (!this.verb.match(/get|post|put|create|delete|head/i)) {
      this.verb = 'use';
    }
  } catch (error) {
    this.isValid = false;
    console.error(error, this);
  }
}

/**
 * Export Route so we can test it
 *
 * @type    {Function}
 */
module.exports.Route = Route;
