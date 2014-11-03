/* global beforeEach, describe, it, expect */

describe('Config', function ()
{
    var Config = require('../../lib/Config'),
        mockConfigDir = './test/mock/config',
        configs,
        mockSol;

    beforeEach(function() {
      mockSol = new SolHelper();

      // Reset
      mockSol.paths = {
          config: mockConfigDir
      };
      configs = Config.load(mockSol);
    });

    describe('load', function(){
        it('should be a function', function ()
        {
            expect(typeof Config.load).toBe('function');
        });

        it('should return a object of Config objects', function(){
            expect(typeof configs).toBe('object');
            for(var config in configs) {
                if(configs.hasOwnProperty(config)) {
                    expect(typeof configs[config]).toBe('object');
                }
            }
        });

        it('should return only read files that end with \'.js\'', function(){
            expect(configs.size()).toBe(7);
        });
    });
});
