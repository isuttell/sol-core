/* global beforeEach, describe, it, expect */

describe('Router', function() {
  var Router = require('../../lib/Router');

  var mockRoutes,
    mockPolicies,
    mockControllers,
    mockSol;

  beforeEach(function() {
    mockSol = new SolHelper();

    mockRoutes = {
      'GET /': 'IndexController.index',
      'GET /projects': 'IndexController.projects',
      'ANY /status': 'IndexController.index',
      'PUT /status': 'IndexController.put',

      'BAD/route': 'IndexController.index',
      'BAD /controller': 'FakeControllerindex',
      'BAD /doesnotexist': 'FakeController.index'
    };

    mockPolicies = {
      'IndexController' : {
        index: function (req, res) {
          return true;
        }
      }
    };

    mockControllers = {
      'IndexController': function() {
        return {
          index: function(req, res) {
            return res.send("index");
          },
          projects: function(req, res) {
            return res.send("projects");
          }
        };
      }
    };

    mockSol.config = {
      routes: mockRoutes,
      policies: mockPolicies
    };

    mockSol.controllers = mockControllers;

  });

  it('should be a function', function() {
    expect(typeof Router).toBe('function');
  });

  it('should return an object with a list of routes and router function', function() {
    var router = new Router(mockSol);
    expect(typeof router).toBe('object');
    expect(typeof router.routes).toBe('object');
    expect(typeof router.router).toBe('function');
  });

  describe('Route', function() {
    it('should be a function', function() {
      expect(typeof Router.Route).toBe('function');
    });

    it('should parse router information', function() {
      var routeName = 'GET /',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.route).toBe(routeName);
      expect(route.controller).toBe('IndexController');
      expect(typeof route.action).toBe('function');
      expect(route.uri).toBe('/');
      expect(route.verb).toBe('get');
      expect(route.isValid).toBe(true);
    });

    it('should default the verb to use if it finds an unrecognized method', function() {
      var routeName = 'ANY /status',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.verb).toBe('use');
    });

    it('should return isValid as true if successful', function() {
      var routeName = 'GET /',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.isValid).toBe(true);
    });

    it('should return isValid as false if there is no controller function', function() {
      var routeName = 'PUT /status',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.isValid).toBe(false);
    });

    it('should return isValid as false if the path name is bad', function() {
      var routeName = 'BAD/route',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.isValid).toBe(false);
    });

    it('should return isValid if the controller synatx is wrong', function() {
      var routeName = 'BAD /controller',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.isValid).toBe(false);
    });

    it('should return isValid as false if the controller does not doesnotexist', function() {
      var routeName = 'BAD /doesnotexist',
        route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

      expect(route.isValid).toBe(false);
    });

  });
});
