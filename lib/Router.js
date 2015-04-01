/**
 * Router setups up routers for Express
 */

/**
 * Dependencies
 */
var express = require('express');
var _ = require('lodash');

/**
 * Takes a string in the form of of 'IndexController.action' and returns
 * the controller name and action name
 *
 * @param     {String}    string    Controller string split by '.'
 *
 * @return    {String || false}
 */
function parseController(string) {
  // Split in two
  string = string.split('.');

  if (!string || (string && string.length !== 2)) {
    return false;
  }

  return {
    name: string[0],
    action: string[1]
  };
}

/**
 * Parse a route stirng in the form of `VERB /uri`
 *
 * @param     {String}    string    String to parse
 *
 * @return    {Object || false}
 */
function parseRoute(string) {
  string = string.split(' ');

  if (!string || (string && string.length !== 2)) {
    return false;
  }

  string[0] = string[0].toLowerCase();
  if (!string[0].match(/get|post|put|create|delete|head/)) {
    string[0] = 'use';
  }

  return {
    uri: string[1],
    verb: string[0]
  };
}

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

  /**
   * Get the name of the function in the controller
   *
   * @type    {String}
   */
  this.actionName = null;

  /**
   * Look for a valid action in the controller
   *
   * @type    {function}
   */
  this.action = null;

  /**
   * Grab the uri of the route
   *
   * @type    {String}
   */
  this.uri = null;

  /**
   * Get the method to use and fall back to use if we don't recognize anything
   *
   * @type    {String}
   */
  this.verb = null;

  /**
   * Split the controller string into parts
   *
   * @type    {Object}
   */
  controller = parseController(controller);

  if (controller === false) {
    this.isValid = false;
    return;
  }

  this.controller = controller.name;
  this.actionName = controller.action;

  /**
   * Try to see if the action is actually a function
   */
  try {
    this.action = controllers[this.controller](sol)[this.actionName];
  } catch (error) {
    this.isValid = false;
    return;
  }
  if (typeof this.action !== 'function') {
    this.isValid = false;
    return;
  }

  /**
   * Parse the Route method and Path
   *
   * @type    {Object}
   */
  route = parseRoute(route);
  if (route === false) {
    this.isValid = false;
    return;
  }

  this.verb = route.verb;
  this.uri = route.uri;

  /**
   * Route Policies
   *
   * @type    {Object}
   */
  this.policies = null;

  // Check to see if a policy is attached to this route
  if (_.isObject(sol.config.policies[this.controller])) {

    // Save a reference to the policies so we can access it in the middleware
    this.policies = sol.config.policies[this.controller][this.actionName];

    if (_.isString(this.policies)) {
      this.policies = [this.policies];
    }
  }
}

/**
 * Construct an Express Router
 *
 * @param  {Sol} sol main app instance
 *
 * @return {express.Router}
 */
function Router(sol) {
  sol.log.silly('Loading Router');

  var routesConfig = sol.config.routes;
  this.router = express.Router();
  this.routes = [];

  for (var route in routesConfig) {
    if (typeof routesConfig[route] === 'string') {
      route = new Route(sol, route, routesConfig[route]);

      if (route.isValid) {
        // Save a list
        this.routes.push(route);

        // Setup express route
        this.router[route.verb](// Method
          route.uri,         // URI
          route.action       // Controller Function
        );

        sol.log.silly('Loaded Route %s : %s.%s',
          route.route, route.controller, route.actionName);
      } else {
        sol.log.error('Route ' + route + ' is inValid', route);
      }
    }
  }

  return this;
}

/**
 * Export Router
 *
 * @type    {Router}
 */
module.exports = Router;

/**
 * Export Route so we can test it
 *
 * @type    {Function}
 */
module.exports.Route = Route;
