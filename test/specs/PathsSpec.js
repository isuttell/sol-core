/* global beforeEach, describe, it, expect */

describe('Paths', function ()
{
    var Paths = require('../../lib/Paths');
    var mockSol;

    beforeEach(function(){
        mockSol = new SolHelper();
        mockSol.appPath = __dirname + '../mock';
    });

    it('should be a function', function ()
    {
        expect(typeof Paths).toBe('function');
    });

    it('should return a object', function(){
        var paths = new Paths(mockSol);
        expect(typeof paths).toBe('object');
    });

    it('should return a paths to main app directories', function(){
        var paths = new Paths(mockSol);
        expect(typeof paths.app).toBe('string');
        expect(typeof paths.config).toBe('string');
        expect(typeof paths.views).toBe('string');
        expect(typeof paths.api).toBe('string');
        expect(typeof paths.controllers).toBe('string');
        expect(typeof paths.models).toBe('string');
        expect(typeof paths.tmp).toBe('string');
    });

});
