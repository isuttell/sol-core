/**
 * Express 404 Middleware
 */
function NotFound(sol) {
  sol.log.silly('Setting up 404 middleware');

  return function(req, res) {
    res.status(404).send('Page Not Found');
  };

}

module.exports = NotFound;
