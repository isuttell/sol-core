/**
 * Policy Middle Ware
 */

/**
 * External Deps
 */
var _ = require('lodash');

/**
 * Find the current Route
 *
 * @param     {String}    uri       req.originalUrl
 * @param     {Array}     routes    An array of loaded routes
 *
 * @return    {Object}
 */
function findRoute(uri, routes) {
  var index = -1;
  var length = routes ? routes.length : 0;

  while (++index < length) {
    var route = routes[index];
    // Match
    if (route.uri === uri) {
      return route;
    }
  }
  return false;
}

/**
 * Policy Middleware
 */
function PolicyMiddleware(sol) {
  sol.log.silly('Setting up policy middleware');

  return function(req, res, next) {
    /**
     * Look for the route
     *
     * @type    {Object}
     */
    var route = findRoute(req.originalUrl, sol.routes.routes);

    /**
     * If we can not find the route, skip
     */
    if (!route) { return next(); }

    /**
     * Default: no policies
     */
    if (!route.policies) { return next(); }

    /**
     * Call all policies
     */
    var policies = route.policies;
    var policyIndex = -1;
    var policyLength = policies ? policies.length : 0;

    while (++policyIndex < policyLength) {
      var policy = sol.policies[policies[policyIndex]];
      if (_.isFunction(policy)) {
        policy.call(sol, req, res, next);
      }
    }

  };

}

module.exports = PolicyMiddleware;
