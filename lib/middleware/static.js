/**
 * Express Static Middleware
 */
function Static(sol) {
  sol.log.silly('Setting up static middleware');

  /**
   * Setup express Static
   *
   * @type    {Express}
   */
  var express = require('express');

  sol.log.silly('Setting static folder to %s', sol.paths.tmp + '/public');
  return express['static'](sol.paths.tmp + '/public');
}

module.exports = Static;
