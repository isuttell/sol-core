/**
 * Express BodyParserJson Middleware
 */
function BodyParserJson(sol) {
  /**
   * Reference to specific logger config
   *
   * @type    {Object}
   */
  var config = sol.config.http.middleware.json || {};

  /**
   * Express BodyParser
   *
   * https://github.com/expressjs/body-parser#bodyparserjsonoptions
   *
   * @type    {Body Parser}
   */
  var bodyParser = require('body-parser');

  return bodyParser.json(config);
}

module.exports = BodyParserJson;
