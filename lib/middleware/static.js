/**
 * Express Static Middleware
 */
function Static(sol) {
  /**
   * Setup express Static
   *
   * @type    {Express}
   */
  var express = require('express');

  return express['static'](sol.paths.tmp + '/public');
}

module.exports = Static;
