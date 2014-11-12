/**
 * Policies
 */

/**
 * External Dependencies
 */
// var _ = require('lodash');

/**
 * Internal Dependencies
 */
var util = require('./utilities');

/**
 * Loads any policies in a directory
 *
 * @param     {Object}    sol    Sol instance
 *
* @return    {Object}
 */
function Policies(sol) {
  sol.log.silly('Setting up policies from ' + sol.paths.policies);

  // If policies are already loaded then just return them
  if (sol.policies) {
    return sol.policies;
  }

  // Load everything form the policies directory
  var policies = util.loadModules(sol.paths.policies, 'Policy');

  return policies;
}

module.exports = Policies;
