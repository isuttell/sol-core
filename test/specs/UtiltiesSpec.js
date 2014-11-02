/* global describe, it, expect, beforeEach */

describe('utility', function() {
  var utilities = require('../../lib/utilities'),
    mockControllerDir = './test/mock/controllers';

  describe('loadModules', function() {
    it('should be a function', function() {
      expect(typeof utilities.loadModules).toBe('function');
    });

    it('should return a object', function() {
      var modules = utilities.loadModules(mockControllerDir);
      expect(typeof modules).toBe('object');
    });

    it('should return only read files that end with \'.js\'', function() {
      var module = utilities.loadModules(mockControllerDir),
        moduleLength = 0;

      // Count them up
      for (var controller in module) {
        if (module.hasOwnProperty(controller)) {
          moduleLength++;
        }
      }
      expect(moduleLength).toBe(2);
    });

    it('should limit modules included by an optional suffix', function() {
      var module = utilities.loadModules(mockControllerDir, 'Controller'),
        moduleLength = 0;

      // Count them up
      for (var controller in module) {
        if (module.hasOwnProperty(controller)) {
          moduleLength++;
        }
      }
      expect(moduleLength).toBe(1);
    });
  });

  describe('getArgNames', function() {
    var mockFunction,
        mockEmptyFunction,
        mockNamedFunction,
        mockSpacedFunction;

    beforeEach(function(){
      mockFunction = function(req, res, User) { return User; };
      mockEmptyFunction = function() { return; };
      mockNamedFunction = function Named(req, res, User) { return User; };
      mockSpacedFunction = function (req,      res ,User) { return User; };
    });

    it('should be a function and return an array', function() {
      expect(typeof utilities.getArgNames).toBe('function');
      expect(utilities.getArgNames(mockFunction) instanceof Array).toBe(true);
    });

    it('should return the names of the function arguments', function() {
      expect(utilities.getArgNames(mockFunction)).toEqual(['req', 'res', 'User']);
      expect(utilities.getArgNames(mockNamedFunction)).toEqual(['req', 'res', 'User']);
      expect(utilities.getArgNames(mockSpacedFunction)).toEqual(['req', 'res', 'User']);
      expect(utilities.getArgNames(mockEmptyFunction)).toEqual([]);
    });

    it('should throw an error if the input is not an function', function() {
      var error;
      try {
        error = false;
        utilities.getArgNames({});
      } catch (e) {
        error = true;
      }
      expect(error).toBe(true);
    });

  });

});
