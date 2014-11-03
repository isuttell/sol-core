/**
 * Express Router Middleware
 */
function Router(sol) {
  sol.log.silly('Setting up Router middleware');

  /**
   * Setup Router
   *
   * @type    {Router}
   */
  var router = new require('../Router')(sol);

  return router;
}

module.exports = Router;
