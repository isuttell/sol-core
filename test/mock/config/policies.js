/**
 * Policy Mappings
 */

module.exports = {

  'IndexController' : {
    index : ['AuthPolicy'],
    projects: 'AuthPolicy'
  }

};
