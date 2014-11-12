/**
 * Express Router Middleware
 */
function Router(sol) {
  sol.log.silly('Setting up Router middleware');

  return sol.routes.router;
}

module.exports = Router;
