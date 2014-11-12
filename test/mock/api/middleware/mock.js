/**
 * Mock Middleware
 */
function Mock() {
  return function(req, res, next) {
    next();
  };
}

module.exports = Mock;
