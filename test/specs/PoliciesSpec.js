describe('Policies', function() {
  var mockSol, PolicyMiddleware, middleware;

  var Config = require('../../lib/Config');
  var Policies = require('../../lib/Policies');
  var Router = require('../../lib/Router');
  var Paths = require('../../lib/Paths');
  var Controllers = require('../../lib/Controllers');

  describe('middleware', function() {

    beforeEach(function() {
      mockSol = new SolHelper();
      PolicyMiddleware = require('../../lib/middleware/policies');

      mockSol.appPath = './test/mock';
      mockSol.paths = new Paths(mockSol);
      mockSol.config = new Config(mockSol);

      mockSol.controllers = new Controllers(mockSol);
      mockSol.policies = new Policies(mockSol);
      mockSol.routes = new Router(mockSol);

      middleware = new PolicyMiddleware(mockSol);
    });

    it('should return a function', function() {
      expect(typeof middleware).toBe('function');
    });

    it('should call the next function by default', function() {
      var next = jasmine.createSpy();

      var mockReq = {
        originalUrl: '/'
      };
      var mockRes = {};

      middleware.call(mockSol, mockReq, mockRes, next);
      expect(next).toHaveBeenCalled();
    });

    it('should call a policy from the api folder', function() {
      var mockReq = {
        originalUrl: '/'
      };
      var mockRes = {};

      spyOn(mockSol.policies, 'AuthPolicy');
      middleware.call(mockSol, mockReq, mockRes, function() {});
      expect(mockSol.policies.AuthPolicy).toHaveBeenCalled();
    });

    it('should skip if a route is not found', function() {
      var mockReq = {
        originalUrl: '/fake'
      };
      var mockRes = {
        send: function() {}
      };

      spyOn(mockSol.policies, 'AuthPolicy');
      middleware.call(mockSol, mockReq, mockRes, function() {});
      expect(mockSol.policies.AuthPolicy).not.toHaveBeenCalled();
    });

    it('should convert a string to an array in the config', function() {
      var mockReq = {
        originalUrl: '/project'
      };
      var mockRes = {
        send: function() {}
      };

      spyOn(mockSol.policies, 'AuthPolicy');
      middleware.call(mockSol, mockReq, mockRes, function() {});
      expect(mockSol.policies.AuthPolicy).not.toHaveBeenCalled();
    });
  });

});
