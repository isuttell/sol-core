/**
 * HTTP Server Settings
 */

module.exports = {

  middleware: {

    /**
     * Loads the middleware below in the following order
     *
     * @type    {Array}
     */
    order: [
      'cookieParser',
      'session',
      'json',
      'compress',
      'logger',
      'router',
      'static',
      '404',
      '500'
    ],

    /**
     * Express Morgan Options
     *
     * https://github.com/expressjs/morgan
     *
     * @type    {Object}
     */
    logger: {
      format: 'dev',
      options: {}
    },

    /**
     * Compression Configuration Options
     *
     * https://github.com/expressjs/compression#compressionoptions
     *
     * @type    {Object}
     */
    compress: {
      threshold: 1024
    },

    /**
     * Body Parser Json Configuation Options
     *
     *  https://github.com/expressjs/body-parser#bodyparserjsonoptions
     *
     * @type    {Object}
     */
    json: {
      strict: true
    }
  }

};
