/**
 * Jasmine Node Unit Testing
 *
 * ---------------------------------------------------------------
 *
 * # default task config
 * Run Unit Tests
 *
 *
 * For usage docs see:
 *      https://github.com/jasmine-contrib/grunt-jasmine-node
 */
module.exports = function(grunt) {

  grunt.config.set('jasmine_node', {
    coverage: {
      savePath: './test/coverage',
      excludes: ['test/**/*.js']
    },
    useHelpers: true,
    options: {
      forceExit: true,
      match: '.',
      matchall: false,
      extensions: 'js',
      specNameMatcher: 'Spec',
      useHelpers: true,
      helperNameMatcher: 'Helpers',
      captureExceptions: true,
      jUnit: {
        report: true,
        savePath: "./test/reports/",
        useDotNotation: true,
        consolidate: true
      }
    },
    sol: ['./test/']
  });

  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
};
