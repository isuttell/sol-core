/* global beforeEach, describe, it, expect */

describe('Controllers', function() {
  var Controllers = require('../../lib/Controllers'),
    mockControllerDir = './test/mock/controllers',
    mockSol;

  beforeEach(function() {
    // Reset
    mockSol = {
      paths: {
        controllers: mockControllerDir
      }
    };
  });

  it('should be a function and return and object', function() {
    expect(typeof Controllers).toBe('function');
    expect(typeof new Controllers(mockSol)).toBe('object');
  });

  it('should return a object of Controller function', function() {
    var controllers = new Controllers(mockSol);
    expect(typeof controllers).toBe('object');
    for (var controller in controllers) {
      expect(typeof controllers[controller]).toBe('function');
    }
  });

  it('should return only read files that end with \'Controller.js\'', function() {
    var controllers = new Controllers(mockSol),
      controllersLength = 0;


    // Count them up
    for (var controller in controllers) {
      if (typeof controllers[controller] === 'function') {
        controllersLength++;
      }
    }
    expect(controllersLength).toBe(1);

  });
});