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
      console.log(route);
      if (route.isValid) {
  //       router[route.verb](  // Method
  //         route.uri,         // URI
  //         route.action       // Controller Function
  //       );
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
  this.controller = null;

  controller = controller.split('.');
  if (controller && controller.length === 2) {
    this.controller = controller[0];
  } else {
    this.isValid = false;
  }

  /**
   * Get the name of the function in the controller
   *
   * @type    {String}
   */
  this.actionName = null;
  if (controller && controller.length === 2) {
    this.actionName = controller[1];
  } else {
    this.isValid = false;
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
  }
  if (typeof this.action !== 'function') {
    this.isValid = false;
  }

  /**
   * Grab the uri of the route
   *
   * @type    {String}
   */
  this.uri = null;

  route = route.split(' ');
  if (route && route.length === 2) {
    this.uri = route[1];
  } else {
    this.isValid = false;
  }

  /**
   * Get the method to use and fall back to use if we don't recognize anything
   *
   * @type    {String}
   */
  this.verb = null;
  if (route && route.length === 2) {
    this.verb = route[0].toLowerCase();
    if (!this.verb.match(/get|post|put|create|delete|head/i)) {
      this.verb = 'use';
    }
  } else {
    this.isValid = false;
  }
}

/**
 * Export Route so we can test it
 *
 * @type    {Function}
 */
module.exports.Route = Route;
