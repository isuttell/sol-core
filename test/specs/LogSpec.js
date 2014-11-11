describe('Log', function() {
  var Sol, override;

  beforeEach(function() {
    Sol = require('../../Sol.js');

    override = {
      appPath: './test/mock/'
    };

    Sol.setup(override);
  });

  it('should be an object', function() {
    expect(typeof Sol.log).toBe('object');
  });

  it('should have functions for each log level', function(){
    expect(typeof Sol.log.silly).toBe('function');
    expect(typeof Sol.log.debug).toBe('function');
    expect(typeof Sol.log.verbose).toBe('function');
    expect(typeof Sol.log.info).toBe('function');
    expect(typeof Sol.log.warn).toBe('function');
    expect(typeof Sol.log.error).toBe('function');
  });

});
