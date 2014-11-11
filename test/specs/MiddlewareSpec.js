/* global beforeEach, describe, it, expect, xit */

describe('Middleware', function() {
  var mockSol;
  describe('Session', function() {
    var Session = require('../../lib/middleware/session');

    beforeEach(function() {
      mockSol = new SolHelper();

      mockSol.config = {
        session: {
          secret: 'change_this',

          cookie: {
            maxAge: 24 * 60 * 60 * 1000
          },

          resave: true,

          saveUninitialized: true,

          adapter: 'redis',

          redis: {
            host: 'localhost',
            port: 6379,
            ttl: 24 * 60 * 60,
            db: 0,
            pass: 'secret',
            prefix: 'sess:'
          }
        }
      };
    });

    it('should return a function', function() {
      var session = new Session(mockSol);
      expect(typeof session).toBe('function');
    });

    /**
     * How do we test this worked?
     */
    xit('should ', function() {
      mockSol.config.session.adapter = 'redis';
      mockSol.config.session.redis = {
        host: 'localhost',
        port: 6379,
        ttl: 24 * 60 * 60,
        db: 0,
        pass: 'secret',
        prefix: 'sess:'
      };
      // var session = new Session(mockSol);
    });
  });
});
