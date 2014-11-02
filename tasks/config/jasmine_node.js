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
    options: {
      forceExit: true,
      match: '.',
      matchall: false,
      extensions: 'js',
      specNameMatcher: 'Spec',
      helperNameMatcher: 'Helpers',
      jUnit: {
        report: true,
        savePath: "./test/reports/",
        useDotNotation: true,
        consolidate: true
      }
    },
    sol: ['./test/specs/']
  });

  grunt.loadNpmTasks('grunt-jasmine-node');
};
