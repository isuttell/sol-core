/**
 * Express 500 Middleware
 */
function ServerError() {

  return function(req, res) {
    res.status(500).send('Internal Server Error');
  };

}

module.exports = ServerError;
