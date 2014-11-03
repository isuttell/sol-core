/**
 * Todo
 * - Find a better way to test this module
 */

describe('Http', function() {
  var Http = require('../../lib/Http');

  var mockSol;

  /**
   * Mock Express JS
   */
  var mockExpress = function() {
    this.app = new MockExpressApp();
    return this.app;
  };

  var MockExpressApp = function() {
    this.config = {};
    var set = function(option, value) {
      this.config[option] = value;
    };
    this.set = set.bind(this);
    this.get = function() {};
    this.use = function() {};
    this.listen = function() {};
  };

  beforeEach(function() {
    mockSol = new SolHelper();

    mockSol.paths = {
      views: __dirname
    };

    mockSol.config.paths = {
      views: __dirname,
      middleware: __dirname,
      api: __dirname
    };

    mockSol.config.views = {
      engine: 'ejs'
    };

    mockSol.config.http = {
      middleware: {
        order: [
          'cookieParser',
          'session',
          'json',
          'compress',
          'logger',
          'router',
          'static',
          '404',
          '500',
          'fakeMiddleware'
        ]
      }
    };
    Http.listen(mockSol, mockExpress);
  });

  it('should be a object with a listen function', function() {
    expect(typeof Http).toBe('object');
    expect(typeof Http.listen).toBe('function');
  });
});
