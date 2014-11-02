/**
 * Http setups up Express
 */

/**
 * Dependencies
 */
var express = require('express');
var path = require('path');
var _ = require('lodash');

/**
 * Setup and listen
 *
 * @param     {Object}    sol    Sol instance
 *
 * @return    {Function}
 */
module.exports.listen = function(sol) {

  /**
   * Create Express instance and save it to Sol instance
   *
   * @type    {Express}
   */
  var app = sol.app = express();

  /**
   * Setup View System
   */
  app.set('views', path.resolve(sol.paths.views));
  app.set('view engine', sol.config.views.engine);

  /**
   * Setup Middleware
   *
   * Load order is defined in 'config/http.js'. First checks for modules in the
   * api path and then the app path.
   */
  _.each(sol.config.http.middleware.order, function(option) {
    try {
      app.use(new require(sol.paths.api + '/middleware/' + option)(sol));
    } catch (apiErr) {
      if (apiErr.code !== 'MODULE_NOT_FOUND') {
        /*
         * If the error is anything but a missing module then we need to log it
         */
        console.error('Unable to load ' + option + ' module', apiErr);
      } else {
        try {
          app.use(new require('./middleware/' + option)(sol));
        } catch (appErr) {
          console.error('Unable to load ' + option + ' module', appErr);
        }
      }
    }
  });

  /**
   * Setup ORM
   */
  var orm = require('./Orm');
  orm(sol, function(err, models) {
    if (err) {
      throw err;
    }
    app.models = models.collections;

    // Attach to Sol Instance
    for (var collection in models.collections) {
      if (models.collections.hasOwnProperty(collection)) {
        sol[collection] = models.collections[collection];
      }
    }

    app.connections = models.connections;

    /**
     * Start listening
     */
    app.listen(sol.config.env.port);
    console.log('Listening on ' + sol.config.env.port + ' at ' + new Date());
  });
};
