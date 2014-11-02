/**
 * Express 404 Middleware
 */
function NotFound() {

  return function(req, res) {
    res.status(404).send('Page Not Found');
  };

}

module.exports = NotFound;
