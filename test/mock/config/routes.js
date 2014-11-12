/**
 * Route Mappings
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sol receives a URL that doesn't match any of the routes below,
 * it will check for matching files (img, js, css, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/img/foo.jpg`
 * might match an image file: `/assets/img/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 */

module.exports = {

  'GET /' : 'IndexController.index'

};
