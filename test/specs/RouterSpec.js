/* global beforeEach, describe, it, expect */

describe('Router', function ()
{
    var Router = require('../../lib/Router'),
        mockRoutes,
        mockControllers,
        mockSol;

    beforeEach(function(){
        mockRoutes = {
            'GET /' : 'IndexController.index',
            'GET /projects' : 'IndexController.projects',
            'ANY /status' : 'IndexController.index',
            'PUT /status' : 'IndexController.put'
        };

        mockControllers = {
            'IndexController': function() {
              return {
                  index: function (req, res) {
                      return res.send("index");
                  },
                  projects: function (req, res) {
                      return res.send("projects");
                  }
                };
              }
            };
        };

        mockSol = {
            config: {
                routes: mockRoutes
            },
            controllers: mockControllers
        };


    });

    it('should be a function', function ()
    {
        expect(typeof Router).toBe('function');
    });

    it('should return a function', function(){
        var router = new Router(mockSol);
        expect(typeof router).toBe('function');
    });

    describe('Route', function(){
        it('should be a function', function ()
        {
            expect(typeof Router.Route).toBe('function');
        });

        it('should parse router information', function(){
            var routeName = 'GET /',
                route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

            expect(route.route).toBe(routeName);
            expect(route.controller).toBe('IndexController');
            expect(typeof route.action).toBe('function');
            expect(route.uri).toBe('/');
            expect(route.verb).toBe('get');
            expect(route.isValid).toBe(true);
        });

        it('should default the verb to use if it finds an unrecognized method', function(){
            var routeName = 'ANY /status',
                route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

            expect(route.verb).toBe('use');
        });

        it('should return isValid as true if successful', function(){
            var routeName = 'GET /',
                route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

            expect(route.isValid).toBe(true);
        });

        it('should return isValid as false if there is no controller function', function(){
            var routeName = 'PUT /',
                route = new Router.Route(mockSol, routeName, mockRoutes[routeName]);

            expect(route.isValid).toBe(false);
        });
    });
});
