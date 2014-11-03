describe('Sol', function() {
  var Sol, override;

  beforeEach(function() {
    Sol = require('../../Sol.js');

    override = {
      paths: {
        app: './test/mock/',
        config: './test/mock/config',
        views: './test/mock/views',
        tmp: './test/mock/.tmp',
        api: './test/mock/api',
        controllers: './test/mock/controllers',
        models: './test/mock/models'
      }
    };

    Sol.setup(override);
  });

  it('should return an instance of itself', function() {
    expect(Sol instanceof Sol.Sol).toBe(true);
  });

  it('should have a \'setup\' function', function() {
    expect(typeof Sol.setup).toBe('function');
  });

  it('should have a \'listen\' function', function() {
    expect(typeof Sol.listen).toBe('function');
  });


  describe('controllers', function() {
    it('should be an object of controllers', function() {
        expect(typeof Sol.controllers).toBe('object');
        expect(Sol.controllers.size()).toBe(1);
    });
  });

});