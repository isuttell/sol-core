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
      configs = new Config(mockSol);
    });

    it('should be a function', function ()
    {
        expect(typeof Config).toBe('function');
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
        expect(configs.size()).toBe(8);
    });

    it('should ignore directories that do not exist', function(){
        mockSol.env = 'fake';
        var fakeConfigs = new Config(mockSol);
        expect(fakeConfigs.app.port).toBe(3001);
    });

    it('should override settings from the env folder', function() {
        mockSol.env = 'production';
        configs = new Config(mockSol);

        expect(configs.app.port).toBe(80);
    });

});
