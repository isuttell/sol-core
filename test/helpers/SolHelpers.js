/**
 * Mock Sol Instance
 *
 * TODO
 * - Find a better way to implment that doesn't use global
 *
 * @return {Function}
 */
function mockSol() {
    this.log = {};
    this.log.silly = function(){};
    this.log.debug = function(){};
    this.log.verbose = function(){};
    this.log.info = function(){};
    this.log.warn = function(){};
    this.log.error = function(){};
}

global.mockSol = new mockSol();
