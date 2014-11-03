/**
 * Express 500 Middleware
 */
function ServerError(sol) {
  sol.log.silly('Setting up 500 middleware');

  return function(req, res) {
    res.status(500).send('Internal Server Error');
  };

}

module.exports = ServerError;
